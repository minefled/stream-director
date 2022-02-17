<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import type { Component } from "../../api/types/UIComponent";

    import TextInput from "./components/TextInput.svelte";
    import Button from "./components/Button.svelte";
    import NumberSlider from "./components/NumberSlider.svelte";

    export let components:Component[] = [];
    export let state:{ [key: string]: any; } = {};

    let dispatch = createEventDispatcher();

    function handleUpdateEvent(e, propertyKey:string) {
        dispatch("update", {e, propertyKey});
    }

    function handleButtonClickEvent(e, propertyKey:string) {
        dispatch("click", {e, propertyKey});
    }
</script>

{#each components as c}
    {#if c.type == "text-input"}
        <TextInput
            name={c.name}
            value={state[c.propertyKey] || ""}
            on:update={e => {handleUpdateEvent(e, c.propertyKey);}}
        />
    {:else if c.type == "button"}
        <div class="button-container">
            <Button
                name={c.name}
                on:click={e => {handleButtonClickEvent(e, c.propertyKey);}}
            />
        </div>
    {:else if c.type == "number-slider"}
        <NumberSlider
            name={c.name}
            value={state[c.propertyKey] || 0}
            options={c.options || {}}

            on:update={e => {handleUpdateEvent(e, c.propertyKey);}}
        />
    {/if}
{/each}

<style lang="scss">
    .button-container {
        width: calc(100% - 30px);
    }
</style>