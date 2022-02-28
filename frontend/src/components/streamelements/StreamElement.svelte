<script lang="ts">
    import { afterUpdate, onMount } from "svelte";

    //// API ////
    import type APIClient from "../../api/APIClient";
    import type { StreamElement } from "../../api/types/StreamElement";
    import type { Component } from "../../api/types/UIComponent";
    import type { UIGroup } from "../../api/types/UIGroup";

    //// Components ////
    import ComponentList from "./ComponentList.svelte";
    import Button from "./components/inputs/Button.svelte";
    import ButtonGroup from "./groups/ButtonGroup.svelte";

    import StreamElementDropdown from "./dropdown/StreamElementDropdown.svelte";

    let expanded:boolean = false;
    let contentHeight:number = 0;
    let content:HTMLDivElement = null;

    export let api:APIClient;
    export let data:StreamElement;
    export let selectedSceneID:string = "";

    let _components:Component[] = [];
    let _groups:UIGroup[] = [];

    let components:Component[] = [];
    let groups:any[] = [];
    let state:{ [key: string]: any; } = {};

    let dropdownX:number;
    let dropdownY:number;
    let showDropdown:boolean = false;

    onMount(() => {
        _components = data.ui.components;
        _groups = data.ui.groups;

        api.events.createEventListener(
            e => e.type == "update_element_state_value",
            e => {
                if(e.data.element_id != data.id) return;

                updateStateValue(e.data.property_key, e.data.value, e.data.scene_id);
            }
        )

        /* == Makes the whole "starting"-animation of the page look better == */
        setTimeout(() => {
            contentHeight = content.clientHeight;
            expanded = true;
        }, 150);
    });

    afterUpdate(() => {
        contentHeight = content.clientHeight;

        //// Load selected scene state ////
        for(var s of data.state.scenes) {
            if(s.id == selectedSceneID) {
                state = s.state;
            }
        }

        //// Update components ////
        components = [];
        groups = [];

        for(var g of _groups) {
            groups.push({
                type: g.type,
                id: g.id,
                propertyKeys: g.propertyKeys,
                components: []
            });
        }

        for(var c of _components) {
            if(isInGroup(c.propertyKey)) {
                for(var gr of groups) {
                    if(gr.propertyKeys.includes(c.propertyKey)) {
                        gr.components.push(c);
                    }
                }
            } else {
                components.push(c);
            }
        }
    });

    function isInGroup(propertyKey:string):boolean {
        for(var g of groups) {
            if(g.propertyKeys.includes(propertyKey)) return true;
        }

        return false;
    }

    function updateStateValue(propertyKey:string, value:any, sceneID:string = selectedSceneID) {
        for (let i = 0; i < data.state.scenes.length; i++) {
            var scene = data.state.scenes[i];
            
            if(scene.id == sceneID) {
                data.state.scenes[i].state[propertyKey] = value;
            }
        }
    }

    function handleUpdateEvent(e, propertyKey:string) {
        updateStateValue(propertyKey, e.detail?.value);

        api.updateElementStateValue(
            selectedSceneID,
            data.id,
            propertyKey,
            e.detail?.value
        );
    }

    function handleButtonClickEvent(e, propertyKey:string) {
        api.runAction(data.id, selectedSceneID, propertyKey);
    }

    function handleHeadClick(e) {
        if(e.target.nodeName.toUpperCase() != "IMG") expanded = !expanded;
        else {
            var r = e.target.getBoundingClientRect();

            dropdownX = r.x;
            dropdownY = r.y + r.height + 8;
            showDropdown = !showDropdown;
        }
    }
</script>

<div class="control-panel">
    <div class="head {expanded ? "content-exp":""}" on:click={handleHeadClick}>
        <div class="head-content">
            <b class="name">{data.ui.panel.name}</b>
            <img src="assets/icons/options.png" alt="" class="options-icon">
        </div>
    </div>

    <div class="details {expanded ? "expaned":""}" style="height: {expanded ? contentHeight:0}px">
        <div class="content" bind:clientHeight={contentHeight} bind:this={content}>
            <ComponentList
                components={components}
                state={state}

                on:update={e => {handleUpdateEvent(e.detail?.e, e.detail?.propertyKey);}}
                on:click={e => {handleButtonClickEvent(e.detail?.e, e.detail?.propertyKey);}}
            />

            {#each groups as g}
                {#if g.type == "buttons"}
                    <ButtonGroup numberOfButtons={g.components.length}>
                        {#each g.components as c}
                            {#if c.type == "button"}
                                <Button
                                    name={c.name}
                                    options={c.options || {}}
                                    on:click={e => {handleButtonClickEvent(e, c.propertyKey);}}
                                />
                            {/if}
                        {/each}
                    </ButtonGroup>
                {/if}
            {/each}
        </div>
    </div>
</div>

{#if showDropdown}
    <StreamElementDropdown
        x={dropdownX}
        y={dropdownY}
        elementID={data.id}

        on:close={() => {showDropdown = false;}}
        on:delete={() => {
            api.removeElement(data.id);
        }}
    />
{/if}

<style lang="scss">
    .control-panel {
        width: 100%;
        height: max-content;

        font-family: "Montserrat", Arial;
        font-size: 16px;
        font-weight: 500;
    }

    .head {
        width: 100%;
        height: 3.3em;

        background-color: #28282e;

        border-radius: 8px 8px 8px 8px;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        transition: 0.5s;

        cursor: pointer;

        &.content-exp {
            border-radius: 8px 8px 0px 0px;
        }

        .head-content {
            width: calc(100% - 12px);
            height: calc(100% - 12px);

            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            b.name {
                font-weight: 800;
                color: #ffffff;

                margin-left: 0.6em;
            }

            img {
                height: 20px;
                width: 20px;

                margin-right: 8px;
            }
        }
    }

    .details {
        width: 100%;
        height: 0px;

        overflow: hidden;
        opacity: 0%;

        padding-top: 0px;
        padding-bottom: 0px;

        border-radius: 0px 0px 8px 8px;

        background-color: #1e1e22;

        transition: 0.5s;

        display: flex;
        flex-direction: column;
        align-items: center;

        &.expaned {
            padding-top: 12px;
            padding-bottom: 12px;
            opacity: 100%;
        }

        .content {
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;

            .button-container {
                width: calc(100% - 30px);
            }
        }
    }
</style>