<script lang="ts">
    import { afterUpdate, createEventDispatcher, onMount } from "svelte";

    import type { Component } from "../../api/types/UIComponent";

    //// Component Imports ////
    import TextInput from "./components/inputs/TextInput.svelte";
    import Button from "./components/inputs/Button.svelte";
    import NumberSlider from "./components/inputs/NumberSlider.svelte";
    import Switch from "./components/inputs/Switch.svelte";

    import Separator from "./components/Separator.svelte";
    import Headline from "./components/Headline.svelte";
import NumberInput from "./components/inputs/NumberInput.svelte";
import ToggleButton from "./components/inputs/ToggleButton.svelte";
import Checkbox from "./components/inputs/Checkbox.svelte";
import TextArea from "./components/inputs/TextArea.svelte";

    //// Public Variables ////
    export let components:Component[] = [];
    export let state:{ [key: string]: any; } = {};

    //// Private Variables ////
    let dispatch = createEventDispatcher();

    //// Lifecycle listeners ////
    onMount(() => {
        sortComponents();
    });

    afterUpdate(() => {
        sortComponents();
    });

    function handleUpdateEvent(e, propertyKey:string) {
        dispatch("update", {e, propertyKey});
    }

    function handleButtonClickEvent(e, propertyKey:string) {
        dispatch("click", {e, propertyKey});
    }

    function sortComponents() {

        let componentSpaces:Component[] = new Array(components.length);
        for(var c of components) {
            if(c.options?.position !== undefined && c.options?.position !== null) {
                if(!componentSpaces[c.options?.position]) {
                    // Spot is available
                    componentSpaces[c.options?.position] = c;
                } else {
                    // Spot is not available
                    for(var i=c.options?.position;i<components.length;i++) {
                        if(!componentSpaces[i]) {
                            componentSpaces[i] = c;
                            break;
                        }
                    }
                }
            }
        }

        for(var c of components) {
            if(!c.options?.position) {
                for(var j=0;j<components.length;j++) {
                    if(!componentSpaces[j]) {
                        componentSpaces[j] = c;
                        break;
                    }
                }
            }
        }

        components = componentSpaces;
    }
</script>

{#each components as c}
    {#if c.type == "text-input"}
        <TextInput
            name={c.name}
            value={state[c.propertyKey] || ""}
            options={c.options || {}}
            on:update={e => {handleUpdateEvent(e, c.propertyKey);}}
        />
    {:else if c.type == "button"}
        <div class="button-container">
            <Button
                name={c.name}
                options={c.options || {}}
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
    {:else if c.type == "switch"}
        <Switch
            name={c.name}
            value={state[c.propertyKey]}
            on:update={e => {handleUpdateEvent(e, c.propertyKey);}}
        />
    {:else if c.type == "number-input"}
        <NumberInput
            name={c.name}
            value={state[c.propertyKey]}
            on:update={e => {handleUpdateEvent(e, c.propertyKey);}}
        />
    {:else if c.type == "toggle-button"}
        <ToggleButton
            name={c.name}
            value={state[c.propertyKey]}
            options={c.options}
            on:update={e => {handleUpdateEvent(e, c.propertyKey);}}
        />
    {:else if c.type == "checkbox"}
        <Checkbox
            name={c.name}
            value={state[c.propertyKey]}
            on:update={e => {handleUpdateEvent(e, c.propertyKey);}}
        />
    {:else if c.type == "textarea"}
        <TextArea
            name={c.name}
            value={state[c.propertyKey] || ""}
            options={c.options}
            on:update={e => {handleUpdateEvent(e, c.propertyKey);}}
        />

    {:else if c.type == "separator"}
        <Separator />
    {:else if c.type == "headline"}
        <Headline name={c.name} />
    {/if}
{/each}

<style lang="scss">
    .button-container {
        width: calc(100% - 30px);
    }
</style>