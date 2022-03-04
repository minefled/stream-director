<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { HEXtoHSL, HSLToHEX } from "../../../../utils/colorConversion";

    export let id:string;
    export let name:string;
    export let color:string = null;
    export let colorSelected:string = null;
    export let isSelected:boolean;

    let backgroundColor:string = "212125";
    let borderColor:string = "28282e";
    let backgroundColorSelected:string = "272a2e";
    let borderColorSelected:string = "394047";

    let dispatch = createEventDispatcher();

    function dispatchClickEvent() {
        dispatch("click");
    }

    onMount(() => {
        if(color) {
            backgroundColor = color;

            let hsl = HEXtoHSL(backgroundColor);
            borderColor = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l*1.15}%)`;
        }

        if(colorSelected) {
            backgroundColor = colorSelected;

            let hsl = HEXtoHSL(backgroundColorSelected);
            borderColorSelected = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l*1.15}%)`;
        }
    });
</script>

<div class="btn">
    <button
        on:click={dispatchClickEvent}
        style="{isSelected ? `background-color: #${backgroundColorSelected};border: 1px solid ${borderColorSelected};` : `background-color: #${backgroundColor};border: 1px solid ${borderColor};`}"
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