import clc from "cli-color";
import express, { Request, Response } from "express";
import { createServer, Server as HTTPServer } from "http";

import { WebSocket } from "./websocketServer";
import { Service } from "../service";
import { join } from "path";

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
        console.log(__dirname);

        this.app.get("/elements/:plugin_id/*", (req, res) => {this.handleGetElement(req, res);});
        this.app.use("/sdk/", express.static(join(__dirname, "../../../../sdk/js/dist/")));

        this.setupGateway();
    }

    private setupGateway() {
        this.websocket = new WebSocket(this.service, this);
    }

    private handleGetElement(req:Request, res:Response) {
        var pluginID = req.params.plugin_id;
        var path     = req.params[0] ? req.params[0] : "index.html";

        var fullPath:string = join(__dirname, `../../../plugins/elements/${pluginID}/web/${path}`);
        res.sendFile(fullPath);
    }

}