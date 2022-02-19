import { ComponentInterface } from "../../element/types/ComponentInterface";

export interface SeparatorOptions {
    position:number;
}

export function Separator(options:SeparatorOptions):ComponentInterface {
    return {
        type: "separator",
        options
    }
} 