import clc from "cli-color";
import express from "express";
import { createServer, Server as HTTPServer } from "http";

import { WebSocket } from "./websocketServer";
import { Service } from "../service";

export class Server {

    server:HTTPServer;
    app:express.Application
    websocket:WebSocket;

    constructor(
        public service:Service,
        public port:number = 8090
    ) {
        this.app = express();
        this.server = createServer(this.app);

        this.setupRoutes();

        this.server.listen(port, () => {
            clc.green(`Server is listening on port ${port}`);
        });
    }

    private setupRoutes() {
        this.setupGateway();
    }

    private setupGateway() {
        this.websocket = new WebSocket(this.service, this);
    }

}