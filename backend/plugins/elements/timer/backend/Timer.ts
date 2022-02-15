import { StreamElement } from "../../../../src/element_sdk/element/StreamElement";
import { ActionExecuteData } from "../../../../src/element_sdk/element/types/ActionExecuteData";
import { StreamElementData } from "../../../../src/element_sdk/element/types/StreamElementData";
import { state } from "../../../../src/element_sdk/state/state";
import { ui } from "../../../../src/element_sdk/ui/ui";
import { ElementManager } from "../../../../src/managers/ElementManager";

export class Timer extends StreamElement {

    __classID = "countdown-timer";

    @ui.NumberSlider("Duration", { min: 0, max: 900, step: 30}) duration:number = 0;
    @ui.TextInput("Message")                                    text:string = "POGGERS";
    @state.SharedState()                                        endsAt:number = 0;

    constructor(data:StreamElementData, elementManager:ElementManager, selectedSceneID:string) {
        /* == Initialization stuff == */
        super(data, elementManager, selectedSceneID, {
            name: "Countdown Timer"
        });
        this.__init();

        console.log("Timer constructor >", this.__getUIData());
    }

    @ui.Button("Start")
    start(data:ActionExecuteData) {
        this._set(data.sceneID, "endsAt", new Date().getTime() + this._get(data.sceneID, "duration")*1000);
    }
    
}

export default Timer;