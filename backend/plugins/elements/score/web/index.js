let element;
//// State ////
//// Elements ////
window.addEventListener("load", () => {
    //// Get HTML Element ////
    //// Initialize Element ////
    element = new window.streamDirector.StreamDirectorElement("2a9ca9e5-2d3c-4a03-af36-eebc2408eed3");
    element.events.createEventListener(e => e.type == "state_change", e => {
    });
});
export {};
