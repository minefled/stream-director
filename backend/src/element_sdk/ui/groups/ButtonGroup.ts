import { ComponentInterface } from "../../element/types/ComponentInterface";

export interface ButtonGroupOptions {
    position?:number;
}

export function ButtonGroup(id:string, options:ButtonGroupOptions={}) {
    return function(target:{[key:string]: any}, propertyKey:string, descriptor:PropertyDescriptor) {
        if(!target.hasOwnProperty("__uiComponents")) target.__uiComponents = [];

        let buttonGroup:ComponentInterface|undefined;
        for(var g of target.__uiComponents) {
            if(g.id == id && g.type == "button-group") buttonGroup = g;
        }

        if(!buttonGroup) {
            buttonGroup = {
                type: "button-group",

                id,
                options,

                subComponents: []
            };

            target.__uiComponents.push(buttonGroup);
        }

        for(var c of target.__uiComponents) {
            if(c.type == "button" && c.propertyKey == propertyKey) {
                buttonGroup.subComponents?.push(c);
            }
        }

        return descriptor;
    }
}