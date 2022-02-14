let Typewriter;
let element;
//// State ////
let message = "";
let endsAt = 0;
//// Elements ////
let timer;
let timerElement;
let messageElement;
let messageContainerElement;
let messageTypewriter;
window.addEventListener("load", () => {
    //// Get HTML Element ////
    timer = document.getElementById("timer-element");
    timerElement = document.getElementById("time-display");
    messageElement = document.getElementById("message");
    messageContainerElement = document.getElementById("message-container");
    Typewriter = window["Typewriter"];
    messageTypewriter = new Typewriter(messageElement, { cursor: "" });
    //// Initialize Element ////
    element = new window.streamDirector.StreamDirectorElement("2a9ca9e5-2d3c-4a03-af36-eebc2408eed3");
    element.events.createEventListener(e => e.type == "state_change", e => {
        setMessage(element.state.text);
        endsAt = element.state.endsAt;
    });
});
setInterval(() => {
    if (!timerElement)
        return;
    let timeLeft = (endsAt - new Date().getTime()) / 1000;
    let minutes = Math.floor(timeLeft / 60);
    let seconds = Math.floor(timeLeft) % 60;
    if (timeLeft < 0) {
        minutes = 0;
        seconds = 0;
        timer.style.opacity = "0%";
    }
    else {
        timer.style.opacity = "100%";
    }
    timerElement.innerText = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}, 250);
function setMessage(newMessage) {
    if (!messageElement)
        return;
    if (message == newMessage)
        return;
    message = newMessage;
    if (message == "") {
        messageContainerElement.style.opacity = "0%";
        messageContainerElement.style.padding = "6px 0px";
    }
    else {
        messageContainerElement.style.opacity = "100%";
        messageContainerElement.style.padding = "6px 12px";
    }
    messageTypewriter
        .deleteAll()
        .typeString(message)
        .start();
    //messageContainerElement.style.padding = "6px 12px 6px 12px";
}
export {};
