export interface ButtonOptions {
    /**
     * Sets the position of the button in the ui. The lower the value, the higher up it is / the earlier it comes in the list
     */
    position?: number;
}

export function Button(name:string, options:ButtonOptions={}) {
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