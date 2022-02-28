import { StreamElement } from "../../../../src/element_sdk/element/StreamElement";
import type { ActionExecuteData } from "../../../../src/element_sdk/element/types/ActionExecuteData";
import type { StreamElementInitializationData } from "../../../../src/element_sdk/element/types/StreamElementInitializationData";
import { ui } from "../../../../src/element_sdk/ui/ui";

export class Demo extends StreamElement {

    __classID = "demo-element";

    @ui.TextInput("Text", {placeholder: "OwO Placeholder"}) text:string         = "";
    @ui.TextArea("Textarea")                                textarea:string     = "";
    @ui.NumberSlider("Number Slider", {min: 0, max: 15})    num:number          = 0;
    @ui.NumberInput("Number")                               num2:number         = 0;
    @ui.Switch("Switch")                                    switch:boolean      = false;
    @ui.ToggleButton("Toggle Button")                       toggleBtn:boolean   = false;
    @ui.Checkbox("Checkbox")                                checkbox:boolean    = false;

    constructor(data:StreamElementInitializationData) {
        /* == Initialization stuff == */
        super({
            name: "Demo"
        });
        this.__init(data);

        this._addComponent(ui.Headline("Text", {position: 0}));
        this._addComponent(ui.Headline("Numbers", {position: 3}));
        this._addComponent(ui.Headline("Booleans", {position: 6}));
        this._addComponent(ui.Headline("Buttons", {position: 10}));
    }

    @ui.Button("Button wow")
    button1() {
        console.log("Button 1 has been clicked!");
    }

    @ui.ButtonGroup("btn-group")
    @ui.Button("Button in group")
    button2() {
        console.log("Button 2 has been clicked!");
    }

    @ui.ButtonGroup("btn-group")
    @ui.Button("Button in group #2")
    button3() {
        console.log("Button 3 has been clicked!");
    }
}

export default Demo;