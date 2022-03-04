export interface Component {
    type:string;

    id?:string;
    name?:string;
    propertyKey?:string;
    options:any;

    subComponents?:Component[];
}