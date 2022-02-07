/* == Server related == */
import clc = require("cli-color");
import { WebSocketServer } from "ws";
import { Service } from "../service";

import { Client } from "./client";
import { Packet } from "./types/Packet";

/**
 * Represents the websocket server that all clients (app / overlay) connect to
 */
export class WebSocket {

    private server:WebSocketServer;
    private clients:Client[] = [];

    constructor(
        public service:Service
    ) {
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

        let _this = this;

        this.server.on("connection", (socket) => {
            _this.clients.push(new Client(socket, _this));

            socket.on("close", () => {
                _this.clients = _this.clients.filter(x => x.socket!=socket);
            });
        });
    }

    private onMessage(message:string) {
        let data = JSON.parse(message);
    }

    public broadcast(data:Packet) {
        for(var c of this.clients) {
            c.send(data);
        }
    }

}