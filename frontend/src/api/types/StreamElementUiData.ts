import type { Component } from "./UIComponent";
import type { UIGroup } from "./UIGroup";

interface UiPanelData {
    name:string;
}

export interface StreamElementUiData {
    panel:UiPanelData;
    components:Component[];
    groups:UIGroup[];
}