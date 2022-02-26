<script lang="ts">
import { onMount } from "svelte";

    import type APIClient from "../../../api/APIClient";

    import AddElementButton from "./AddElementButton.svelte";
    import ElementPlugin from "./ElementPlugin.svelte";

    export let api:APIClient;

    let showPopup = false;
    let hidingPopup = false;

    let allElementPlugins = null;

    onMount(() => {
        api.events.createEventListener(e => e.type == "connect", () => {
            show();
        });
    });

    async function show() {
        hidingPopup = false;
        showPopup = true;

        allElementPlugins = await api.getElementPlugins();
    }

    function hide() {
        hidingPopup = true;

        setTimeout(() => {
            showPopup = false;
            hidingPopup = false;
        }, 800);
    }

    function addElement(pluginID:string) {
        hide();
    }
</script>

<AddElementButton on:click={show}/>

{#if showPopup}
    <div class="popup-container {hidingPopup?"hiding":""}">
        <div class="popup {hidingPopup?"hiding":""}">
            <div class="title">Add Element</div>

            <div class="element-list">
                {#if !allElementPlugins}
                    <div class="loader"></div>
                {:else}
                    {#each allElementPlugins as ep}
                        <ElementPlugin data={ep} on:add={(e) => {addElement(e.detail?.id);}}/>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
{/if}

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

        animation: container-appear 0.8s;

        &.hiding {
            animation: container-disappear 0.8s;
        }
    }

    @keyframes container-appear {
        0% { opacity: 0%; }
        100% { opacity: 100%; }
    }

    @keyframes container-disappear {
        0% { opacity: 100%; }
        100% { opacity: 0%; }
    }

    .popup {
        width: 40vw;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;

        background-color: #24262c;
        box-shadow: 0px 2px 16px #0f0f0f;

        padding: 0.8em 1.4em;

        border-radius: 6px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;

        animation: popup-appear 0.8s;

        .element-list {
            width: 100%;
            height: auto;
            max-height: 45vh;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;

            .loader {
                width: 40px;
                height: 40px;

                border: 6px solid #ffffff00;
                border-top-color: #48c293;
                border-left-color: #48c293aa;
                border-bottom-color: #48c29355;
                border-radius: 50%;

                box-sizing: border-box;
                display: inline-block;

                animation: loader-spin 0.8s linear infinite;
            }

            @keyframes loader-spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        }

        &.hiding {
            animation: popup-disappear 0.8s;
        }
    }

    @keyframes popup-appear {
        0% { opacity: 0%; transform: translateY(30%); }
        100% { opacity: 100%; transform: translateY(0%); }
    }

    @keyframes popup-disappear {
        0% { opacity: 100%; transform: translateY(0%); }
        100% { opacity: 0%; transform: translateY(30%); }
    }
</style>