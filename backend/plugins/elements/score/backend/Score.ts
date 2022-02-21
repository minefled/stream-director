import { StreamElement } from "../../../../src/element_sdk/element/StreamElement";
import type { ActionExecuteData } from "../../../../src/element_sdk/element/types/ActionExecuteData";
import type { StreamElementInitializationData } from "../../../../src/element_sdk/element/types/StreamElementInitializationData";
import { ui } from "../../../../src/element_sdk/ui/ui";

export class Score extends StreamElement {

    __classID = "score";

    @ui.TextInput("Name") namePlayer1:string = "";
    @ui.NumberInput("Score") scorePlayer1:number = 0;

    @ui.TextInput("Name") namePlayer2:string = "";
    @ui.NumberInput("Score") scorePlayer2:number = 0;

    @ui.ToggleButton("Is Visible", {
        textOff: "No",
        textOn: "Yes"
    }) isVisible:boolean = false;

    constructor(data:StreamElementInitializationData) {
        /* == Initialization stuff == */
        super({
            name: "Scores"
        });
        this.__init(data);

        this._addComponent(ui.Headline("Player 1", { position: -1 }));
        this._addComponent(ui.Headline("Player 2", { position: 1.5 }));
        this._addComponent(ui.Headline("Visibility", { position: 4 }));
    }

    @ui.ButtonGroup("visibility")
    @ui.Button("Show", {
        color: "4c9e5b"
    })
    show(data:ActionExecuteData) {
        this._set(data.sceneID, "isVisible", true);
    }

    @ui.ButtonGroup("visibility")
    @ui.Button("Hide", {
        color: "c44955"
    })
    hide(data:ActionExecuteData) {
        this._set(data.sceneID, "isVisible", false);
    }
}

export default Score;