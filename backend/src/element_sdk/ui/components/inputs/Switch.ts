/* == Types == */
import EventEmitter = require("events");

export interface SwitchInputOptions {
    /**
     * Sets the position of the input in the ui. The lower the value, the higher up it is
     */
     position?: number;
}

/**
 * **Switch Input**
 * 
 * Adds a switch to the control panel that updates a boolean
 */
export function Switch(name:string, options:SwitchInputOptions={}) {

    return function(target: any, propertyKey: string) {
        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "switch",
                        
            name,
            propertyKey,
            options
        });
    }
}