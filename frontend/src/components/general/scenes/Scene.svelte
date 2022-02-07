<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let id:string;
    export let name:string;
    export let selected:boolean = false;
    export let view:boolean = false;

    export let appearAnimationDelay:number = 0;

    let dispatch = createEventDispatcher();

    function select() {
        dispatch("select", { id });
    }

    function viewScene() {
        dispatch("view", { id })
    }
</script>

<div class="scene-container" style="animation-delay: {appearAnimationDelay}s">
    <div class="scene {selected ? "selected":""} {view ? "view":""}" on:click={select}>
        <b class="name">{name}</b>
    </div>

    <div class="view-button" on:click={viewScene}>
        <img src="/assets/icons/view.png" alt="">
    </div>
</div>

<style lang="scss">
    .scene-container {
        width: 90%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 6px;

        opacity: 0%;
        animation: 1s appearing forwards;

        font-family: "Montserrat", Arial;
        font-size: 13px;
        font-weight: 500;
    }

    .scene {
        width: 90%;

        background-color: #2e2f35;
        color: #ffffff;
        
        padding: 0.5em 0em 0.5em 0em;

        border-radius: 6px;
        border: 1px solid #2e2f35;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        transition: 0.3s;

        &.selected {
            background-color: #393a41;
            border: 1px solid #464750;
        }

        &.view {
            background-color: #3aa578;
        }
    }

    .view-button {
        width: 2em;
        height: 2em;

        background-color: #2e2f35;
        color: #ffffff;
        
        border-radius: 6px;
        border: 1px solid #464750;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        img {
            width: 1em;
            height: 1em;
        }
    }

    @keyframes appearing {
        0% {
            transform: translateX(-30%);
            opacity: 0%;
        }
        100% {
            transform: translateX(0%);
            opacity: 100%;
        }
    }
</style>