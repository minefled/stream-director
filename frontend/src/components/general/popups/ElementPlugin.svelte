<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import type { ElementPlugin } from "../../../api/types/ElementPlugin";

    export let data:ElementPlugin;
    let dispatch = createEventDispatcher();

    function add() {
        dispatch("add", { id: data.id })
    }
</script>

<div class="element-plugin" on:click={add}>
    <div class="icon">
        <img class="icon" src="assets/icons/plugin.png" alt="">
    </div>

    <div class="details">
        <div class="name-and-id">
            <div class="name">{data.name}</div>
            <div class="id">({data.id})</div>
        </div>

        {#if data.description}
            <div class="description">
                {data.description}
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .element-plugin {
        width: calc(100% - 24px);

        padding: 10px 12px;

        border-radius: 5px;
        background-color: #21222700;

        transition: 0.3s;

        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;

        font-family: "Montserrat", Arial;
        font-weight: 500;
        font-size: 14px;

        cursor: pointer;

        &:hover {
            background-color: #222429;
        }
    }

    .icon {
        height: 3em;
        width: 3em;

        display: flex;
        align-items: center;
        justify-content: center;

        background-color: #303036;
        border-radius: 6px;
        box-shadow: 0px 2px 12px #1e1e1e;

        img {
            height: 60%;
            width: 60%;
        }
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        .name-and-id {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;

            gap: 8px;

            .name {
                font-weight: 800;
            }

            .id {
                font-weight: 400;
                font-size: 13px;
                color: #67676d;
            }
        }

        .description {
            margin-top: 2px;

            font-size: 11px;
            color: #9e9ead
        }
    }
</style>