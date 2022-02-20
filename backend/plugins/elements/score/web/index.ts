/// <reference types="../../../../../sdk/js/dist/ts-dist/index" />
import type StreamDirectorElement from "../../../../../sdk/js/dist/ts-dist/sdk/StreamDirectorElement"; // I will hopefully fix the need for this long import some time soon

let element:StreamDirectorElement;

//// State ////

//// Elements ////

window.addEventListener("load", () => {
    //// Get HTML Element ////

    //// Initialize Element ////
    element = new window.streamDirector.StreamDirectorElement("2a9ca9e5-2d3c-4a03-af36-eebc2408eed3");

    element.events.createEventListener(
        e => e.type == "state_change",
        e => {
        }
    )
});

export {};