import { StreamElement } from "../../../../src/element_sdk/element/StreamElement";
import { ActionExecuteData } from "../../../../src/element_sdk/element/types/ActionExecuteData";
import { StreamElementInitializationData } from "../../../../src/element_sdk/element/types/StreamElementInitializationData";
import { state } from "../../../../src/element_sdk/state/state";
import { Separator } from "../../../../src/element_sdk/ui/components/Separator";
import { ui } from "../../../../src/element_sdk/ui/ui";

export class Timer extends StreamElement {

    __classID = "countdown-timer";

    @ui.NumberSlider("Duration", { min: 0, max: 900, step: 15}) duration:number = 0;
    @ui.TextInput("Message")                                    text:string = "POGGERS";
    @state.SharedState()                                        endsAt:number = 0;

    constructor(data:StreamElementInitializationData) {
        /* == Initialization stuff == */
        super({
            name: "Countdown Timer"
        });
        this.__init(data);

        this._addComponent(ui.Separator({ position: 2 }));
        this._addComponent(ui.Headline("Test", { position: 4 }));

        //console.log("Timer constructor >", this.__getUIData());
    }

    @ui.Button("Start")
    start(data:ActionExecuteData) {
        //// Set the new endsAt timestamp ////
        this._set(
            data.sceneID,
            "endsAt",
            new Date().getTime() + this._get(data.sceneID, "duration")*1000+1000
        );
    }

    @ui.Button("Stop")
    stop(data:ActionExecuteData) {
        this._set(
            data.sceneID,
            "endsAt",
            new Date().getTime()
        );
    } 

    @ui.ButtonGroup("time-presets")
    @ui.Button("30 sec")
    set30Sec(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 30);
        this.start(data);
    }

    @ui.ButtonGroup("time-presets")
    @ui.Button("1 min")
    set1Minute(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 60);
        this.start(data);
    }

    @ui.ButtonGroup("time-presets")
    @ui.Button("3 min")
    set3Minutes(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 180);
        this.start(data);
    }

    @ui.ButtonGroup("time-presets")
    @ui.Button("5 min")
    set5Minutes(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 300);
        this.start(data);
    }

    @ui.ButtonGroup("time-presets")
    @ui.Button("10 min")
    set10Minutes(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 600);
        this.start(data);
    }

    @ui.ButtonGroup("time-presets")
    @ui.Button("15 min")
    set15Min(data:ActionExecuteData) {
        this._set(data.sceneID, "duration", 900);
        this.start(data);
    }
    
}

export default Timer;