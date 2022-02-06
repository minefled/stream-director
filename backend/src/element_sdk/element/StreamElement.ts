/* == Types == */
import type { StreamElementConfig } from "./StreamElementConfig";
import type { ComponentInterface } from "./ComponentInterface";
import type { SceneState } from "./SceneState";
import type { StreamElementUiData } from "./StreamElementUiData";
import { StreamElementData } from "./StreamElementData";
import EventEmitter = require("events");
import { StreamElementStoredData } from "./StreamElementStoredData";

export class StreamElement {

    [key: string]: any;

    __id:string                         = "";
    __classID:string                    = "";
    __uiComponents:ComponentInterface[] = [];
    __scenes:SceneState[]               = [];
    __selectedScene:string              = "781c69a2-7ed7-43bf-b395-1554aa3eb46e";

    __events:EventEmitter;

    constructor(
        data:StreamElementData,
        selectedSceneId:string,
        public __config:StreamElementConfig
    ) {
        this.__loadFromData(data);
        this.__selectedScene = selectedSceneId;
    }

    __init() {
        this.__uiComponents = Object.getPrototypeOf(this).__uiComponents;
        this.__loadSceneState(this.__selectedScene);

        let _this = this;

        this.__events.on("update", (propertyKey:string) => {
            _this.__onUpdate(propertyKey);
        });
    }

    __loadFromData(data:StreamElementData) {
        this.__id = data.id || "";
        this.__loadSceneStates(data.scenes || []);
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

    __getAllStateKeys():string[] {
        let result:string[] = [];

        for(var c of this.__uiComponents) {
            result.push(c.propertyKey);
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
        this.__scenes = scenes;
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

        console.log(this.__scenes);
    }

}