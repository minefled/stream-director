/// <reference types="../../../../../sdk/js/dist/ts-dist/index" />
import type StreamDirectorElement from "../../../../../sdk/js/dist/ts-dist/sdk/StreamDirectorElement";

let element:StreamDirectorElement;

//// State ////
let name1:string = "";
let name2:string = "";

let score1:number = 0;
let score2:number = 0;

let isVisible:boolean = false;

//// Elements ////
let scoresElement:HTMLElement;

let name1Element:HTMLElement;
let score1Element:HTMLElement;
let name2Element:HTMLElement;
let score2Element:HTMLElement;

window.addEventListener("load", () => {
    //// Get HTML Element ////
    name1Element = document.getElementById("name1");
    score1Element = document.getElementById("score1");
    name2Element = document.getElementById("name2");
    score2Element = document.getElementById("score2");

    scoresElement = document.getElementById("ele");

    //// Initialize Element ////
    element = new window.streamDirector.StreamDirectorElement(new URLSearchParams(window.location.search).get("id"));

    element.events.createEventListener(
        e => e.type == "state_change",
        e => {
            name1 = element.state.namePlayer1;
            name2 = element.state.namePlayer2;
            score1 = element.state.scorePlayer1;
            score2 = element.state.scorePlayer2;
            isVisible = element.state.isVisible;

            update();
        }
    )
});

function update() {
    scoresElement.style.opacity = `${isVisible ? 100 : 0}%`;

    name1Element.innerText = name1;
    name2Element.innerText = name2;
    score1Element.innerText = score1.toString();
    score2Element.innerText = score2.toString();

    name1Element.style.width = `${Math.max(name1.length, name2.length) * 1.3}ex`;
    name2Element.style.width = `${Math.max(name1.length, name2.length) * 1.3}ex`;
}

export {};