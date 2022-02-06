import clc = require("cli-color");
import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import EventEmitter = require("events");

import { StreamElement } from "../element_sdk/element/StreamElement";
import { ElementClass } from "../types/ElementClass";
import type { StreamElementData } from "../element_sdk/element/StreamElementData";
import { Service } from "../service";
import { StreamElementStoredData } from "../element_sdk/element/StreamElementStoredData";

export class ElementManager {

    elementClasses:ElementClass[]   = [];
    elements:StreamElement[]        = [];

    events:EventEmitter = new EventEmitter();

    constructor(public service:Service) {
        this.loadElementClasses();
    }

    registerElementClass(id:string, elementClass:Function):boolean {
        // Check if element class has already been registered
        if(this.getElementClass(id) != null) {
            console.log(clc.redBright(`Element Class with id "${id}" already exists!`));
            return false;
        }

        // Register element class
        this.elementClasses.push({
            id,
            elementClass
        });

        return true
    }

    getElementClass(id:string):ElementClass|null {
        for(var ec of this.elementClasses) {
            if(ec.id.toLowerCase() == id.toLowerCase()) return ec;
        }

        return null;
    }

    registerElement(classID:string, data:StreamElementData):StreamElement|null {
        let elementClass = this.getElementClass(classID)?.elementClass as any;
        if(!elementClass) {
            // Element class not found
            console.log(`${clc.red("[FAIL]")} Unable to register Element. Element class "${classID}" not found!`);
            return null;
        }

        let instance:StreamElement = new elementClass(data, this.service.scenes.selectedSceneID);

        this.elements.push(instance);

        return instance;
    }

    selectScene(sceneID:string) {
        for(var e of this.elements) {
            e.__selectedScene = sceneID;
        }
    } 

    private async loadElementClasses() {
        let paths = this.getAllElementPaths();
        
        for(var p of paths) {
            let plugin = await import(p);

            /* == Plugin has been imported == */
            let success = this.registerElementClass(plugin.default.id, plugin.default.elementClass);

            if(success) console.log(`${clc.green("[SUCCESS]")} Loaded element plugin ${clc.cyanBright(plugin.default.name)}`);
            else console.log(`${clc.red("[FAIL]")} Unable to load element plugin ${clc.cyanBright(plugin.default.name)}`);
        }

        this.events.emit("element-plugins-loaded");
    }

    private getAllElementPaths() {
        let results:string[] = [];

        let path = join(__dirname, "../../plugins/elements")
        let err, files = readdirSync(path);

        for(var f of files) {
            if(lstatSync(join(path, f)).isDirectory()) {
                /* == Entry in plugins/elements is a directory == */

                let err, containedFiles = readdirSync(join(path, f));
                if(containedFiles.includes("index.js")) {
                    /* == Plugin contains index.js -> valid plugin == */
                    
                    results.push(join(path, f));
                }
            }
        }

        return results;
    }

    loadFromStoredData(data:StreamElementStoredData[]) {
        for(var e of data) {
            this.registerElement(e.elementClassID, {
                id: e.data.id,
                scenes: e.data.scenes || []
            });
        }
    }

}