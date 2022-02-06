import type { ComponentInterface } from "./ComponentInterface";

interface UiPanelData {
    name:string;
}

export interface StreamElementUiData {
    panel:UiPanelData;
    components:ComponentInterface[];
}