import type { Component } from "./UIComponent";

interface UiPanelData {
    name:string;
}

export interface StreamElementUiData {
    panel:UiPanelData;
    components:Component[];
}