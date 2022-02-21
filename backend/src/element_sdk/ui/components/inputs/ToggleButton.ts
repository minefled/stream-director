/* == Types == */
import EventEmitter = require("events");

export interface ToggleButtonOptions {
    /**
     * Sets the position of the input in the ui. The lower the value, the higher up it is
     */
    position?: number;

    /**
     * Defines the additional text that the Toggle Button will display when the value is false
     */
    textOff?:string;

    /**
     * Defines the additional text that the Toggle Button will display when the value is true
     */
    textOn?:string;
}

/**
 * **Toggle**
 * 
 * Adds a toggle button to the control panel that updates a boolean
 */
export function ToggleButton(name:string, options:ToggleButtonOptions={}) {

    return function(target: any, propertyKey: string) {
        let value:string;
        let initialSet = true;

        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "toggle-button",
                        
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