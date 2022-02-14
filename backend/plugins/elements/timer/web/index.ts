/// <reference types="../../../../../sdk/js/dist/ts-dist/index" />
import type StreamDirectorElement from "../../../../../sdk/js/dist/ts-dist/sdk/StreamDirectorElement"; // I will hopefully fix the need for this long import some time soon

let Typewriter:any;

let element:StreamDirectorElement;

//// State ////
let message:string = "";
let endsAt:number = 0;

//// Elements ////
let timerElement:HTMLElement|null;
let messageElement:HTMLElement|null;
let messageContainerElement:HTMLElement|null;

let messageTypewriter:any;

window.addEventListener("load", () => {
    //// Get HTML Element ////
    timerElement = document.getElementById("time-display");
    messageElement = document.getElementById("message");
    messageContainerElement = document.getElementById("message-container");

    Typewriter = window["Typewriter"];
    messageTypewriter = new Typewriter(messageElement, {cursor: ""});

    //// Initialize Element ////
    element = new window.streamDirector.StreamDirectorElement("2a9ca9e5-2d3c-4a03-af36-eebc2408eed3");

    element.events.createEventListener(
        e => e.type == "state_change",
        e => {
            setMessage(element.state.text);
            endsAt = element.state.endsAt;

            console.log(endsAt);
        }
    )
});

setInterval(() => {
    if(!timerElement) return;

    let timeLeft = (endsAt - new Date().getTime())/1000;

    let minutes = Math.floor(timeLeft / 60);
    let seconds = Math.floor(timeLeft) % 60;

    if(timeLeft < 0) {
        minutes = 0;
        seconds = 0;
    }

    timerElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
}, 250);

function setMessage(newMessage:string) {
    if(!messageElement) return;
    if(message == newMessage) return;

    message = newMessage;

    messageTypewriter
        .deleteAll()
        .typeString(message)
        .start();
    messageContainerElement.style.padding = "6px 12px 6px 12px";

}

export {};