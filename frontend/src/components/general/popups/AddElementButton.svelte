<script lang="ts">
    import { createEventDispatcher } from "svelte";
    let dispatch = createEventDispatcher();

    function onClick() {
        dispatch("click");
    }
</script>

<div class="add-element-button" on:click={onClick}>
    <img src="assets/icons/plus.png" alt="">
</div>

<style lang="scss">
    .add-element-button {
        width: 40px;
        height: 40px;

        position: fixed;
        bottom: 16px;
        right: 16px;

        border-radius: 50%;
        background-color: #2a2b31;
        box-shadow: 0px 2px 16px #11111155;

        z-index: 15;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;

        transition: 0.3s;

        img {
            height: 40%;
        }

        &:hover {
            border-radius: 35%;
            background-color: #303138;
            box-shadow: 0px 2px 16px #11111199;
        }
    }
</style>