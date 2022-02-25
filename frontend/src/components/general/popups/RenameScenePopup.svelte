<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    export let sceneName:string;
    export let sceneID:string;

    let value:string = "";
    let isInvalid:boolean = false;

    let inputElement:HTMLInputElement;

    let dispatch = createEventDispatcher();

    onMount(() => {
        inputElement.focus();

        window.addEventListener("keydown", (e) => {
            if(e.key == "Escape") dispatch("cancel");
        });
    })

    function onSubmit() {
        if(value.length < 1 || value.length > 32) {
            isInvalid = true;
            setTimeout(() => {isInvalid = false;}, 1200);
            return;
        }

        dispatch("submit", { value });
    }

    function onKeyPress(e) {
        if(e.key == "Enter") onSubmit();
    }
</script>

<div class="popup-container">
    <div class="popup">
        <div class="rename-message">Rename <b>{sceneName}</b></div>

        <input
            type="text"
            placeholder="New name..."

            bind:value={value}
            bind:this={inputElement}

            on:change={onSubmit}
            on:keydown={onKeyPress}
            
            class="{isInvalid ? "invalid":""}"
        >
    </div>
</div>

<style lang="scss">
    .popup-container {
        position: fixed;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;

        z-index: 20;

        background-color: #00000055;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .popup {
        font-family: "Montserrat", Arial;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;

        background-color: #24262c;
        box-shadow: 0px 2px 16px #0f0f0f;

        padding: 0.8em;

        border-radius: 6px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;

        input {
            width: 20em;

            font-family: "Montserrat", Arial;
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;

            text-align: center;
            
            background-color: #202024;
            border: 1px solid #18191b;
            border-radius: 4px;
            outline: none;

            padding: 0.3em 0em;

            &.invalid {
                animation: invalid-animation 1.2s;
            }

            @keyframes invalid-animation {
                0% {
                    border: 1px solid #18191b;
                    background-color: #202024;
                }
                50% {
                    border: 1px solid #c74052;
                    background-color: #2a2123;
                }
                100% {
                    border: 1px solid #18191b;
                    background-color: #202024;
                }
            }
        }
    }
</style>