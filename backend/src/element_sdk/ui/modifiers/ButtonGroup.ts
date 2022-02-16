import { UIGroupInterface } from "../../element/types/UIGroupInterface";

export function ButtonGroup(id:string) {
    return function(target:{[key:string]: any}, propertyKey:string, descriptor:PropertyDescriptor) {
        if(!target.hasOwnProperty("__uiGroups")) target.__uiGroups = [];

        let buttonGroup:UIGroupInterface|undefined;
        for(var g of target.__uiGroups) {
            if(g.id == id && g.type == "buttons") buttonGroup = g;
        }

        if(buttonGroup) {
            for(var i=0;i<target.__uiGroups.length;i++) {
                if(target.__uiGroups[i].id == id) {
                    target.__uiGroups[i].propertyKeys.push(propertyKey);
                    break;
                }
            }
        } else {
            target.__uiGroups.push({
                type: "buttons",
                            
                id,
                propertyKeys: [ propertyKey ]
            });
        }

        return descriptor;
    }
}