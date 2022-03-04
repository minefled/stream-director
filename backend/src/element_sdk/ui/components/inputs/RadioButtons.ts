export interface RadioOption {
    id:string;
    name:string;
}

export interface RadioButtonsOptions {
    /**
     * Sets the position of the button in the ui. The lower the value, the higher up it is / the earlier it comes in the list
     */
    position?: number;

    /**
     * The hexadecimal color value that all buttons should have
     */
    color?:string;

    /**
     * The hexadecimal color value that the activated button should have
     */
    activatedColor?:string;

    /**
     * The available options
     */
    options:RadioOption[];
}

export function RadioButtons(options:RadioButtonsOptions) {
    return function(target:{[key:string]: any}, propertyKey:string) {
        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];
        target.__uiComponents.push({
            type: "radio-buttons",

            propertyKey,
            options
        });
    }
}