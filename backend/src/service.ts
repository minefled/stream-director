import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { ElementManager } from "./managers/ElementManager";
import { SceneManager } from "./managers/SceneManager";
import { Server } from "./server/server";

export class Service {

    server:Server;
    elements:ElementManager;
    scenes:SceneManager;

    constructor() {
        this.server = new Server(this);

        let rawInitialData = this.loadStoredData();

        this.elements = new ElementManager(this);
        this.scenes = new SceneManager(this, rawInitialData["scenes"]);

        this.elements.events.on("element-plugins-loaded", () => {
            this.elements.loadFromStoredData(rawInitialData["elements"]);

            this.storeData();
        });
    }

    loadStoredData() {
        let path = join(__dirname, "../../data/data.json");
        let raw = JSON.parse(readFileSync(path, "utf-8"));

        return raw;
    }

    exportStoredData() {
        return {
            scenes: this.scenes.exportData(),
            elements: this.elements.exportStoredData()
        };
    }

    storeData() {
        let path = join(__dirname, "../../data/data.json");
        let data = JSON.stringify(this.exportStoredData(), null, 4);

        writeFileSync(path, data);
    }

}