<script lang="ts">
    import { createEventDispatcher } from "svelte";

    interface TextAreaOptions {
        rows?:number;
    }

    export let name:string;
    export let value:string = "";
    export let options:TextAreaOptions = {};

    let dispatch = createEventDispatcher();

    function dispatchUpdateEvent() {
        dispatch("update", { value });
    }
</script>

<div class="textarea">
    <div class="head">
        {name}
    </div>

    <div class="input-section">
        <textarea
            class="textarea"
            rows={options.rows || 3}

            bind:value={value}
            on:change={dispatchUpdateEvent}
        ></textarea>
    </div>
</div>

<style lang="scss">
    .textarea {
        width: calc(100% - 30px);

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
    }

    .head {
        width: 100%;
        padding: 4px 0px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;

        cursor: pointer;
    }

    .input-section {
        width: 100%;

        .textarea {
            width: calc(100% - 1em);

            padding: 0.5em;
            resize: none;

            background-color: #1f1f23;

            border: 1px solid #2d2d33;
            border-radius: 3px;
            outline: none;

            font-family: "Montserrat", Arial;
            font-size: 12px;
            font-weight: 800;
            color: #ffffff;

            transition: 0.3s;

            &:focus {
                background-color: #242429;
            }
        }
    }
</style>