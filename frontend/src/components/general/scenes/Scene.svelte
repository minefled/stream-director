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
</script>

<div class="scene {selected ? "selected":""} {view ? "view":""}" style="animation-delay: {appearAnimationDelay}s" on:click={select}>
    <b class="name">{name}</b>
</div>

<style lang="scss">
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

        font-family: "Montserrat", Arial;
        font-size: 13px;
        font-weight: 500;

        cursor: pointer;

        opacity: 0%;

        transition: 0.3s;
        animation: 1s appearing forwards;

        &.selected {
            background-color: #393a41;
            border: 1px solid #464750;
        }

        &.view {
            background-color: #3aa578;
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