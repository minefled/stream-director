<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name:string;
    export let value:boolean = false;

    let colorOff = "#2d2d32";
    let colorOn = "#2d2d32";
    let textOff = "Off";
    let textOn = "On";

    let dispatch = createEventDispatcher();

    function dispatchUpdateEvent() {
        dispatch("update", { value });
    }

    function toggle() {
        value =! value;
        dispatchUpdateEvent();
    }
</script>

<div class="switch-input">
    <div class="name-section">
        {name}    
    </div>
    <div class="input-section">
        <div class="switch" on:click={toggle}>
            <div class="padding {value ? "on":"off"}" />
            <div class="slider" style="background-color: {value ? colorOn : colorOff}">{value ? textOn:textOff}</div>
        </div>
    </div>
</div>

<style lang="scss">
    .switch-input {
        width: calc(100% - 30px);
        height: 2.4em;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;

        cursor: pointer;
    }

    .name-section {
        width: 35%;
        text-align: center;
    }

    .input-section {
        width: calc(65% - 6px);
        height: 100%;

        margin-left: 6px;

        display: flex;
        align-items: center;
        justify-content: center;

        .switch {
            height: 2em;
            width: 50%;

            background-color: #222227;

            border-radius: 4px;
            overflow: hidden;

            display: flex;
            flex-direction: row;
            align-items: center;

            .padding {
                transition: 0.3s;

                &.on {
                    width: 50%;
                }

                &.off {
                    width: 0%;
                }
            }

            .slider {
                width: 50%;
                height: 100%;

                background-color: #ffffff;

                text-transform: uppercase;

                display: flex;
                align-items: center;
                justify-content: center;

                font-weight: 700;
            }
        }
    }

    @keyframes turn-off {
        0% { width: 50%; }
        100% { width: 0%; }
    }

    @keyframes turn-on {
        0% { width: 0%; }
        100% { width: 50%; }
    }
</style>