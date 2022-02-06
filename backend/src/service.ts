import { readFileSync } from "fs";
import { join } from "path";
import { ElementManager } from "./managers/ElementManager";
import { SceneManager } from "./managers/SceneManager";
import { WebSocket } from "./server/server";

export class Service {

    server:WebSocket;
    elements:ElementManager;
    scenes:SceneManager;

    constructor() {
        this.server = new WebSocket();

        let rawInitialData = this.loadStoredData();

        this.elements = new ElementManager(this);
        this.scenes = new SceneManager(this, rawInitialData["scenes"]);

        this.elements.events.on("element-plugins-loaded", () => {
            this.elements.loadFromStoredData(rawInitialData["elements"]);
        })
    }

    loadStoredData() {
        let path = join(__dirname, "../../data/data.json");
        let raw = JSON.parse(readFileSync(path, "utf-8"));

        return raw;
    }

}