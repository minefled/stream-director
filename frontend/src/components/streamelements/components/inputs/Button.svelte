<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { HEXtoHSL, HSLToHEX } from "../../../../utils/colorConversion";

    interface Options {
        color?:string;
    }

    export let name:string;
    export let options:Options;

    let backgroundColor:string = "212125";
    let borderColor:string = "28282e";

    let dispatch = createEventDispatcher();

    function dispatchClickEvent() {
        dispatch("click");
    }

    onMount(() => {
        if(options?.color) {
            backgroundColor = options.color;

            let hsl = HEXtoHSL(backgroundColor);
            borderColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l*1.15}%)`;
        }
    });
</script>

<div class="btn">
    <button
        on:click={dispatchClickEvent}
        style="background-color: #{backgroundColor};border: 1px solid {borderColor};"
    >{name}</button>
</div>

<style lang="scss">
    .btn {
        width: calc(100%);
        height: 2em;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;

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
    }
</style>