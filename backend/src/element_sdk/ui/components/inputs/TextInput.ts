/* == Types == */
export interface TextInputOptions {
    /**
     * Sets the position of the input in the ui. The lower the value, the higher up it is
     */
    position?: number;

    /**
     * Sets the placeholder text that will be visible when the input is empty
     */
    placeholder?:string;
}

/**
 * **Text Input**
 * 
 * Adds a text input to the control panel
 */
export function TextInput(name:string, options:TextInputOptions={}) {

    return function(target: any, propertyKey: string) {
        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "text-input",
                        
            name,
            propertyKey,
            options
        });
    }
}