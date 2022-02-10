<script lang="ts">

</script>

<div class="login-page">
    <div class="login-field">
        <div class="head">
            <img src="/favicon.png" alt="" class="icon">
            Streamdirector
        </div>

        <div class="form">
            <div class="in-row">
                <input type="text" placeholder="Username">
            </div>
            <div class="in-row">
                <input type="password" placeholder="Password">
            </div>
            <button class="login-button">Log in</button>
        </div>
    </div>
</div>

<style lang="scss">
    .login-page {
        width: 100%;
        height: 100%;

        display: flex;
        align-items: center;
        justify-content: center;

        background: radial-gradient(circle, #25262c 0%, #1f1f24 100%);
    }

    .login-field {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .head {
        width: 100%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        font-family: "Montserrat", Arial;
        font-size: 22px;
        font-weight: 900;
        color: #ffffff;

        padding-top: 0.6em;
        padding-bottom: 0.6em;
        margin-bottom: 1em;

        img.icon {
            height: 1.8em;
            margin-right: 0.6em;
        }
    }

    .form {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.7em;

        font-family: "Outfit", Arial;
        font-size: 22px;
        font-weight: 700;
        color: #ffffff;

        padding: 0em 3em 0em 3em;
    }

    .in-row {
        width: 80%;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    input {
        width: calc(100% - 1.6em);

        background-color: #242429;

        outline: none;
        border: 1px solid #1b1c1d;
        border-radius: 3px;

        padding: 0.4em 0.8em 0.4em 0.8em;

        font-family: "Outfit", Arial;
        font-size: 16px;
        font-weight: 500;
        color: #ffffff;

        transition: 0.3s;

        &:focus {
            background-color: #28282e;
        }
    }

    .login-button {
        width: 80%;

        background-color: #393b44;

        border: none;
        border-radius: 6px;

        padding-top: 0.3em;
        padding-bottom: 0.3em;
        margin-top: 1em;

        font-family: "Outfit", Arial;
        font-size: 16px;
        font-weight: 900;
        color: #ffffff;

        cursor: pointer;

        transition: 0.3s;

        &:hover {
            background-color: #3e404b;
        }
    }
</style>