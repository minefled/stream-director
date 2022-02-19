import { ComponentInterface } from "../../element/types/ComponentInterface";

export interface HeadlineOptions {
    position:number;
}

export function Headline(title:string, options:HeadlineOptions):ComponentInterface {
    return {
        type: "headline",
        name: title,
        options
    }
} 