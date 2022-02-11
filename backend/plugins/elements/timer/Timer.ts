import { StreamElement } from "../../../src/element_sdk/element/StreamElement";
import { StreamElementData } from "../../../src/element_sdk/element/StreamElementData";
import { state } from "../../../src/element_sdk/state/state";
import { ui } from "../../../src/element_sdk/ui/ui";
import { ElementManager } from "../../../src/managers/ElementManager";

export class Timer extends StreamElement {

    __classID = "countdown-timer";

    @ui.TextInput("Message")    text:string = "POGGERS";
    @state.SharedState()        endsAt:number = 0;

    constructor(data:StreamElementData, elementManager:ElementManager, selectedSceneID:string) {
        /* == Initialization stuff == */
        super(data, elementManager, selectedSceneID, {
            name: "Countdown Timer"
        });
        this.__init();

        console.log("Timer constructor >", this.__getUIData());
    }

    @ui.Button("Start")
    start() {
        console.log(this.text);
    }
    
}

export default Timer;