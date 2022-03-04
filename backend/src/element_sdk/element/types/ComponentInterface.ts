export interface ComponentInterface {
    type:string;

    id?:string;
    name?:string;
    propertyKey?:string;
    options:any;

    subComponents?:ComponentInterface[];
}