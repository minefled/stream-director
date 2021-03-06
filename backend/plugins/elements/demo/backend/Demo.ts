import {
    ui,
    StreamElement,

    StreamElementInitializationData
} from "../../../../src/exports";

export class Demo extends StreamElement {

    __classID = "demo-element";

    @ui.TextInput("Text", {placeholder: "OwO Placeholder"}) text:string         = "";
    @ui.TextArea("Textarea")                                textarea:string     = "";
    @ui.NumberSlider("Number Slider", {min: 0, max: 15})    num:number          = 0;
    @ui.NumberInput("Number")                               num2:number         = 0;
    @ui.Switch("Switch")                                    switch:boolean      = false;
    @ui.ToggleButton("Toggle Button")                       toggleBtn:boolean   = false;
    @ui.Checkbox("Checkbox")                                checkbox:boolean    = false;
    @ui.RadioButtons({
        position: 14,
        options: [
            {
                id: "o1",
                name: "Option 1"
            },
            {
                id: "o2",
                name: "Option 2"
            },
            {
                id: "o3",
                name: "Option 3"
            }
        ]
    })                                                      options:string      = "";

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
        this._addComponent(ui.Headline("Misc", {position: 13}));
    }

    @ui.Button("Button wow")
    button1() {
        console.log("Button 1 has been clicked!");
    }

    @ui.ButtonGroup("btn-group", { position: 12 })
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