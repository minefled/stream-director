import type { Packet } from "../types/Packet";

export type eventType = "packet" | "connect" | "disconnect" | "select_scene";

export interface EventData {
    packet?:Packet;

    scene_id?:string;
}

export interface Event {
    type:eventType;
    data?:EventData;
}