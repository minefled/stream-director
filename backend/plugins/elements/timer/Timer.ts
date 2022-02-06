import { StreamElement } from "../../../src/element_sdk/element/StreamElement";
import { StreamElementData } from "../../../src/element_sdk/element/StreamElementData";
import { ui } from "../../../src/element_sdk/ui/ui";

export class Timer extends StreamElement {

    __classID = "countdown-timer";

    @ui.TextInput("Message") text:string = "POGGERS";

    constructor(data:StreamElementData, selectedSceneID:string) {
        super(data, selectedSceneID, {
            name: "Countdown Timer"
        });
        this.__init();

        console.log("Timer constructor >", this.__getUIData());

        this.text = "KEKW";
    }
    
}

export default Timer;