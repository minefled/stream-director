import type { Packet } from "../types/Packet";

export type eventType = "packet" | "connect" | "disconnect" | "select_scene" | "update_element_state_value" | "is_live_update";

export interface EventData {
    packet?:Packet;

    scene_id?:string;

    /* == update_element_state_value Event == */
    element_id?:string;
    property_key?:string;
    value?:any;

    /* == is_live Event == */
    is_live?:boolean;
}

export interface Event {
    type:eventType;
    data?:EventData;
}