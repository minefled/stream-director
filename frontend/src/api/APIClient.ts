import { EventHandler } from "./events/EventHandler";
import type { APICache } from "./types/Cache";
import type { Packet } from "./types/Packet";
import type { SceneData } from "./types/SceneData";

export default class APIClient {

    ws:WebSocket;
    events:EventHandler;

    cache:APICache;

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
            this.events.dispatch({
                type: "connect"
            });
        }

        this.ws.onclose = () => {
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

}