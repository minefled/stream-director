<script lang="ts">
    /* == JS Imports == */
    import { afterUpdate, onMount } from "svelte";
    import Typewriter from "typewriter-effect/dist/core";

    import type APIClient from "../../../api/APIClient";
    import type { Scene } from "../../../api/types/Scene";

    /* == External Variables == */
    export let api:APIClient;
    export let selectedSceneID:string;

    /* == Internal Variables == */
    let isLive:boolean = null;
    let isConnected:boolean = false;

    let timeString = new Date().toLocaleTimeString();
    let liveInfoTextElement;
    let liveInfoTextTypewriter:Typewriter;

    let oldIsLive:boolean = null;

    let allScenes:Scene[] = [];
    let selectedSceneName:string = "";

    /* == Svelte Functions == */
    onMount(() => {
        liveInfoTextTypewriter = new Typewriter(liveInfoTextElement, {
            cursor: ""
        });

        setInterval(() => {
            timeString = new Date().toLocaleTimeString();
        }, 500);

        api.events.createEventListener(e => e.type == "connect", async () => {
            isConnected = true;

            allScenes = (await api.getScenes()).scenes;
            isLive = (await api.getIsLive());
        });
        api.events.createEventListener(e => e.type == "disconnect", () => {isConnected = false;});

        api.events.createEventListener(e => e.type == "is_live_update", (e) => {
            isLive = e.data.is_live;
        });
    });

    afterUpdate(() => {
        updateIsLiveText();
        updateSelectedSceneName();
    });

    /* == Internal Functions == */
    function updateIsLiveText() {
        if(!isLive) return;
        if(oldIsLive == isLive) return;
        oldIsLive = isLive;

        liveInfoTextTypewriter
            .deleteAll()
            .typeString(isLive ? "Live":"Offline")
            .start();
            
    }

    function updateSelectedSceneName() {
        for(var s of allScenes) if(s.id == selectedSceneID) selectedSceneName = s.name;
    }
</script>

<div class="header">
    <div class="time-section {isConnected ? "":"not-connected"}">
        {timeString}
    </div>

    <div class="scene-section">
        <b class="selected-scene-name">{selectedSceneName}</b>
    </div>

    <div class="stream-info-section">
        <div class="islive-dot {isLive ? "live":""}" />

        <b bind:this={liveInfoTextElement}></b>
    </div>
</div>

<style lang="scss">
    .header {
        width: 100%;
        height: 50px;

        background-color: #28292e;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .time-section {
        width: calc(12vw - 24px);

        margin-left: 12px;
        margin-right: 12px;

        font-size: 18px;
        font-weight: 800;
        font-family: "Montserrat", Arial;
        color: #ffffff;

        text-shadow: 0px 0px 20px #555;
        text-align: center;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        &.not-connected {
            color: #ed3752;
            text-shadow: 0px 0px 20px #ed375288;
        }
    }

    .scene-section {
        font-family: "Montserrat", Arial;
        font-weight: 400;
        font-size: 18px;
        color: #ffffff;

        margin-left: 1.3em;
    }

    .stream-info-section {
        display: flex;
        flex-direction: row;
        align-items: center;

        position: fixed;
        right: 12px;

        font-size: 14px;
        font-weight: 400;
        font-family: "Montserrat", Arial;
        color: #ffffff;

        .islive-dot {
            width: 1em;
            height: 1em;

            margin-right: 0.6em;

            background-color: #464953;
            border-radius: 50%;

            transition: 1.5s;

            &.live {
                background-color: #dd4850;
            }
        }
    }
</style>