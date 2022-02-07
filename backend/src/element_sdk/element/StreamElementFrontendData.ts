import { SceneState } from "./SceneState";
import { StreamElementUiData } from "./StreamElementUiData";

export interface StreamElementFrontendState {
    scenes:SceneState[];
}

export interface StreamElementFrontendData {
    id:string;

    ui:StreamElementUiData;
    state:StreamElementFrontendState;
}