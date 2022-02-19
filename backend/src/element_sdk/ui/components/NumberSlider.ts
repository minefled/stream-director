import EventEmitter = require("events");

export interface NumberSliderOptions {
    /**
     * The min value that can be set on the slider
     */
    min:number;

    /**
     * The max value that can be set on the slider
     */
    max:number;

    /**
     * How big the steps are between each value.
     * 
     * @example
     *      3 -> 0, 3, 6, 9, 12, ...
     */
    step?:number;

    /**
     * Indicates whether the value of the slider should be send after each change or only when the user is done changing it
     */
    sendEach?:boolean;

    /**
     * Sets the position of the slider in the ui. The lower the value, the higher up it is
     */
     position?: number;
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