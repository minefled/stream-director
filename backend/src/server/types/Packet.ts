import { StreamElementFrontendData } from "../../element_sdk/element/types/StreamElementFrontendData";
import { SceneData } from "../../scenes/SceneData";

export interface PacketData {
    /* == request Packet == */
    resource?:"scenes"|"elements"|"element_states"|"element_ui_data"|"is_live";

    /* == is_live Packet == */
    is_live?:boolean;

    /* == scene Packet == */
    scenes?:SceneData;
    
    /* == select_scene Packet == */
    scene_id?:string;

    /* == elements packet == */
    elements?:StreamElementFrontendData[];

    /* == update_element_state_value Packet == */
    element_id?:string;
    property_key?:string;
    value?:any;
}

export interface Packet {
    type:"get"|"get_response"|"is_live"|"select_scene"|"update_element_state_value"|"run_action";
    data?:PacketData;
}