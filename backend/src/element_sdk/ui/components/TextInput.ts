/* == Types == */
import EventEmitter = require("events");

export interface TextInputOptions {
    /**
     * Sets the position of the input in the ui. The lower the value, the higher up it is
     */
     position?: number;
}

/**
 * **Text Input**
 * 
 * Adds a text input to the control panel
 */
export function TextInput(name:string, options:TextInputOptions={}) {

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