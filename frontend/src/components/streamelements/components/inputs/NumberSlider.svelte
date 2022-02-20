<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import type { NumberSliderOptions } from "../options";

    export let name:string;
    export let value:number = 0;

    export let options:NumberSliderOptions;

    let dispatch = createEventDispatcher();
    let inputElement:HTMLInputElement;

    function dispatchUpdateEvent() {
        dispatch("update", { value });
    }

    function onChange() {
        if(options.sendEach) return;
        dispatchUpdateEvent();
    }

    function onInput() {
        if(!options.sendEach) return;
        dispatchUpdateEvent();
    }
</script>

<div class="number-slider">
    <div class="name-section">
        {name} : 
        <b class="value">{value}</b>
    </div>
    <div class="input-section">
        <input
            type="range"
            min={options.min}
            max={options.max}
            step={options.step || 1}

            bind:value={value}

            on:change={onChange}
            on:input={onInput}
        >
    </div>
</div>

<style lang="scss">
    .number-slider {
        width: calc(100% - 30px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 10px;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
    }

    .name-section {
        width: 100%;
        text-align: center;
    }

    .input-section {
        width: 100%;

        margin-bottom: 6px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        input {
            width: 100%;
            height: 0.3em;

            border-radius: 3px;

            -webkit-appearance: none;
            appearance: none;

            outline: none;
            background-color: #252529;

            cursor: grab;
        }

        input::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;

            height: 1em;
            width: 1em;

            border-radius: 50%;
            background-color: #222327;
            border: 2px solid #2d2d33;
        }

        input::-moz-range-thumb {
            height: 1em;
            width: 1em;

            border-radius: 50%;
            background-color: #222327;
            border: 2px solid #2d2d33;
        }
    }
</style>