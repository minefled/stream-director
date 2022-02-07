<script lang="ts">
    import { onMount } from "svelte";

    import type APIClient from "../../../api/APIClient";
    import type { Scene as _Scene } from "../../../api/types/Scene";

    import Scene from "./Scene.svelte";

    export let selectedSceneID:string   = "";
    export let viewedSceneID:string     = "";

    export let scenes:_Scene[] = [];
    export let api:APIClient;

    onMount(async () => {
        api.events.createEventAwaiter(event => event.type == "connect", async () => {
            let sceneData = await api.getScenes();
            viewedSceneID = sceneData.selectedSceneID;
            scenes = sceneData.scenes;
        });

        api.events.createEventListener(
            event => {console.log(event, event.type == "select_scene"); return event.type == "select_scene";},
            event => {
                viewedSceneID = event.data.scene_id;
            }
        );
    });

    function handleSelect(e) {
        selectedSceneID = e.detail?.id || "";
    }

    function handleView(e) {
        api.selectScene(e.detail?.id || "");
    }
</script>

<div class="scenes">
    <div class="head">
        Scenes
        <div class="separator-line" />
    </div>

    <div class="scene-list">
        {#each scenes as scene, i}
            <Scene
                id={scene.id}
                name={scene.name}

                selected={selectedSceneID == scene.id}
                view={viewedSceneID == scene.id}

                appearAnimationDelay={i*0.1}

                on:select={handleSelect}
                on:view={handleView}
            />
        {/each}
    </div>
</div>

<div class="connection-corner">
    <div class="mask" />
</div>

<style lang="scss">
    .scenes {
        width: 12vw;
        height: 100%;

        background-color: #28292e;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .head {
        width: 100%;

        margin-top: 16px;

        display: flex;
        flex-direction: column;
        align-items: center;

        font-family: "Montserrat", Arial;
        font-size: 16px;
        font-weight: 800;

        color: #ffffff;

        .separator-line {
            width: 85%;
            height: 2px;

            margin-top: 0.25em;

            background-color: #313138;
        }
    }

    .scene-list {
        width: 80%;

        margin-top: 8px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
    }

    /*
     * The connection corner connects the header with the scene selection
     * in a smooth way 
     */
    .connection-corner {
        position: fixed;
        top: 50px;
        left: 12vw;

        height: 30px;
        width: 30px;

        background-color: #28292e;

        .mask {
            width: 100%;
            height: 100%;

            border-top-left-radius: 30px;

            background-color: var(--main-background);
        }
    }
</style>