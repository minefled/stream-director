import { ElementManager } from "../../../managers/ElementManager";
import { StreamElementData } from "./StreamElementData";

export interface StreamElementInitializationData {
    data:StreamElementData;
    elementManager:ElementManager;
    selectedSceneID:string;
}