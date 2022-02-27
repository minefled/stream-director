/* == Types == */
import EventEmitter = require("events");

export interface NumberInputOptions {
    /**
     * Sets the position of the input in the ui. The lower the value, the higher up it is
     */
     position?: number;
}

/**
 * **Number Input**
 * 
 * Adds a text input to the control panel
 */
export function NumberInput(name:string, options:NumberInputOptions={}) {

    return function(target: any, propertyKey: string) {
        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "number-input",
                        
            name,
            propertyKey,
            options
        });
    }
}