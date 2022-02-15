import APIClient from "../api/APIClient";
import { Event as APIEvent } from "../api/events/Event";
import { SceneState } from "../api/types/StreamElementState";
import { EventHandler } from "./events/EventHandler";

export default class StreamDirectorElement {

    api:APIClient;

    state:{ [key: string]: any } = {};

    selectedSceneID:string = "";
    scenes:SceneState[];

    events:EventHandler;

    constructor(public id:string, api:APIClient|null=null, public forcedSceneID:string|null=null) {
        this.api = api ? api : new APIClient(this.getGatewayURL());
        this.events = new EventHandler();

        let _this = this;

        if(this.api.isConnected) {
            this.onConnect();
        } else {
            this.api.events.createEventListener(
                e => e.type == "connect",
                e => {
                    _this.onConnect();
                }
            );

            this.api.events.createEventListener(
                e => e.type == "update_element_state_value",
                e => {
                    this.__updateElementStateValue(e.data?.scene_id || "", e.data?.property_key || "", e.data?.value);
                }
            )

            this.api.events.createEventListener(
                e => e.type == "select_scene",
                e => {
                    if(this.forcedSceneID != null) return;

                    this.selectedSceneID = e.data?.scene_id || "";
                    this.__loadSceneState(this.selectedSceneID);
                }
            )
        }
    }

    /**
     * Returns the url to the websocket server
     */
    private getGatewayURL():string {
        return "ws://" + window.location.host + "/api/gateway";
    }

    /**
     * Called either when the client connects to the server or if the api is already
     * connected when the constructor is called
     */
    private async onConnect() {
        let _this = this;

        this.api.events.createEventListener(
            e => e.type == "packet",
            e => _this.onPacketEvent
        );

        // Get Elements //
        let elements = await this.api.getElements();
        for(var ele of elements) if(ele.id == this.id) this.scenes = ele.state?.scenes || [];

        // Get selected Scene ID
        let sceneData = await this.api.getScenes();
        this.selectedSceneID = this.forcedSceneID != null ? this.forcedSceneID : sceneData.selectedSceneID;

        this.__loadSceneState(this.selectedSceneID);
    }

    /**
     * Called when the api receives a packet
     */
    private onPacketEvent(e:APIEvent) {
    }

    /**
     * Loads the state of a particular scene into this.state
     */
    private __loadSceneState(id:string) {
        for(var s of this.scenes) {
            if(s.id == id) this.state = s.state;
        }

        this.events.dispatch({
            type: "state_change"
        });
    }

    private __updateElementStateValue(sceneID:string, propertyKey:string, newValue:any) {
        for(var s of this.scenes) {
            if(s.id == sceneID) {
                s.state[propertyKey] = newValue;
            }
        }

        if(sceneID == this.selectedSceneID) {
            this.state[propertyKey] = newValue;
            this.events.dispatch({
                type: "state_change",
                data: {
                    propertyKey
                }
            });
        }
    }

}