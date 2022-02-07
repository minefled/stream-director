import type { Scene } from "./Scene";

export interface APICache {
    /* == Scenes == */
    viewedSceneID?:string;
    scenes:Scene[];
}