import { WebSocket as WebSocketClient} from "ws";
import { WebSocket } from "./websocketServer";
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

            case "update_element_state_value":
                /* == One value of the state of one scene of an element has been updated == */
                this.handleUpdateElementStateValuePacket(data);
                break;

            case "run_action":
                /* == A button has been pressed == */
                this.handleRunActionPacket(data);
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

    private handleUpdateElementStateValuePacket(packet:Packet) {
        if(!packet.data?.scene_id) return;
        if(!packet.data?.element_id) return;
        if(!packet.data?.property_key) return;
        if(!packet.data?.value == undefined) return;

        this.server.service.elements.updateElementStateValue(packet.data?.element_id, packet.data?.scene_id, packet.data?.property_key, packet.data?.value);

        this.server.broadcast({
            type: "update_element_state_value",
            data: {
                scene_id: packet.data?.scene_id,
                element_id: packet.data?.element_id,
                property_key: packet.data?.property_key,
                value: packet.data?.value
            }
        });
    }

    private handleRunActionPacket(packet:Packet) {
        if(!packet.data?.element_id) return;
        if(!packet.data?.property_key) return;

        this.server.service.elements.runElementAction(packet.data.element_id, packet.data.property_key);
    }

}