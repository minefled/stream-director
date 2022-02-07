import type { Event, eventType } from "./Event";

export interface EventAwaiter {
    eventMatcher:Function;
    callback:Function;
}

export interface EventListener {
    eventMatcher:Function;
    callback:Function;
}


export class EventHandler {

    private eventAwaiters:EventAwaiter[] = [];
    private eventListeners:EventListener[] = [];

    private isDispatching = false;
    private awaiterQueue:EventAwaiter[] = [];

    constructor() {
    }

    createEventAwaiter(matchingFunction:(event:Event) => boolean, callback:(event:Event) => void) {
        if(this.isDispatching) {
            this.awaiterQueue.push({
                eventMatcher: matchingFunction,
                callback
            });

            return;
        }

        this.eventAwaiters.push({
            eventMatcher: matchingFunction,
            callback
        });
    }

    createEventListener(matchingFunction:(event:Event) => boolean, callback:(event:Event) => void) {
        this.eventListeners.push({
            eventMatcher: matchingFunction,
            callback
        });
    }

    dispatch(event:Event) {
        this.isDispatching = true;

        let removeIndices:number[] = [];

        // Call all event awaiters
        for(var a=0; a<this.eventAwaiters.length; a++) {
            var awaiter = this.eventAwaiters[a];

            if(awaiter.eventMatcher.call(null, event) == true) {
                awaiter.callback.call(null, event);
                removeIndices.push(a);
            }
        }

        // Call all event listeners
        for(var listener of this.eventListeners) {
            if(listener.eventMatcher.call(null, event) == true) {
                listener.callback.call(null, event);
            }
        }

        for(var i of removeIndices) {
            // Remove awaiter after it has been called
            this.eventAwaiters.splice(i, 1);
        }

        this.isDispatching = false;
        for(var aw of this.awaiterQueue) {
            this.eventAwaiters.push(aw);
        }
    }

}