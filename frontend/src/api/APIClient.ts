import { EventHandler } from "./events/EventHandler";
import type { APICache } from "./types/Cache";
import type { ElementPlugin } from "./types/ElementPlugin";
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

            case "is_live":
                this.handleIsLivePacket(data);
                break;

            case "create_scene":
                this.handleCreateScenePacket(data);
                break;

            case "delete_scene":
                this.handleDeleteScenePacket(data);
                break;

            case "rename_scene":
                this.handleRenameScenePacket(data);
                break;

            case "add_element":
                this.handleAddElementPacket(data);
                break;

            case "remove_element":
                this.handleRemoveElementPacket(data);
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

                break;

            case "is_live":
                this.events.dispatch({
                    type: "packet",
                    data: { packet }
                });

                break;

            case "element_classes":
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
        if(packet.data?.value == undefined) return;

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

    private handleIsLivePacket(packet:Packet) {
        if(packet.data?.is_live == undefined) return;

        this.events.dispatch({
            type: "is_live_update",
            data: {
                is_live: packet.data?.is_live
            }
        });
    }

    private handleCreateScenePacket(packet:Packet) {
        if(!packet.data?.scene_id) return;
        if(!packet.data?.name) return;

        this.events.dispatch({
            type: "scene_create",
            data: {
                scene_id: packet.data.scene_id,
                name: packet.data.name
            }
        });
    }

    private handleDeleteScenePacket(packet:Packet) {
        if(!packet.data?.scene_id) return;

        this.events.dispatch({
            type: "scene_delete",
            data: {
                scene_id: packet.data.scene_id
            }
        });
    }

    private handleRenameScenePacket(packet:Packet) {
        if(!packet.data?.scene_id) return;
        if(!packet.data?.new_name) return;

        this.events.dispatch({
            type: "scene_rename",
            data: {
                scene_id: packet.data.scene_id,
                new_name: packet.data.new_name
            }
        });
    }

    private handleAddElementPacket(packet:Packet) {
        if(!packet.data?.element) return;

        this.events.dispatch({
            type: "element_added",
            data: {
                element: packet.data.element
            }
        });
    }

    private handleRemoveElementPacket(packet:Packet) {
        if(!packet.data?.element_id) return;

        this.events.dispatch({
            type: "element_removed",
            data: {
                element_id: packet.data.element_id
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

    runAction(elementID:string, sceneID:string, propertyKey:string) {
        this.sendData({
            type: "run_action",
            data: {
                element_id: elementID,
                scene_id: sceneID,
                property_key: propertyKey
            }
        });
    }

    async getIsLive():Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.sendData({type: "get", data: {resource: "is_live"}});

            this.events.createEventAwaiter(
                event => event.type == "packet" && event.data?.packet?.type == "get_response" && event.data?.packet?.data?.resource == "is_live",
                event => {
                    this.cache.isLive = event.data?.packet?.data?.is_live || false;
                    resolve(this.cache.isLive);
                }
            )
        });
    }

    createScene(name:string) {
        this.sendData({
            type: "create_scene",
            data: {
                name
            }
        });
    }

    deleteScene(id:string) {
        this.sendData({
            type: "delete_scene",
            data: {
                scene_id: id
            }
        });
    }

    renameScene(id:string, newName:string) {
        this.sendData({
            type: "rename_scene",
            data: {
                scene_id: id,
                new_name: newName
            }
        })
    }

    async getElementPlugins():Promise<ElementPlugin[]> {
        return new Promise((resolve, reject) => {
            this.sendData({type: "get", data: {resource: "element_classes"}});

            this.events.createEventAwaiter(
                event => event.type == "packet" && event.data?.packet?.type == "get_response" && event.data?.packet?.data?.resource == "element_classes",
                event => {
                    this.cache.element_plugins = event.data.packet.data.element_classes;
                    resolve(this.cache.element_plugins);
                }
            )
        });
    }

    addElement(plugin_id:string) {
        this.sendData({
            type: "add_element",
            data: {
                plugin_id
            }
        });
    }

    removeElement(id:string) {
        this.sendData({
            type: "remove_element",
            data: {
                element_id: id
            }
        })
    } 

}