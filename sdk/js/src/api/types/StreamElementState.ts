export interface SceneState {
    id:string;
    state:{ [key: string]: any; };
}

export interface StreamElementState {
    scenes:SceneState[];
}