/* == Types == */
export interface TextAreaOptions {
    /**
     * Sets the position of the input in the ui. The lower the value, the higher up it is
     */
    position?: number;

    /**
     * Sets the number of lines that can bee seen at the same time
     * (Defaults to 3)
     */
    rows?:number;

    /**
     * Sets the placeholder text that will be visible when the input is empty
     */
    placeholder?:string;
}

/**
 * **Text Area Input**
 * 
 * Adds a textarea input to the control panel that can be expanded
 * to edit more text than in a regular text input
 */
export function TextArea(name:string, options:TextAreaOptions={}) {

    return function(target: any, propertyKey: string) {
        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "textarea",
                        
            name,
            propertyKey,
            options
        });
    }
}