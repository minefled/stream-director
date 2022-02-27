<script lang="ts">
    import { onMount } from "svelte";

    import type APIClient from "../../../api/APIClient";
    import type { StreamElement } from "../../../api/types/StreamElement";

    import StreamElementComponent from "../../streamelements/StreamElement.svelte";

    export let api:APIClient;
    export let elements:StreamElement[] = [];
    export let selectedSceneID:string = "";

    onMount(async () => {
        api.events.createEventAwaiter(event => event.type == "connect", async () => {
            elements = await api.getElements();
        });

        api.events.createEventListener(
            event => event.type == "element_added",
            event => {
                elements = [...elements, event.data.element];
            }
        );

        api.events.createEventListener(
            event => event.type == "element_removed",
            event => {
                for(var i=0;i<elements.length;i++) {
                    if(elements[i].id == event.data.element_id) {
                        elements.splice(i, 1);
                    }
                }

                elements = elements;
            }
        );
    });
</script>

<div class="elements">
    {#each elements as element}
        <StreamElementComponent api={api} data={element} selectedSceneID={selectedSceneID}/>
    {/each}
</div>

<style lang="scss">
    .elements {
        width: calc(100% - 12vw - 60px);
        max-height: calc(100vh - 12px - 50px);

        margin-top: 30px;
        margin-left: 30px;
        margin-right: 30px;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 16px;

        opacity: 0%;
        animation: 1s appearing forwards 0.25s;
    }

    @keyframes appearing {
        0% {
            opacity: 0%;
        }
        100% {
            opacity: 100%;
        }
    }
</style>