<script>
    import { PaperPlaneRight } from "phosphor-svelte";

    import DropDown from "%/components/DropDown.svelte";
    import { expandOnTyping } from "%/lib/utils.js";

    const minMessageLength = 150;

    let name = "";
    let email = "";
    let message = "";

    let nameValid = true;
    let emailValid = true;
    let messageValid = false;

    function validateName() {
        nameValid = name.length > 1
    }
    function validateEmail() {
        emailValid = email.length > 1
    }
    function validateMessage() {
        messageValid = message.length > minMessageLength
    }

    function onSubmit(event) {
        console.log(name, email, message);
    }
</script>

<h1>Contact us</h1>

<div class="container">
<!--    <div class="header">-->
<!--        <h2>Commonly Asked Questions</h2>-->
<!--    </div>-->
    <hr>
    <DropDown name="Can I refund my order?">
        <p>If you ordered online, if we haven't started making your food yet, a refund is possible.</p>
        <p>If you reserved a table, you can refund upto 1 hour before your time.</p>
    </DropDown>
    <hr>
    <DropDown name="Where can I find my past orders!">
        <p>Email....</p>
    </DropDown>
    <hr>
    <DropDown name="Deez nuts">
        <p>Gottem</p>
    </DropDown>
</div>

<div class="spacer" />

<h2>Contact From</h2>
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
        {#if !nameValid}
            <span class="form-notice error">Enter a name</span>
        {/if}
    </div>

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

    <div class="form-element">
        <label class="form-label" for="message">Message</label>
        <textarea
            bind:value={message}
            on:input={validateMessage}
            use:expandOnTyping
            rows="1"
            cols="50"
            id="message"
            name="message"
            class="form-input"
        />
        <span class="form-notice" class:error={!messageValid}>
            ({message.length}/{minMessageLength})
        </span>
    </div>

    <button type="submit">Submit&nbsp;&nbsp;<PaperPlaneRight /></button>
</form>

<style lang="scss">
    @import "%/styles/vars";

    #name, #email {
        width: 300px;
        max-width: calc(100vw - calc(2 * $spacing-normal));

    }

    #message {
        min-width: 250px;
        max-width: calc(100vw - calc(2 * $spacing-normal));
        resize: none;
        overflow: hidden;
    }

    button {
        padding: 0 $spacing-normal;

        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        text-shadow: 0 1px 0.5px rgba($color-dark, 0.3);;

        border: 0 solid transparent;
        border-radius: 9999px;
        background-color: $color-dark;
        color: $color-on-dark;

        &:hover, &:focus {
            border: 0 solid transparent;
            background-color: $color-primary;
            color: $color-on-primary;
            outline: 0 solid transparent
        }
    }
</style>