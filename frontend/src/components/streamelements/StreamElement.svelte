<script lang="ts">
    import { onMount } from "svelte";

    import type APIClient from "../../api/APIClient";
    import type { StreamElement } from "../../api/types/StreamElement";
    import type { Component } from "../../api/types/UIComponent";

    import TextInput from "./components/TextInput.svelte";

    let expanded:boolean = true;
    let contentHeight:number = 0;

    export let api:APIClient;
    export let data:StreamElement;

    let components:Component[] = [];

    onMount(() => {
        components = data.ui.components;
    });
</script>

<div class="control-panel">
    <div class="head {expanded ? "content-exp":""}" on:click={() => {expanded = !expanded;}}>
        <div class="head-content">
            <b class="name">{data.ui.panel.name}</b>
        </div>
    </div>

    <div class="details {expanded ? "expaned":""}" style="height: {expanded ? contentHeight:0}px">
        <div class="content" bind:clientHeight={contentHeight}>
            {#each components as c}
                {#if c.type == "text-input"}
                    <TextInput name={c.name} />
                {/if}
            {/each}
        </div>
    </div>
</div>

<style lang="scss">
    .control-panel {
        width: 100%;
        height: max-content;

        font-family: "Montserrat", Arial;
        font-size: 16px;
        font-weight: 500;
    }

    .head {
        width: 100%;
        height: 3.3em;

        background-color: #28282e;

        border-radius: 8px 8px 8px 8px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        transition: 0.5s;

        cursor: pointer;

        &.content-exp {
            border-radius: 8px 8px 0px 0px;
        }

        .head-content {
            width: calc(100% - 12px);
            height: calc(100% - 12px);

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            b.name {
                font-weight: 800;
                color: #ffffff;

                margin-left: 0.6em;
            }
        }
    }

    .details {
        width: 100%;
        height: 0px;

        overflow: hidden;
        opacity: 0%;

        padding-top: 0px;
        padding-bottom: 0px;

        border-radius: 0px 0px 8px 8px;

        background-color: #1f1f23;

        transition: 0.5s;

        display: flex;
        flex-direction: column;
        align-items: center;

        &.expaned {
            padding-top: 12px;
            padding-bottom: 12px;
            opacity: 100%;
        }

        .content {
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
        }
    }
</style>