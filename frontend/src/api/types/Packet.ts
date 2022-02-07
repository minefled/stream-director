import type { SceneData } from "./SceneData";
import type { StreamElement } from "./StreamElement";

export interface PacketData {
    /* == request Packet == */
    resource?:"scenes"|"elements"|"element_states"|"element_ui_data"|"is_live";

    /* == is_live Packet == */
    is_live?:boolean;

    /* == scenes Packet == */
    scenes?:SceneData;

    /* == select_scene Packet == */
    scene_id?:string;

    /* == elements Packet */
    elements?:StreamElement[];
}

export interface Packet {
    type:"get"|"get_response"|"is_live"|"select_scene";
    data?:PacketData;
}