<script lang="ts">
    import { link, push, querystring } from 'svelte-spa-router';
    import { SealWarning, CaretDown, ArrowRight, ArrowLeft } from "phosphor-svelte";

    import { expandOnTyping } from "../lib/utils";
    import Calendar from "../components/Calendar.svelte";

    let progress = 1;
    querystring.subscribe((params) => {
        const url = new URLSearchParams(params);

        progress = 1;
        if (
            url.has("progress") &&
            !isNaN(parseInt(url.get("progress")))
        ) {
            progress = parseInt(url.get("progress"));
        }

        if ([1, 2, 3].indexOf(progress) == -1) {
            progress = 1;
            push("/booking?progress=1");
        }
    })

    const specialRequestsMax = 300;
    const today = new Date();

    let name = "";
    let email = "";
    let telephone = "";
    let date: Date;
    let timeSlot = "slot1";
    let specialRequests = "";

    let nameValid = true;
    let emailValid = true;
    let telephoneValid = true;
    let dateValid = true;
    let specialRequestsValid = true;

    function validateName() { nameValid = name.length > 1}
    function validateEmail() { emailValid = email.length > 1}
    function validateTelephone() { telephoneValid = telephone.length == 11}
    function validateDate() { dateValid = date > today;}
    function validateSpecialRequests() { specialRequestsValid = specialRequests.length < 301 }

    function onSubmit(event) {}
</script>

<h1>Table booking</h1>

<div id="booking-progress">
    <a href="/booking?progress={progress - 1}" use:link><ArrowLeft /></a>
    <div
            class="progress"
            class:progress-1={progress === 1}
            class:progress-2={progress === 2}
            class:progress-3={progress === 3}
    />
    <a href="/booking?progress={progress + 1}" use:link><ArrowRight /></a>
</div>

<div class="spacer" />

{#if progress === 1}
    <div class="form-element">
        <p class="form-label">Booking Date</p>
        <Calendar
                bind:selectedDate={date}
                on:selected={validateDate}
                notBefore={today}
        />
        <span class="form-notice error">
            {#if !dateValid}
                Must chose date that's tomorrow or later
            {/if}
        </span>
    </div>

    <div class="spacer half" />

    <!-- ToDo: Don't give a fake error for the weekend slots, just for testing  || !dateValid -->
    {#if date && (date.getDay() === 6 || date.getDay() === 0)}
        <p class="form-message error"><SealWarning weight="fill" />&nbsp;Time slots not available for this date</p>
    {:else}
        <div class="form-element">
            <label class="form-label" for="time-slot">Time Slot</label>
            <div class="select-container">
                <select
                        bind:value={timeSlot}
                        class="form-input"
                        id="time-slot"
                        name="time-slot"
                >
                    <option value="slot0">8am to 10am</option>
                    <option value="slot1">10am to 12am</option>
                    <option value="slot2" disabled>12am to 2pm</option>
                    <option value="slot3">2pm to 4pm</option>
                    <option value="slot4">4pm to 6pm</option>
                    <option value="slot5">6pm to 8pm</option>
                    <option value="slot6">8pm to 10pm</option>
                </select>
                <div class="select-arrow">
                    <CaretDown />
                </div>
            </div>
        </div>
    {/if}
{:else if progress === 2}
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
{:else if progress === 3}
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
        <label class="form-label" for="telephone">Telephone</label>
        <input
                bind:value={telephone}
                on:blur={validateTelephone}
                on:input={validateTelephone}
                type="text"
                id="telephone"
                name="telephone"
                class="form-input"
        />
        <span class="form-notice error">
            {#if !telephoneValid}
                Telephone number not valid
            {/if}
        </span>
    </div>
{/if}

<style lang="scss">
    @import "../styles/vars";

    #booking-progress {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        > a {
            padding: 0 $spacing-small;

            width: 35px;
            height: 35px;

            display: flex;
            justify-content: center;
            align-items: center;

            font-size: $font-size-p;

            border: 0 solid transparent;
            border-radius: $border-radius-circle;
            background-color: $color-light;
            color: $color-on-light;

            &:hover {
                background-color: $color-dark;
                color: $color-on-dark;
            }
            &:focus-visible {
                background-color: $color-dark;
                color: $color-on-dark;
                outline: 0 solid transparent;
            }
        }

        .progress {
            margin: 0 $spacing-normal;

            width: 100%;
            max-width: 500px;
            height: 5px;

            position: relative;

            border-radius: $border-radius-circle;
            background-color: $color-light;

            overflow: hidden;

            &::after {
                content: '';

                position: absolute;
                top: 0;
                left: 0;

                width: 0;
                height: 100%;

                background-color: $color-dark;

                transition: width 0.5s cubic-bezier(.19,1,.22,1);
            }

            &.progress-1::after {
                width: 33%;
            }
            &.progress-2::after {
                width: 66%;
            }
            &.progress-3::after {
                width: 100%;
            }
        }
    }

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

    .select-container{
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
</style>