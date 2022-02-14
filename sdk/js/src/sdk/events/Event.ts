export type eventType = "select_scene" | "state_change";

export interface EventData {
    propertyKey?:string;
}

export interface Event {
    type:eventType;
    data?:EventData;
}