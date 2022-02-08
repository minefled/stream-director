import { StreamElement } from "../../../src/element_sdk/element/StreamElement";
import { StreamElementData } from "../../../src/element_sdk/element/StreamElementData";
import { ui } from "../../../src/element_sdk/ui/ui";
import { ElementManager } from "../../../src/managers/ElementManager";

export class Timer extends StreamElement {

    __classID = "countdown-timer";

    @ui.TextInput("Message") text:string = "POGGERS";

    constructor(data:StreamElementData, elementManager:ElementManager, selectedSceneID:string) {
        super(data, elementManager, selectedSceneID, {
            name: "Countdown Timer"
        });
        this.__init();

        console.log("Timer constructor >", this.__getUIData());

        this.text = "KEKW";
    }
    
}

export default Timer;