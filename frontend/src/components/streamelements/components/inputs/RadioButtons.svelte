<script lang="ts">
import RadioButton from "./RadioButton.svelte";

    interface RadioOption {
        id:string;
        name:string;
    }
    interface RadioButtonsOptions {
        /**
         * The hexadecimal color value that all buttons should have
         */
        color?:string;

        /**
         * The hexadecimal color value that the activated button should have
         */
        activatedColor?:string;

        /**
         * The available options
         */
        options:RadioOption[];
    }

    export let options:RadioButtonsOptions;
    export let value:any;

    let columns:number = 1;

    $: columns = Math.max(
        Math.min(Math.floor(Math.sqrt(options.options.length)), 4),
        (options.options.length%3==0) ? 3:1,
        (options.options.length%2==0) ? 2:1,
        1
    );
</script>

<div class="radio-button-group">
    <div class="options" style="grid-template-columns: {"1fr ".repeat(columns)}">
        {#each options.options as opt}
            <RadioButton id={opt.id} name={opt.name} color={options.color} />
        {/each}
    </div>
</div>

<style lang="scss">
    .radio-button-group {
        width: calc(100% - 30px);
    }

    .options {
        width: 100%;

        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 5px;
    }
</style>