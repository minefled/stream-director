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

        margin-top: 0.8em;
        margin-bottom: 0.8em;

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

        background-color: #26262e;
    }

    b {
        white-space: nowrap;

        margin: 0em 1.2em;
    }
</style>