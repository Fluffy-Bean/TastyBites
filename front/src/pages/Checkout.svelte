<script lang="ts">
    import { onMount } from "svelte";
    import { link } from "svelte-spa-router";
    import { ArrowLeft, SealWarning, ArrowRight } from "phosphor-svelte";
    import L, { type Map } from "leaflet";

    import { type CartItem, type Checkout } from '../lib/types';
    import { expandOnTyping } from "../lib/utils";
    import Cart from "../lib/cart";

    const CheckoutData: Checkout = {
        personal: {
            name: "",
            email: "",
        },
        delivery: true,
        message: "",
        address: {
            line1: "",
            line2: "",
            town: "",
            postcode: "",
        },
    }

    $: nameValid = CheckoutData.personal.name.length > 1
    $: emailValid = CheckoutData.personal.email.length > 1
    $: phoneValid = isNaN(CheckoutData.personal.phone)
    $: messageValid = messageValid = CheckoutData.message.length <= 200;

    let items: [string, CartItem][];
    let totalPrice: number;
    let unavailableItems: boolean;
    Cart.subscribe(() => {
        items = Cart.getEntries();
        if (CheckoutData.delivery) {
            totalPrice = 3.00 + 1.50 + Cart.getTotalPrice();
        } else {
            totalPrice = 1.50 + Cart.getTotalPrice();
        }
        unavailableItems = Cart.getEntries().some(([_, item]) => !item.data.availability);
    });

    let leafletMap: Map;
    onMount(() => {
        leafletMap = L.map("map").setView([50.82304922105467, -0.432780150496344], 13);
        L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                maxZoom: 20,
                attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
            },
        ).addTo(leafletMap);
        L.marker([50.82304922105467, -0.432780150496344]).addTo(leafletMap);
    });

    $: if (CheckoutData.delivery) {
        totalPrice = 1.50 + 3.00 + Cart.getTotalPrice();
    }
    $: if (!CheckoutData.delivery) {
        // Rendering maybe off-centered since map was initialized when div was hidden
        setTimeout(() => {
            leafletMap.invalidateSize();
            leafletMap.panTo([50.82304922105467, -0.432780150496344]);
        }, 305);
        totalPrice = 1.50 + Cart.getTotalPrice();
    }

    function onSubmit() {
        console.log(CheckoutData);
    }
</script>

<a href="/cart" use:link id="cancel-button"><ArrowLeft />&nbsp;Cancel</a>
<div class="spacer half" />
<div class="checkout">
    <div id="form-container">
        <h1>Checkout</h1>
        <form on:submit|preventDefault={onSubmit} id="form">
            <h2>Contact Information</h2>
            <p>This is for updates on your order</p>
            <div class="spacer half" />
            <div class="form-element">
                <label class="form-label" for="name">Name</label>
                <input
                        bind:value={CheckoutData.personal.name}
                        type="text"
                        id="name"
                        class="form-input"
                />
                <span class="form-notice error">
                    {#if !nameValid}Enter a name{/if}
                </span>
            </div>
            <div class="spacer half" />
            <div class="form-element">
                <label class="form-label" for="email">Email</label>
                <input
                        bind:value={CheckoutData.personal.email}
                        type="text"
                        id="email"
                        class="form-input"
                />
                <span class="form-notice error">
                    {#if !emailValid}Email not valid{/if}
                </span>
            </div>
            <div class="spacer half" />
            <div class="form-element">
                <label class="form-label" for="phone">Phone Number</label>
                <input
                        bind:value={CheckoutData.personal.phone}
                        type="number"
                        id="phone"
                        class="form-input"
                />
                <span class="form-notice error">
                    {#if !phoneValid}Phone Number not valid{/if}
                </span>
            </div>

            <div class="spacer" />
            <hr>
            <div class="spacer" />

            <h2>Special Requests</h2>
            <p>Have a noisy dog, and don't want us to knock? Let us know here!</p>
            <div class="spacer half" />
            <div class="form-element">
                <label class="form-label" for="message">Message</label>
                <textarea
                        bind:value={CheckoutData.message}
                        use:expandOnTyping
                        rows="1"
                        id="message"
                        name="message"
                        class="form-input"
                />
                <span class="form-notice" class:error={!messageValid}>
                    ({CheckoutData.message.length}/{200})
                </span>
            </div>

            <div class="spacer" />
            <hr>
            <div class="spacer" />

            <h2>Delivery or Pick Up</h2>
            <p>Where would you want your food to be delivered?</p>

            <div class="spacer half" />

            <ul id="delivery-option">
                <li class:checked={CheckoutData.delivery}>
                    <button on:click={() => { CheckoutData.delivery = true }} type="button">
                        Delivery
                    </button>
                </li>
                <li class:checked={!CheckoutData.delivery}>
                    <button on:click={() => { CheckoutData.delivery = false }} type="button">
                        Pick Up
                    </button>
                </li>
            </ul>

            <div class="spacer half" />

            {#if CheckoutData.delivery}
                <div class="form-element">
                    <label class="form-label" for="line1">Address Line 1</label>
                    <input
                            bind:value={CheckoutData.address.line1}
                            type="text"
                            id="line1"
                            class="form-input"
                    />
                    <span class="form-notice error">Line 1 required</span>
                </div>
                <div class="spacer half" />
                <div class="form-element">
                    <label class="form-label" for="line2">Address Line 2</label>
                    <input
                            bind:value={CheckoutData.address.line2}
                            type="text"
                            id="line2"
                            class="form-input"
                    />
                    <span class="form-notice error"></span>
                </div>
                <div class="spacer half" />
                <div class="form-element">
                    <label class="form-label" for="town">Town</label>
                    <input
                            bind:value={CheckoutData.address.town}
                            type="text"
                            id="town"
                            class="form-input"
                    />
                    <span class="form-notice error">Town name required</span>
                </div>
                <div class="spacer half" />
                <div class="form-element">
                    <label class="form-label" for="postcode">Postcode</label>
                    <input
                            bind:value={CheckoutData.address.postcode}
                            type="text"
                            id="postcode"
                            class="form-input"
                    />
                    <span class="form-notice error">Postcode required</span>
                </div>
            {:else}
                <p>You'll receive an email and text reminding you of your order, once it's ready to be picked up!</p>
                <div class="spacer half" />
            {/if}
            <!-- As leaflet needs the map element to exist while its loading, we must render it always -->
            <div id="map" class:show-map={!CheckoutData.delivery}></div>

            <div class="spacer" />
            <hr>
            <div class="spacer" />

            <h2>Payment</h2>
            <p>Currently, we only do payment in person, as our online payment system isn't setup yet.</p>
        </form>
    </div>
    <div class="spacer" />
    <div id="cart">
        <div class="container">
            {#if unavailableItems}
                <div class="unavailable-items-banner">
                    <SealWarning weight="fill" />&nbsp;&nbsp;<span>Order contains unavailable items</span>
                </div>
            {/if}
            <div class="header">
                <h2>Total: £{totalPrice.toFixed(2)}</h2>
            </div>
            <div class="table">
                <table>
                    <tr><th>Price (each)</th><th>Item Name</th><th>#</th></tr>
                    {#each items as [_, item]}
                        <tr class:table-row-error={!item.data.availability}>
                            <td>£{(item.data.price * item.amount).toFixed(2)} (£{item.data.price.toFixed(2)})</td>
                            <td>{item.data.name}</td>
                            <td>{item.amount}</td>
                        </tr>
                    {/each}
                    <tr class="table-row-border">
                        <td>£{1.50.toFixed(2)}</td>
                        <td colspan="2">Online order Fee</td>
                    </tr>
                    {#if CheckoutData.delivery}
                        <tr>
                            <td>£{3.00.toFixed(2)}</td>
                            <td colspan="2">Delivery fee</td>
                        </tr>
                    {/if}
                </table>
            </div>
            <div class="section">
                <p>To make any changes, <a href="/cart" use:link>return to the cart</a>.</p>
            </div>
        </div>
        <div class="spacer half" />
        <div class="container">
            <div class="section">
                <p>By pressing "Checkout" you agree to our terms of service</p>
                <div class="spacer half" />
                <button id="checkout-button" form="form">Checkout&nbsp;<ArrowRight /></button>
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    @import "../styles/vars";

    #name { width: 300px; }
    #email { width: 300px; }
    #line1, #line2 { width: 400px; }
    #town { width: 250px; }
    #postcode { width: 200px; }
    #message {
        width: 400px;
        max-width: calc(100vw - calc(2 * $spacing-normal));
        resize: none;
        overflow: hidden;
    }

    #cancel-button {
        padding: 0 $spacing-small;

        width: max-content;
        height: 30px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        font-size: $font-size-p;
        text-decoration: none;

        border-radius: $border-radius-circle;
        background-color: transparent;
        color: $color-on-background;

        &:hover {
            background-color: $color-error;
            color: $color-on-error;
        }
    }

    #delivery-option {
        padding: 0;

        width: max-content;

        display: flex;
        flex-direction: row;

        > li {
            list-style: none;

            border-radius: 0;
            border: 1px solid rgba($color-dark, 0.1);
            background-color: $color-light;
            color: $color-on-light;

            overflow: hidden;

            button {
                padding: 0 $spacing-large;

                width: 100%;
                height: 35px;

                display: flex;
                flex-direction: row;
                justify-content: flex-end;
                align-items: center;

                font-size: $font-size-p;
                text-decoration: none;

                border: 0 solid transparent;
                background-color: transparent;
                color: inherit;
            }

            &.checked {
                background-color: $color-dark;
                color: $color-on-dark;
            }

            &:first-of-type {
                border-top-left-radius: $border-radius-normal;
                border-bottom-left-radius: $border-radius-normal;
            }
            &:last-of-type {
                border-top-right-radius: $border-radius-normal;
                border-bottom-right-radius: $border-radius-normal;
            }
            &:hover {
                background-color: $color-primary;
                color: $color-on-primary;
            }
        }
    }

    #map {
        width: 100%;
        max-width: 550px;
        //height: 400px;
        height: 0;

        display: none;

        border-radius: $border-radius-normal;
        box-shadow: 0 1px 0.5px rgba(#000, 0.3);

        &.show-map {
            display: block;
            animation: growMap forwards 0.3s;
        }
    }

    @keyframes growMap {
        0% {
            height: 0;
        }
        100% {
            height: 400px;
        }
    }

    #checkout-button {
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

    .unavailable-items-banner {
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: $font-size-p;

        background: $color-error;
        color: $color-on-error;

        box-shadow: 0 1px 0.5px rgba(#000, 0.2);
    }

    .table {
        margin: 0 $spacing-normal;
        border-radius: $border-radius-normal;
        border: 1px solid rgba($color-dark, 0.2);
        background-color: $color-light;

        overflow: hidden;

        table {
            width: 100%;
            border-collapse: collapse;

            tr {
                border-bottom: 1px solid rgba($color-dark, 0.2);

                &:last-of-type {
                    border: 0 solid transparent;
                }

                &.table-row-error {
                    background-color: $color-error;
                    color: $color-on-error;
                }

                &.table-row-border {
                    border-top: 2px solid rgba($color-dark, 0.2);
                }

                th, td {
                    padding: $spacing-xsmall $spacing-small;
                    font-size: $font-size-small;
                    border-right: 1px solid rgba($color-dark, 0.2);

                    &:last-of-type {
                        border: 0 solid transparent;
                    }
                }

                th {
                    font-weight: $font-weight-bolder;
                }
                td {
                    font-weight: $font-weight-normal;
                }
            }
        }
    }

    .checkout {
        display: flex;
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
    }

    .container {
        overflow: hidden;
    }

    #form-container {
        width: 100%;
        position: relative;
    }

    #cart {
        min-width: calc(400px - $spacing-normal);
        width: 100%;
        max-width: calc(400px - $spacing-normal);

        position: sticky;
        top: calc($sizing-navigation-height + $spacing-normal);
    }

    @media only screen and (max-width: 900px) {
        .checkout {
            flex-direction: column;
        }

        #cart {
            max-width: unset;
            position: unset;
        }

        #map {
            max-width: 100%;
        }
    }
</style>
