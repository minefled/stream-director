<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
import { HEXtoHSL } from "../../../../utils/colorConversion";

    interface Options {
        textOff?:string;
        textOn?:string;
        colorOff?:string;
        colorOn?:string;
    }

    export let name:string;
    export let value:boolean = false;
    export let options:Options = {};

    let textOff = "OFF";
    let textOn = "ON";

    let backgroundColorOff:string = "212125";
    let borderColorOff:string = "28282e";
    let backgroundColorOn:string = "212125";
    let borderColorOn:string = "28282e";

    let dispatch = createEventDispatcher();

    onMount(() => {
        textOff = options.textOff || "OFF";
        textOn = options.textOn || "ON";

        backgroundColorOff = options.colorOff || "212125";
        var hsl = HEXtoHSL(backgroundColorOff);
        borderColorOff = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l*1.15}%)`;

        backgroundColorOn = options.colorOn || "212125";
        var hsl = HEXtoHSL(backgroundColorOn);
        borderColorOn = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l*1.15}%)`;
    });

    function dispatchUpdateEvent() {
        dispatch("update", { value });
    }

    function toggle() {
        value =! value;
        dispatchUpdateEvent();
    }
</script>

<div class="switch-input">
    <button
        on:click={toggle}
        style="background-color: #{value ? backgroundColorOn:backgroundColorOff}; border: 1px solid {value? borderColorOn:borderColorOff}"
    >{name} - {value ? textOn:textOff}</button>
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

    button {
        width: 100%;
        height: 100%;

        background-color: #212125;

        outline: none;
        border: 1px solid #28282e;
        border-radius: 4px;

        font-family: "Montserrat", Arial;
        font-size: 12px;
        font-weight: 800;
        color: #ffffff;

        transition: 0.1s;

        cursor: pointer;

        &:active {
            background-color: #232327;
        }
    }
</style>