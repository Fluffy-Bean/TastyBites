<script lang="ts">
    import { SealCheck } from "phosphor-svelte";

    let name = "";
    let email = "";

    let nameValid = true;
    let emailValid = true;

    function validateName() { nameValid = name.length > 1 }
    function validateEmail() { emailValid = email.length > 1 }

    function onSubmit() {
        validateName();
        validateEmail();
    }
</script>

<h1>Checkout > Payment</h1>
<form on:submit|preventDefault={onSubmit}>
    <div class="form-element">
        <label class="form-label" for="name">Name</label>
        <input
                bind:value={name}
                on:blur={validateName}
                on:input={validateName}
                type="text"
                id="name"
                name="name"
                class="form-input"
        />
        <span class="form-notice error">
            {#if !nameValid}
                Enter a name
            {/if}
        </span>
    </div>

    <div class="spacer half" />

    <div class="form-element">
        <label class="form-label" for="email">Email</label>
        <input
                bind:value={email}
                on:blur={validateEmail}
                on:input={validateEmail}
                type="text"
                id="email"
                name="email"
                class="form-input"
        />
        <span class="form-notice error">
            {#if !emailValid}
                Email not valid
            {/if}
        </span>
    </div>

    <div class="spacer half" />

    <p class="form-message success"><SealCheck weight="fill" />&nbsp;GwaGwa</p>
</form>

<style lang="scss">
    @import "../../styles/vars";
</style>