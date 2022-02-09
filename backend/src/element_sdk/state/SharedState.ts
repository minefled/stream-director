/* == Types == */
import EventEmitter = require("events");

/**
 * **Shared State**
 * 
 * State that is internally shared among all clients, but that isn't
 * visible in the control panel of the dashboard
 */
export function SharedState() {

    return function(target: any, propertyKey: string) {
        let value:string;
        let initialSet = true;

        Object.defineProperty(target, propertyKey, {
            get: () => { return value; },
            set: (v:string) => {
                value = v;

                if(initialSet) {
                    initialSet = false;

                    if(!target.hasOwnProperty("__sharedStateVariables")) target.__sharedStateVariables = [];
                    target.__sharedStateVariables.push({
                        propertyKey
                    });

                    if(typeof target.__events !== "object") target.__events = new EventEmitter();
                }

                if(target.hasOwnProperty("__events")) {
                    target.__events.emit("update", propertyKey);
                }
            }
        });
    }
}