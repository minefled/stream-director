<script lang="ts">
    export let name:string;
</script>

<div class="headline">
    <div class="line" />
    <b>{name}</b>
    <div class="line" />
</div>

<style lang="scss">
    .headline {
        width: calc(100% - 80px);

        margin-top: 0.5em;
        margin-bottom: 0.5em;

        font-family: "Montserrat", Arial;
        font-size: 12px;
        font-weight: 400;
        color: #ffffff;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .line {
        width: 100%;
        height: 2px;

        background-color: #28282f;
    }

    b {
        white-space: nowrap;

        margin: 0em 1.2em;
    }
</style>