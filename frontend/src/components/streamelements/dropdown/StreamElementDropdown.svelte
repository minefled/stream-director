<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";

    import DropdownItem from "./DropdownItem.svelte";

    export let x:number;
    export let y:number;
    export let elementID:string;

    let width:number = 0;
    let pageWidth:number = 0;

    let dispatch = createEventDispatcher();

    onMount(() => {
        pageWidth = document.body.getBoundingClientRect().width;
    });

    function onDeleteClick() {
        dispatch("delete");
        dispatch("close");
    }

    function onCopyIDClick() {
        dispatch("close");
    }

    function onCopyURLClick() {
        dispatch("close");
    }
</script>

<div class="dropdown" style="left: {(x+width+40 > pageWidth) ? x-width : x}px; top: {y}px" bind:clientWidth={width}>
    <DropdownItem name="Remove" icon_url="assets/icons/delete.png" color="e14b55" on:click={onDeleteClick}/>
    <DropdownItem name="Copy ID" icon_url="assets/icons/copy.png" on:click={onCopyIDClick} />
    <DropdownItem name="Copy URL" icon_url="assets/icons/copy.png" on:click={onCopyURLClick}/>
</div>

<style lang="scss">
    .dropdown {
        position: fixed;

        width: max-content;

        display: flex;
        flex-direction: column;
        align-items: center;

        padding: 0px 0px;
        border-radius: 10px;

        overflow: hidden;

        background-color: #28282e;
        box-shadow: 0px 2px 14px #11111177;

        z-index: 15;

        font-family: "Montserrat", Arial;
        font-size: 13px;
        font-weight: 700;

        color: #ffffff;
    }
</style>