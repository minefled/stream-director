import { StreamElement } from "../../../../src/element_sdk/element/StreamElement";
import { ActionExecuteData } from "../../../../src/element_sdk/element/types/ActionExecuteData";
import { StreamElementInitializationData } from "../../../../src/element_sdk/element/types/StreamElementInitializationData";
import { state } from "../../../../src/element_sdk/state/state";
import { ui } from "../../../../src/element_sdk/ui/ui";

export class Timer extends StreamElement {

    __classID = "countdown-timer";

    @ui.NumberSlider("Duration", { min: 0, max: 900, step: 15}) duration:number = 0;
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

    @ui.ButtonGroup("time-presets")
    @ui.Button("1min")
    set1Minute(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 60);
    }

    @ui.ButtonGroup("time-presets")
    @ui.Button("3min")
    set3Minutes(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 180);
    }

    @ui.ButtonGroup("time-presets")
    @ui.Button("5min")
    set5Minutes(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 300);
    }

    @ui.ButtonGroup("time-presets")
    @ui.Button("10min")
    set10Minutes(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 600);
    }
    
}

export default Timer;