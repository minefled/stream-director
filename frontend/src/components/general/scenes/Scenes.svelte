<script lang="ts">
    import Scene from "./Scene.svelte";

    export let selectedSceneID:string   = "";
    export let viewedSceneID:string     = "";

    export let scenes:any[] = [
        {
            id: "781c69a2-7ed7-43bf-b395-1554aa3eb46e",
            name: "Intro"
        },
        {
            id: "93e3d261-0260-4008-bb51-22c85393758a",
            name: "Just Chatting"
        },
        {
            id: "71f8293c-dd40-4f42-88bb-cdd7bd3dfd06",
            name: "Game"
        },
        {
            id: "896ef77f-dddd-47bd-9f57-cf330f9c65ca",
            name: "Outro"
        }
    ];

    function handleSelect(e) {
        selectedSceneID = e.detail?.id || "";
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
            />
        {/each}
    </div>
</div>

<div class="connection-corner">
    <div class="mask" />
</div>

<style lang="scss">
    .scenes {
        width: 10vw;
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
        left: 10vw;

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