import type { ComponentInterface } from "./ComponentInterface";
import { UIGroupInterface } from "./UIGroupInterface";

interface UiPanelData {
    name:string;
}

export interface StreamElementUiData {
    panel:UiPanelData;
    components:ComponentInterface[];
}