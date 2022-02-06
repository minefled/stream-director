import { Scene } from "../scenes/Scene";
import { Service } from "../service";
import type { SceneData } from "../scenes/SceneData";

export class SceneManager {

    scenes:Scene[];
    selectedSceneID:string  = "";

    constructor(
        private service:Service,
        data:SceneData
    ) {
        this.scenes = data.scenes || [];

        this.selectedSceneID = data.selectedSceneID || "";
    }

    selectScene(id:string) {
        this.selectedSceneID = id;
        this.service.elements.selectScene(id);
    }

}