import { SceneData } from "../../scenes/SceneData";

export interface PacketData {
    /* == request Packet == */
    resource?:"scenes"|"element_states"|"element_ui_data"|"is_live";

    /* == is_live Packet == */
    is_live?:boolean;

    /* == scene Packet == */
    scenes?:SceneData;
    
    /* == select_scene Packet == */
    scene_id?:string;
}

export interface Packet {
    type:"get"|"get_response"|"is_live"|"select_scene";
    data?:PacketData;
}