import { Scene } from "../scenes/Scene";
import { Service } from "../service";
import type { SceneData } from "../scenes/SceneData";
import { v4 as uuiV4 } from "uuid";

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

    exportData():SceneData {
        return {
            selectedSceneID: this.selectedSceneID,
            scenes: this.scenes
        };
    }

    createScene(name:string) {
        let id = uuiV4();

        this.scenes.push({
            id,
            name
        });

        this.service.elements.createScene(id);
        this.service.storeData();

        this.service.server.websocket.broadcast({
            type: "create_scene",
            data: {
                scene_id: id,
                name
            }
        });
    }

    deleteScene(id:string) {
        for(var i=0;i<this.scenes.length;i++) {
            if(this.scenes[i].id == id) {
                this.scenes.splice(i, 1);
            }
        }

        this.service.server.websocket.broadcast({
            type: "delete_scene",
            data: {
                scene_id: id
            }
        });

        this.service.elements.deleteScene(id);
        this.service.storeData();
    }

}