/* == Types == */
import EventEmitter = require("events");
import type { StreamElement } from "../../element/StreamElement";

/**
 * **Text Input**
 * 
 * Adds a text input to the control panel
 */
export function TextInput(name:string, options={}) {

    return function(target: any, propertyKey: string) {
        let value:string;
        let initialSet = true;

        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "text-input",
                        
            name,
            propertyKey,
            options
        });

        Object.defineProperty(target, propertyKey, {
            get: () => { return value; },
            set: (v:string) => {
                value = v;

                if(initialSet) {
                    initialSet = false;

                    if(typeof target.__events !== "object") target.__events = new EventEmitter();
                }

                if(target.hasOwnProperty("__events")) {
                    target.__events.emit("update", propertyKey);
                }
            }
        });
    }
}