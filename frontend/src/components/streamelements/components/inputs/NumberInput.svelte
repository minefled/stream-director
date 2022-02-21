<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name:string;
    export let value:number = 0;

    let dispatch = createEventDispatcher();
    let inputElement:HTMLInputElement;

    function dispatchUpdateEvent() {
        dispatch("update", { value });
    }
</script>

<div class="text-input">
    <div class="name-section">
        {name}    
    </div>
    <div class="input-section">
        <input
            type="number"

            bind:value={value}
            bind:this={inputElement}

            on:change={(e) => { dispatchUpdateEvent(); inputElement.blur(); }}
        >

        <button class="minus-button" on:click={() => {value--;dispatchUpdateEvent();}}>
            <img src="assets/icons/minus.png" alt="">
        </button>
        <button class="plus-button" on:click={() => {value++;dispatchUpdateEvent();}}>
            <img src="assets/icons/plus.png" alt="">
        </button>
    </div>
</div>

<style lang="scss">
    .text-input {
        width: calc(100% - 30px);
        height: 2em;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
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
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 4px;

        input {
            width: calc(100% - 1em - 8px - 3.4em);  // 100% - padding - .input-section flex gap - width of both buttons comined
            height: calc(100% - 1em);

            padding: 0.5em;

            background-color: #1f1f23;

            outline: none;
            border: 1px solid #2d2d33;
            border-radius: 3px;

            font-family: "Montserrat", Arial;
            font-size: 12px;
            font-weight: 800;
            color: #ffffff;

            transition: 0.3s;

            text-align: center;

            -moz-appearance: textfield;

            &:focus {
                background-color: #242429;
            }
        }

        input::-webkit-inner-spin-button, input::-webkit-outer-spin-button { 
            -webkit-appearance: none; 
            margin: 0; 
        }

        button {
            height: 1.7em;
            width: 1.7em;

            display: flex;
            align-items: center;
            justify-content: center;

            background-color: #222327;
            border-radius: 4px;
            border: 1px solid #2e3036;

            cursor: pointer;

            img {
                height: 40%;
            }
        }
    }
</style>