import { WebSocket as WebSocketClient} from "ws";
import { WebSocket } from "./server";
import { Packet } from "./types/Packet";

export class Client {

    constructor(
        public socket:WebSocketClient,
        private server:WebSocket
    ) {
        let _this = this;

        socket.on("message", (data) => {
            _this.onMessage(data.toString());
        });
    }

    private onMessage(message:string) {
        let data = JSON.parse(message) as Packet;

        console.log(data);
        
        switch(data.type) {
            case "get":
                /* == Requests some resource from the server == */
                this.handleGetPacket(data);
                break;
            
            case "select_scene":
                /* == A new scene has to be selected == */
                this.handleSelectScenePacket(data);
                break;
        }
    }

    public send(data:Packet) {
        this.socket.send(JSON.stringify(data));
    }

    private handleGetPacket(packet:Packet) {
        let resource = packet.data?.resource;

        if(resource == "scenes") {
            this.send({
                type: "get_response",
                data: {
                    resource,
                    scenes: this.server.service.scenes.exportData()
                }
            })
        }

        if(resource == "elements") {
            this.send({
                type: "get_response",
                data: {
                    resource,
                    elements: this.server.service.elements.exportFrontendData()
                }
            })
        }
    }

    private handleSelectScenePacket(packet:Packet) {
        let sceneID:string = packet.data?.scene_id || "";
        if(!sceneID) return;

        this.server.service.scenes.selectScene(sceneID);

        this.server.broadcast({
            type: "select_scene",
            data: {
                scene_id: sceneID
            }
        });
    }

}