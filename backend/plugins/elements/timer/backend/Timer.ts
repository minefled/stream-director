import { StreamElement } from "../../../../src/element_sdk/element/StreamElement";
import { ActionExecuteData } from "../../../../src/element_sdk/element/types/ActionExecuteData";
import { StreamElementInitializationData } from "../../../../src/element_sdk/element/types/StreamElementInitializationData";
import { state } from "../../../../src/element_sdk/state/state";
import { ui } from "../../../../src/element_sdk/ui/ui";

export class Timer extends StreamElement {

    __classID = "countdown-timer";

    @ui.NumberSlider("Duration", { min: 0, max: 900, step: 30}) duration:number = 0;
    @ui.TextInput("Message")                                    text:string = "POGGERS";
    @state.SharedState()                                        endsAt:number = 0;

    constructor(data:StreamElementInitializationData) {
        /* == Initialization stuff == */
        super(data, {
            name: "Countdown Timer"
        });
        this.__init();

        console.log("Timer constructor >", this.__getUIData());
    }

    @ui.Button("Start")
    start(data:ActionExecuteData) {
        //// Set the new endsAt timestamp ////
        this._set(
            data.sceneID,
            "endsAt",
            new Date().getTime() + this._get(data.sceneID, "duration")*1000
        );
    }
    
}

export default Timer;