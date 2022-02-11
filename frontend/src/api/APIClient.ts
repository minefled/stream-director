import { EventHandler } from "./events/EventHandler";
import type { APICache } from "./types/Cache";
import type { Packet } from "./types/Packet";
import type { SceneData } from "./types/SceneData";
import type { StreamElement } from "./types/StreamElement";

export default class APIClient {

    ws:WebSocket;
    events:EventHandler;

    cache:APICache = {};
    isConnected:boolean = false;

    constructor(
        public host:string
    ) {
        this.events = new EventHandler();

        this.connect();
    }

    /**
     * Connects to the Websocket server
     */
    connect() {
        this.ws = new WebSocket(this.host);

        let _this = this;

        this.ws.onopen = () => {
            _this.isConnected = true;

            this.events.dispatch({
                type: "connect"
            });
        }

        this.ws.onclose = () => {
            _this.isConnected = false;

            this.events.dispatch({
                type: "disconnect"
            });

            setTimeout(() => {
                _this.connect();
            }, 1000);
        }

        this.ws.onmessage = (ev:MessageEvent) => {
            _this.onMessage(ev.data);
        }
    }

    onMessage(message:string) {
        let data = JSON.parse(message) as Packet;

        console.log(data);

        switch(data.type) {
            case "get_response":
                this.handleGetResponsePacket(data);
                break;

            case "select_scene":
                this.handleSelectScenePacket(data);
                break;

            case "update_element_state_value":
                this.handleUpdateElementStateValue(data);
                break;
        }
    }

    sendData(data:Packet) {
        this.ws.send(JSON.stringify(data));
    }

    private handleGetResponsePacket(packet:Packet) {
        if(packet.type != "get_response") return;

        switch(packet.data.resource) {
            case "scenes":
                this.events.dispatch({
                    type: "packet",
                    data: {
                        packet
                    }
                });

                break;

            case "elements":
                this.events.dispatch({
                    type: "packet",
                    data: { packet }
                });
        }
    }

    private handleSelectScenePacket(packet:Packet) {
        this.events.dispatch({
            type: "select_scene",
            data: {
                scene_id: packet.data?.scene_id
            }
        });
    }

    private handleUpdateElementStateValue(packet:Packet) {
        if(!packet.data?.scene_id) return;
        if(!packet.data?.element_id) return;
        if(!packet.data?.property_key) return;
        if(!packet.data?.value) return;

        this.events.dispatch({
            type: "update_element_state_value",
            data: {
                scene_id: packet.data?.scene_id,
                element_id: packet.data?.element_id,
                property_key: packet.data?.property_key,
                value: packet.data?.value
            }
        });
    }

    /* === Functions for external use === */

    async getScenes():Promise<SceneData> {
        return new Promise((resolve, reject) => {
            this.sendData({type: "get", data: {resource: "scenes"}});

            this.events.createEventAwaiter(
                event => event.type == "packet" && event.data?.packet?.type == "get_response" && event.data?.packet.data?.resource == "scenes",
                event => {
                    let data = event.data?.packet?.data?.scenes;
                    resolve(data);

                    this.cache.viewedSceneID    = data.selectedSceneID;
                    this.cache.scenes           = data.scenes;
                }
            )
        });
    }

    selectScene(sceneID:string) {
        this.sendData({type: "select_scene", data: {scene_id: sceneID}});
    }

    async getElements():Promise<StreamElement[]> {
        return new Promise((resolve, reject) => {
            this.sendData({type: "get", data: {resource: "elements"}});

            this.events.createEventAwaiter(
                event => event.type == "packet" && event.data?.packet?.type == "get_response" && event.data?.packet?.data?.resource == "elements",
                event => {
                    this.cache.elements = event.data.packet.data.elements;
                    resolve(this.cache.elements);
                }
            )
        });
    }

    updateElementStateValue(sceneID:string, elementID:string, propertyKey:string, value:any) {
        this.sendData({
            type: "update_element_state_value",
            data: {
                scene_id: sceneID,
                element_id: elementID,
                property_key: propertyKey,
                value
            }
        });
    }

    runAction(elementID:string, propertyKey:string) {
        this.sendData({
            type: "run_action",
            data: {
                element_id: elementID,
                property_key: propertyKey
            }
        });
    }

}