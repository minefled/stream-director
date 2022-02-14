/// <reference types="../../../../../sdk/js/dist/ts-dist/index" />
let api;
window.addEventListener("load", () => {
    api = new window.streamDirector.APIClient("ws://localhost:8090/api/gateway");
    console.log(api);
});
export {};
