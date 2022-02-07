<script lang="ts">
    export let name:string;
    export let value:string = "";
</script>

<div class="text-input">
    <div class="name-section">
        {name}    
    </div>
    <div class="input-section">
        <input type="text" bind:value={value}>
    </div>
</div>

<style lang="scss">
    .text-input {
        width: calc(100% - 30px);
        height: 2em;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: "Montserrat", Arial;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
    }

    .name-section {
        width: 35%;
        text-align: center;
    }

    .input-section {
        width: calc(65% - 6px);
        height: 100%;

        margin-left: 6px;

        input {
            width: calc(100% - 1em);
            height: calc(100% - 1em);

            padding: 0.5em;

            background-color: #1f1f23;

            outline: none;
            border: 1px solid #2d2d33;
            border-radius: 3px;

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