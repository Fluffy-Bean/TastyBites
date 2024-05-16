<script lang="ts">
    import { PaperPlaneRight, SealWarning, SealCheck, CaretDown } from "phosphor-svelte";

    import { postContactEmail } from "../lib/test-api";
    import { expandOnTyping } from "../lib/utils";
    import DropDown from "../components/DropDown.svelte";

    const minMessageLength = 150;

    let formMessage: Promise<string>;

    let name = "";
    let email = "";
    let reason = "";
    let message = "";

    let nameValid = true;
    let emailValid = true;
    let reasonValid = true;
    let messageValid = false;

    function validateName() { nameValid = name.length > 1 }
    function validateEmail() { emailValid = email.length > 1 }
    function validateReason() { reasonValid = reason != "" }
    function validateMessage() { messageValid = message.length > minMessageLength }

    function onSubmit() {
        try {
            formMessage = postContactEmail(name, email, reason, message)
        } catch (error) {
            validateName();
            validateEmail();
            validateReason();
            validateMessage();
        }
    }
</script>

<h1>Contact us</h1>

<h2>Commonly Asked Questions</h2>
<div class="container">
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

    <div class="form-element">
        <label class="form-label" for="reason">Contact Reason</label>
        <div class="select-container">
            <select
                    bind:value={reason}
                    on:blur={validateReason}
                    on:input={validateReason}
                    class="form-input"
                    id="reason"
                    name="reason"
            >
                <option value="general">General Enquiry</option>
                <option value="technical">Technical/Website</option>
                <option value="order">Order</option>
                <option value="booking">Booking</option>
            </select>
            <div class="select-arrow">
                <CaretDown />
            </div>
        </div>
        <span class="form-notice error">
            {#if !reasonValid}
                You must provide a reason for contact
            {/if}
        </span>
    </div>

    <div class="spacer half" />

    <div class="form-element">
        <label class="form-label" for="message">Message</label>
        <textarea
                bind:value={message}
                on:blur={validateMessage}
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

    <div class="spacer half" />

    {#await formMessage then formMessage}
        {#if formMessage}
            <p class="form-message success"><SealCheck weight="fill" />&nbsp;{formMessage}</p>
            <div class="spacer half" />
        {/if}
    {:catch error}
        <p class="form-message error"><SealWarning weight="fill" />&nbsp;{error.message}</p>
        <div class="spacer half" />
    {/await}

    <button type="submit">Submit&nbsp;&nbsp;<PaperPlaneRight weight="fill" /></button>
</form>

<style lang="scss">
    @import "../styles/vars";

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

    .select-container{
        width: max-content;
        position: relative;

        > select {
            width: 200px;
            appearance: none;
        }

        > .select-arrow {
            height: 100%;

            position: absolute;
            top: 0;
            right: $spacing-small;

            display: flex;
            justify-content: center;
            align-items: center;

            transition: transform 0.1s ease-in-out;
            pointer-events: none;
        }

        &:hover {
            > .select-arrow {
                transform: translateY(2px);
            }
        }
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