import EventEmitter = require("events");

export interface NumberSliderOptions {
    min:number;
    max:number;
    step?:number;

    sendEach?:boolean;
}

/**
 * **Number Slider Input**
 * 
 * Adds a slider to the control panel
 */
export function NumberSlider(name:string, options:NumberSliderOptions) {

    return function(target: any, propertyKey: string) {
        let value:string;
        let initialSet = true;

        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "number-slider",
                        
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