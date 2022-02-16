<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name:string;

    let dispatch = createEventDispatcher();

    function dispatchClickEvent() {
        dispatch("click");
    }
</script>

<div class="btn">
    <button on:click={dispatchClickEvent}>{name}</button>
</div>

<style lang="scss">
    .btn {
        width: calc(100%);
        height: 2em;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;

        button {
            width: 100%;
            height: 100%;

            background-color: #1f1f23;

            outline: none;
            border: 1px solid #2d2d33;
            border-radius: 4px;

            font-family: "Montserrat", Arial;
            font-size: 12px;
            font-weight: 800;
            color: #ffffff;

            transition: 0.1s;

            cursor: pointer;

            &:active {
                background-color: #232327;
            }
        }
    }
</style>