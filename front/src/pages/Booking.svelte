<script lang="ts">
    import {SealWarning, CaretDown, ArrowRight} from "phosphor-svelte";

    import { expandOnTyping } from "../lib/utils";
    import Calendar from "../components/Calendar.svelte";

    const timeSlots = {
        slot0: "8am to 10am",
        slot1: "10am to 12am",
        slot2: "12am to 2pm",
        slot3: "2pm to 4pm",
        slot4: "4pm to 6pm",
        slot5: "6pm to 8pm",
        slot6: "8pm to 10pm",
    }
    const tables = {
        table1: "Table 1",
        table2: "Table 2",
        table3: "Table 3",
    }
    const specialRequestsMax = 300;
    const today = new Date();

    let name = "";
    let email = "";
    let telephone = "";
    let date: Date;
    let timeSlot = "slot1";
    let tableSlot = "table1";
    let specialRequests = "";

    let nameValid = true;
    let emailValid = true;
    let telephoneValid = true;
    let dateValid = true;
    let specialRequestsValid = true;

    function formatDate(date: Date) {
        let formattedDate = new Intl.DateTimeFormat(
                'en-UK',
                {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                }
            ).format(date);

        // Add the ordinal suffix
        let day = date.getDate();
        let suffix = 'th';
        if (day % 10 === 1 && day !== 11) {
            suffix = 'st';
        } else if (day % 10 === 2 && day !== 12) {
            suffix = 'nd';
        } else if (day % 10 === 3 && day !== 13) {
            suffix = 'rd';
        }
        return formattedDate.replace(`${day}`, day + suffix);
    }

    function validateName() { nameValid = name.length > 1}
    function validateEmail() { emailValid = email.length > 1}
    function validateTelephone() { telephoneValid = telephone.length == 11}
    function validateDate() { dateValid = date > today;}
    function validateSpecialRequests() { specialRequestsValid = specialRequests.length <= 300 }

    function onSubmit(event) {}
</script>

<h1>Table booking</h1>

<div id="booking">
    <div id="form">
        <h2>Date and Time</h2>
        <p>When do you wanna come see us?</p>
        <div class="spacer half" />
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

        <div class="spacer" />
        <hr>
        <div class="spacer" />

        <h2>Seating</h2>
        <p>Where would you like to be seating?</p>
        <div class="spacer half" />
        <div class="seating-image">
            <img src="/assets/SeatingTemporary.png" alt="Birds-eye view of the available seating at the restaurant" />
        </div>
        <div class="spacer half" />
        <div class="form-element">
            <label class="form-label" for="table-slot">Seat Choice</label>
            <div class="select-container">
                <select
                        bind:value={tableSlot}
                        class="form-input"
                        id="table-slot"
                        name="table-slot"
                >
                    <option value="table1">Table 1</option>
                    <option value="table2">Table 2</option>
                    <option value="table3">Table 3</option>
                </select>
                <div class="select-arrow">
                    <CaretDown />
                </div>
            </div>
        </div>

        <div class="spacer" />
        <hr>
        <div class="spacer" />

        <h2>Special requests</h2>
        <p>Wanna make sure we're accessible to your disabilities? Let us know where what todo!</p>
        <div class="spacer half" />
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

        <div class="spacer" />
        <hr>
        <div class="spacer" />

        <h2>Who are you</h2>
        <p>Just so we can keep you updated on your reservation</p>
        <div class="spacer half" />
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
    </div>
    <div class="spacer" />
    <div id="booking-confirmation">
        <div class="container">
            <div class="header">
                <h2>Booking Confirmation</h2>
            </div>
            <hr>
            <div class="section">
                <p>
                    On
                     <span class="h">{date ? `the ${formatDate(date)}` : "an undecided date"}</span>
                    at
                     <span class="h">{timeSlot ? timeSlots[timeSlot] : "an undecided time"}</span>,
                    I want to be seated at
                     <span class="h">{tableSlot ? tables[tableSlot] : "a table"}</span>.
                <br><br>
                    I request
                     <span class="h">{specialRequests ? specialRequests : "nothing in particular"}</span>.
                <br><br>
                    My name is
                     <span class="h">{name ? name : "Unknown"}</span>,
                    in the event I need to be contacted by email, you can do that at
                     <span class="h">{email ? email : "an empty email"}</span>,
                    or alternatively call me on
                     <span class="h">{telephone ? telephone : "an empty phone number"}</span>.
                </p>
            </div>
        </div>
        <div class="spacer half" />
        <div class="container">
            <div class="section">
                <p>By pressing "Book Table" you agree to our terms of service</p>
                <div class="spacer half" />
                <button id="book-button" form="form">Book&nbsp;Table&nbsp;<ArrowRight /></button>
            </div>
        </div>
    </div>
</div>

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

    .container {
        overflow: hidden;
    }

    .seating-image {
        max-width: 550px;
        border-radius: $border-radius-large;
        overflow: hidden;

        > img {
            width: 100%;
            height: auto;
            display: block;
        }
    }

    .h {
        padding: 0 $spacing-xsmall;
        border-radius: $border-radius-normal;
        background-color: $color-dark;
        color: $color-on-dark;
    }

    #book-button {
        padding: 0 $spacing-normal;

        width: 100%;
        height: 35px;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        font-size: $font-size-p;
        text-decoration: none;

        border-radius: $border-radius-large;
        border: 0 solid transparent;
        background-color: $color-primary;
        color: $color-on-primary;

        &:hover {
            background-color: $color-dark;
            color: $color-on-dark;
        }
    }

    #booking {
        display: flex;
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
    }

    #form {
        width: 100%;
        position: relative;
    }

    #booking-confirmation {
        min-width: calc(400px - $spacing-normal);
        width: 100%;
        max-width: calc(400px - $spacing-normal);

        position: sticky;
        top: calc($sizing-navigation-height + $spacing-normal);
    }

    @media only screen and (max-width: 900px) {
        #booking {
            flex-direction: column;
        }

        #booking-confirmation {
            max-width: unset;
            position: unset;
        }
    }
</style>