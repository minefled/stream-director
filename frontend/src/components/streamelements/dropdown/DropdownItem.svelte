<script lang="ts">
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let name:string;
    export let icon_url:string;
    export let color:string = "ffffff";

    function onClick() {
        dispatch("click");
    }
</script>

<div class="dropdown-item" on:click={onClick}>
    <img src={icon_url} alt="" class="icon">
    <b class="name" style="color: #{color};">{name}</b>
</div>

<style lang="scss">
    .dropdown-item {
        width: calc(100% - 40px);

        padding: 12px 20px;
        border-radius: 3px;

        display: flex;
        flex-direction: row;
        align-items: center;

        cursor: pointer;

        transition: 0.3s;

        white-space: nowrap;

        &:hover {
            background-color: #232429;
        }
    }

    img.icon {
        height: 1.4em;
        width: 1.4em;

        margin-right: 0.8em;
    }
</style>