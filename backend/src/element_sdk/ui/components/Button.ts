/* == Types == */
import EventEmitter = require("events");
import type { StreamElement } from "../../element/StreamElement";

export function Button(name:string, options={}) {
    return function(target:{[key:string]: any}, propertyKey:string, descriptor:PropertyDescriptor) {
        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "button",
                        
            name,
            propertyKey,
            options
        });

        return descriptor;
    }
}