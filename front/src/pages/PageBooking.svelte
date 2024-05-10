<script lang="ts">
    import { expandOnTyping } from "../lib/utils";
    import Calendar from "../components/Calendar.svelte";

    const specialRequestsMax = 300;

    let name = "";
    let email = "";
    let telephone = "";
    let specialRequests = "";

    let nameValid = true;
    let emailValid = true;
    let telephoneValid = true;
    let specialRequestsValid = true;

    function validateName() {
        nameValid = name.length > 1
    }

    function validateEmail() {
        emailValid = email.length > 1
    }

    function validateTelephone() {
        telephoneValid = telephone.length == 11
    }

    function validateSpecialRequests() {
        specialRequestsValid = specialRequests.length < 301
    }

    function onSubmit(event) {

    }
</script>

<h1>Table booking</h1>
<form on:submit|preventDefault={onSubmit}>
    <div class="form-element">
        <label class="form-label" for="name">Full Name</label>
        <input
                bind:value={name}
                on:blur={validateName}
                on:input={validateName}
                type="text"
                id="name"
                name="name"
                class="form-input"
        />
        {#if !nameValid}
            <span class="form-notice error">Enter a name</span>
        {/if}
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
        {#if !emailValid}
            <span class="form-notice error">Email not valid</span>
        {/if}
    </div>

    <div class="spacer half" />

    <div class="form-element">
        <label class="form-label" for="email">Telephone</label>
        <input
                bind:value={telephone}
                on:blur={validateTelephone}
                on:input={validateTelephone}
                type="text"
                id="telephone"
                name="telephone"
                class="form-input"
        />
        {#if !telephoneValid}
            <span class="form-notice error">Telephone number not valid</span>
        {/if}
    </div>

    <div class="spacer" />

    <Calendar
            on:selected={(event) => {
                console.log(event.detail.date)
            }}
    />

    <div class="spacer" />

    <div class="form-element">
        <label class="form-label" for="message">Message</label>
        <textarea
                bind:value={specialRequests}
                on:input={validateSpecialRequests}
                on:blur={validateSpecialRequests}
                use:expandOnTyping
                rows="1"
                cols="50"
                id="message"
                name="message"
                class="form-input"
        />
        <span class="form-notice" class:error={!specialRequestsValid}>
            ({specialRequests.length}/{specialRequestsMax})
        </span>
    </div>
</form>

<style lang="scss">
    @import "../styles/vars";

    #name, #email {
        width: 300px;
        max-width: calc(100vw - calc(2 * $spacing-normal));
    }

    #telephone {
        width: 180px;
        max-width: calc(100vw - calc(2 * $spacing-normal));
    }

    #message {
        min-width: 250px;
        max-width: calc(100vw - calc(2 * $spacing-normal));
        resize: none;
        overflow: hidden;
    }
</style>