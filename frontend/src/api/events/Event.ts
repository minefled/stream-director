import type { Packet } from "../types/Packet";

export type eventType = "packet" | "connect" | "disconnect" | "select_scene" | "update_element_state_value";

export interface EventData {
    packet?:Packet;

    scene_id?:string;

    /* == update_element_state_value Event == */
    element_id?:string;
    property_key?:string;
    value?:any;
}

export interface Event {
    type:eventType;
    data?:EventData;
}