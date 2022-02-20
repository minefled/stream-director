<script lang="ts">
    export let numberOfButtons:number = 0;
    
    let columns:number = 1;

    $: columns = Math.max(
        Math.min(Math.floor(Math.sqrt(numberOfButtons)), 4),
        (numberOfButtons%3==0) ? 3:1,
        (numberOfButtons%2==0) ? 2:1,
        1
    );
</script>

<div class="button-group">
    <div class="buttons" style="grid-template-columns: {"1fr ".repeat(columns)}">
        <slot />
    </div>
</div>

<style lang="scss">
    .button-group {
        width: calc(100% - 30px);
    }

    .buttons {
        width: 100%;

        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
    }
</style>