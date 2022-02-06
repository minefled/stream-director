/* == Server related == */
import clc = require("cli-color");
import { WebSocketServer } from "ws";


/**
 * Represents the websocket server that all clients (app / overlay) connect to
 */
export class WebSocket {

    private server:WebSocketServer;

    constructor() {
        this.startServer();
    }

    /**
     * Starts the actual websocket server
     */
    private startServer() {
        this.server = new WebSocketServer({
            port: 40923
        }, () => {
            console.log(clc.green("Server is running!"));
        });
    }

}