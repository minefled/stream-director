import type { StreamElementState } from "./StreamElementState";
import type { StreamElementUiData } from "./StreamElementUiData";

export interface StreamElement {
    id:string;
    ui?:StreamElementUiData;
    state?:StreamElementState;
}