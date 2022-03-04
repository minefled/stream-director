/* == Types == */
import type { StreamElementConfig } from "./types/StreamElementConfig";
import type { ComponentInterface } from "./types/ComponentInterface";
import type { SceneState } from "./types/SceneState";
import type { StreamElementUiData } from "./types/StreamElementUiData";
import { StreamElementData } from "./types/StreamElementData";
import EventEmitter = require("events");
import { StreamElementStoredData } from "./types/StreamElementStoredData";
import { StreamElementFrontendData } from "./types/StreamElementFrontendData";
import { ElementManager } from "../../managers/ElementManager";
import { SharedState } from "./types/SharedStateInterface";
import { ActionExecuteData } from "./types/ActionExecuteData";
import { StreamElementInitializationData } from "./types/StreamElementInitializationData";
import { UIGroupInterface } from "./types/UIGroupInterface";

export class StreamElement {

    [key: string]: any;

    __id:string                             = "";
    __classID:string                        = "";

    __uiComponents:ComponentInterface[]     = [];
    __sharedStateVariables:SharedState[]    = [];

    __scenes:SceneState[]                   = [];
    __selectedScene:string                  = "";

    __events:EventEmitter;

    __elementManager:ElementManager;

    constructor(
        public __config:StreamElementConfig
    ) {
    }

    __init(initializationData:StreamElementInitializationData,) {
        this.__uiComponents         = [...(Object.getPrototypeOf(this).__uiComponents || [])];
        this.__sharedStateVariables = [...(Object.getPrototypeOf(this).__sharedStateVariables || [])];

        this.__elementManager = initializationData.elementManager;
        this.__loadFromData(initializationData.data);
        this.__selectedScene = initializationData.selectedSceneID;

        /// Filter Ui Components ///
        for(var c of this.__uiComponents) {
            if(c.type == "button-group") {
                //console.log("!!!!!", c);
                let removeComponents:Array<ComponentInterface> = [];

                for(var i=0; i<this.__uiComponents.length; i++) {
                    if(this.__uiComponents[i] == c) continue;

                    if(c.subComponents?.includes(this.__uiComponents[i])) {
                        removeComponents.push(this.__uiComponents[i]);
                    }

                    //console.log(this.__uiComponents[i], removeIndices);
                }

                this.__uiComponents = this.__uiComponents.filter(x => !removeComponents.includes(x))
            }
        }

        this.__getAllStateKeys().forEach((sk) => {
            Object.defineProperty(this, sk, {
                get: () => {
                    return this.__getSceneState(this.__selectedScene)?.state[sk];
                },

                set: (nv:any) => {
                    this.__updateSceneStateValue(this.__selectedScene, sk, nv, false);
                    this.__onUpdate(sk);
                }
            });
        });

        this.__loadSceneState(this.__selectedScene);
    }

    __loadFromData(data:StreamElementData) {
        this.__id = data.id || "";
        this.__loadSceneStates([...(data.scenes || [])]);
    }

    __exportData():StreamElementData {
        return {
            id: this.__id,
            scenes: this.__scenes
        }
    }

    __exportStoredData():StreamElementStoredData {
        return {
            elementClassID: this.__classID,
            data: this.__exportData()
        };
    }

    __exportFrontendData():StreamElementFrontendData {
        return {
            id: this.__id,
            state: {
                scenes: this.__scenes
            },
            ui: this.__getUIData()
        };
    }

    __getAllStateKeys():string[] {
        let result:string[] = [];

        for(var c of this.__uiComponents) {
            if(c.type == "button") continue;

            result.push(c.propertyKey || "");
        }

        for(var s of this.__sharedStateVariables) {
            result.push(s.propertyKey);
        }

        return result;
    }

    __hasStateKey(key:string): boolean {
        return this.__getAllStateKeys().includes(key);
    }

    __getState():object {
        let state:{[key:string]: any} = {};

        for(var key of this.__getAllStateKeys()) {
            state[key] = this[key];
        }

        return state;
    }

    __loadState(state:{ [key:string]:any }) {
        for(var key in state) {
            if(this.__hasStateKey(key)) {
                this[key] = state[key];
            }
        }
    }

    __loadSceneStates(scenes:SceneState[]) {
        this.__scenes = [];

        for(var s of [...scenes]) {
            let state:{[key:string]: any} = {};

            for(var key of this.__getAllStateKeys()) {
                state[key] = s.state[key] != undefined ? s.state[key] : this[key];
            }

            var scene:SceneState = {
                id: s.id,
                state: state
            };

            this.__scenes.push(scene);
        }
    }

    __loadSceneState(id:string) {
        let sceneState = this.__getSceneState(id);
        if(!sceneState) return;

        this.__loadState( sceneState.state );
    }

    __getSceneState(id:string):SceneState|null {
        for(var s of this.__scenes) {
            if(s.id == id) {
                return s;
            }
        }

        return null;
    }

    __selectScene(id:string) {
        this.__selectedScene = id;
        this.__loadSceneState(id);
    }

    __getUIData():StreamElementUiData {
        return {
            panel: {
                name: this.__config.name
            },
            components: this.__uiComponents
        }
    }

    __onUpdate(propertyKey:string) {
        for (let i=0; i<this.__scenes.length; i++) {
            if(this.__scenes[i].id == this.__selectedScene) {
                this.__scenes[i].state[propertyKey] = this[propertyKey];
            }
        }

        this.__elementManager.service.server.websocket.broadcast({
            type: "update_element_state_value",
            data: {
                element_id: this.__id,
                scene_id: this.__selectedScene,
                property_key: propertyKey,
                value: this[propertyKey]
            }
        });

        this.__elementManager.onElementUpdate();
    }

    __updateSceneStateValue(sceneID:string, propertyKey:string, value:any, setThis:boolean=true) {
        for(let i=0; i<this.__scenes.length; i++) {
            if(this.__scenes[i].id == sceneID) {
                this.__scenes[i].state[propertyKey] = value;
            }
        }

        if(sceneID == this.__selectedScene && setThis) this[propertyKey] = value;

        this.__elementManager.onElementUpdate();
    }

    __addSceneState(sceneID:string) {
        if(this.__getSceneState(sceneID) != null) return;

        this.__scenes.push({
            id: sceneID,
            state: this.__getSceneState(this.__selectedScene)?.state || {}
        });
    }

    __deleteScene(sceneID:string) {
        if(this.__getSceneState(sceneID) == null) return;

        for(let i=0;i<this.__scenes.length;i++) {
            if(this.__scenes[i].id == sceneID) {
                this.__scenes.splice(i, 1);
            }
        }
    }

    __runAction(sceneID:string, propertyKey:string) {
        if(typeof this[propertyKey] !== "function") return;

        this[propertyKey]({
            sceneID
        } as ActionExecuteData);
    }

    _set(sceneID:string, propertyKey:string, value:any) {
        this.__updateSceneStateValue(sceneID, propertyKey, value);
    }

    _get(sceneID:string, propertyKey:string):any {
        var sceneState = this.__getSceneState(sceneID);

        return sceneState?.state[propertyKey];
    }

    _addComponent(component:ComponentInterface) {
        this.__uiComponents.push(component);
    }

}