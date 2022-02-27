import type { SceneData } from "./SceneData";
import type { StreamElement } from "./StreamElement";

export interface PacketData {
    /* == request Packet == */
    resource?:"scenes"|"elements"|"element_states"|"element_ui_data"|"is_live"|"element_classes";

    /* == request:element_classes Packet == */
    element_classes?:{id:string, name:string}[];

    /* == is_live Packet == */
    is_live?:boolean;

    /* == scenes Packet == */
    scenes?:SceneData;

    /* == select_scene Packet == */
    scene_id?:string;

    /* == elements Packet */
    elements?:StreamElement[];

    /* == update_element_state_value Packet == */
    element_id?:string;
    property_key?:string;
    value?:any;

    /* == create_scene Packet == */
    name?:string;

    /* == rename_scene Packet == */
    new_name?:string;

    /* == add_element Packet == */
    plugin_id?:string;
    element?:StreamElement;
}

export interface Packet {
    type:"get"|"get_response"|"is_live"|"select_scene"|"update_element_state_value"|"run_action"|"create_scene"|"delete_scene"|"rename_scene"|"add_element"|"remove_element";
    data?:PacketData;
}