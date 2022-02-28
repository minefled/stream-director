/* == Types == */
export interface CheckboxInputOptions {
    /**
     * Sets the position of the input in the ui. The lower the value, the higher up it is
     */
    position?: number;
}

/**
 * **Checkbox Input**
 * 
 * Adds a checkbox to the control panel that can update a boolean
 */
export function Checkbox(name:string, options:CheckboxInputOptions={}) {

    return function(target: any, propertyKey: string) {
        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "checkbox",
                        
            name,
            propertyKey,
            options
        });
    }
}