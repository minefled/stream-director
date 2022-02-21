let element;
//// State ////
let name1 = "";
let name2 = "";
let score1 = 0;
let score2 = 0;
let isVisible = false;
//// Elements ////
let scoresElement;
let name1Element;
let score1Element;
let name2Element;
let score2Element;
window.addEventListener("load", () => {
    //// Get HTML Element ////
    name1Element = document.getElementById("name1");
    score1Element = document.getElementById("score1");
    name2Element = document.getElementById("name2");
    score2Element = document.getElementById("score2");
    scoresElement = document.getElementById("ele");
    //// Initialize Element ////
    element = new window.streamDirector.StreamDirectorElement(new URLSearchParams(window.location.search).get("id"));
    element.events.createEventListener(e => e.type == "state_change", e => {
        name1 = element.state.namePlayer1;
        name2 = element.state.namePlayer2;
        score1 = element.state.scorePlayer1;
        score2 = element.state.scorePlayer2;
        isVisible = element.state.isVisible;
        update();
    });
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
