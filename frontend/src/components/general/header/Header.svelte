<script lang="ts">
    /* == JS Imports == */
    import { afterUpdate, onMount } from "svelte";
    import Typewriter from "typewriter-effect/dist/core";

    /* == External Variables == */
    export let isLive:boolean = false;

    /* == Internal Variables == */
    let timeString = new Date().toLocaleTimeString();
    let liveInfoTextElement;
    let liveInfoTextTypewriter:Typewriter;

    let oldIsLive:boolean = null;

    /* == Svelte Functions == */
    onMount(() => {
        liveInfoTextTypewriter = new Typewriter(liveInfoTextElement, {
            cursor: ""
        });

        setInterval(() => {
            timeString = new Date().toLocaleTimeString();
        }, 500);

        setTimeout(() => {
            isLive = true;
        }, 5000);

        updateIsLiveText();
    });

    afterUpdate(() => {
        updateIsLiveText();
    })

    /* == Internal Functions == */
    function updateIsLiveText() {
        if(oldIsLive == isLive) return;
        oldIsLive = isLive;

        liveInfoTextTypewriter
            .deleteAll()
            .typeString(isLive ? "Live":"Offline")
            .start();
            
    }
</script>

<div class="header">
    <div class="time-section">{timeString}</div>

    <div class="stream-info-section">
        <div class="islive-dot {isLive ? "live":""}" />

        <b bind:this={liveInfoTextElement}></b>
    </div>
</div>

<style lang="scss">
    .header {
        width: 100%;
        height: 50px;

        background-color: #28292e;

        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .time-section {
        width: calc(10vw - 24px);

        margin-left: 12px;
        margin-right: 12px;

        font-size: 18px;
        font-weight: 800;
        font-family: "Montserrat", Arial;
        color: #ffffff;

        text-shadow: 0px 2px 12px #222;
        text-align: center;
    }

    .stream-info-section {
        display: flex;
        flex-direction: row;
        align-items: center;

        position: fixed;
        right: 12px;

        font-size: 14px;
        font-weight: 400;
        font-family: "Montserrat", Arial;
        color: #ffffff;

        .islive-dot {
            width: 1em;
            height: 1em;

            margin-right: 0.6em;

            background-color: #464953;
            border-radius: 50%;

            transition: 1.5s;

            &.live {
                background-color: #dd4850;
            }
        }
    }
</style>