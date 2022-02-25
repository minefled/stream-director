<script lang="ts">
    /* == JS Imports == */
    import { afterUpdate, onMount } from "svelte";
    import Typewriter from "typewriter-effect/dist/core";

    import type APIClient from "../../../api/APIClient";

    import type { Scene } from "../../../api/types/Scene";
    import RenameScenePopup from "../popups/RenameScenePopup.svelte";

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
    let oldSelectedSceneID:string = "";

    let isRenaming:boolean = false;

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

        api.events.createEventListener(
            event => event.type == "scene_create",
            event => {
                addScene(event.data.scene_id, event.data.name);
            }
        );
    });

    afterUpdate(() => {
        if(oldSelectedSceneID != selectedSceneID) {
            isRenaming = false;
            oldSelectedSceneID = selectedSceneID;
        }

        updateIsLiveText();
        updateSelectedSceneName();
    });

    /* == Internal Functions == */
    function updateIsLiveText() {
        if(isLive == null) return;
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

    function deleteScene() {
        api.deleteScene(selectedSceneID);
    }

    function addScene(id:string, name:string) {
        allScenes = [...allScenes, {id, name}];
    }

</script>

<div class="header">
    <div class="time-section {isConnected ? "":"not-connected"}">
        {timeString}
    </div>

    <div class="scene-section">
        <b class="selected-scene-name">{selectedSceneName}</b>
        <img src="assets/icons/edit.png" alt="" class="edit-icon" on:click={() => {isRenaming = true;}}>
        <img src="assets/icons/delete.png" alt="" class="delete-icon" on:click={deleteScene}>
    </div>

    <div class="stream-info-section">
        <div class="islive-dot {isLive ? "live":""}" />

        <b bind:this={liveInfoTextElement}></b>
    </div>
</div>

{#if isRenaming}
    <RenameScenePopup
        sceneID={selectedSceneID}
        sceneName={selectedSceneName}

        on:cancel={() => { isRenaming = false; }}
        on:submit={(e) => { api.renameScene(selectedSceneID, e.detail?.value || selectedSceneName); isRenaming = false; }}
    />
{/if}

<style lang="scss">
    .header {
        width: 100%;
        height: 50px;

        background-color: #25262c;

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

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        input {
            padding: 0.2em 1em;

            width: 0px;

            background-color: #222327;
            border: 1px solid #25262c;
            border-radius: 4px;

            font-family: "Montserrat", Arial;
            font-weight: 700;
            font-size: 18px;
            color: #ffffff;

            animation: input-appear 0.8s;
            transition: 0.8s;
        }

        @keyframes input-appear {
            0% { opacity: 0%; }
            100% { opacity: 100%; }
        }

        img {
            height: 1em;

            cursor: pointer;
            filter: grayscale(0.5);
            transition: 0.3s;

            &:hover {
                filter: grayscale(0);
            }

            &.edit-icon {
                margin-left: 1em;
            }

            &.delete-icon {
                margin-left: 0.5em;
            }
        }
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