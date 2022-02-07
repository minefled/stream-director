import type { Scene } from "./Scene";
import type { StreamElement } from "./StreamElement";

export interface APICache {
    /* == Scenes == */
    viewedSceneID?:string;
    scenes?:Scene[];

    /* StreamElements */
    elements?:StreamElement[];
}