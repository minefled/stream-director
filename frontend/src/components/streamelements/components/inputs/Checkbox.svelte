<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let name:string;
    export let value:boolean = false;

    let dispatch = createEventDispatcher();

    function dispatchUpdateEvent() {
        dispatch("update", { value });
    }

    function toggle() {
        value = !value;
        dispatchUpdateEvent();
    }
</script>

<div class="checkbox-input">
    <div class="name-section">
        {name}    
    </div>
    <div class="input-section" on:click={toggle}>
        <div class="checkbox">
            {#if value}
                <img src="assets/icons/checkbox-true.png" alt="">
            {:else}
                <img src="assets/icons/checkbox-false.png" alt="">
            {/if}
        </div>
    </div>
</div>

<style lang="scss">
    .checkbox-input {
        width: calc(100% - 30px);
        height: 2.4em;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
    }

    .name-section {
        width: 35%;
        text-align: center;
    }

    .input-section {
        width: calc(65% - 6px);
        height: 100%;

        margin-left: 6px;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        .checkbox {
            width: 1.4em;
            height: 1.4em;

            background-color: #1f1f23;
            border: 1px solid #2d2d33;
            border-radius: 3px;

            display: flex;
            align-items: center;
            justify-content: center;

            img {
                height: 60%;
            }
        }
    }
</style>