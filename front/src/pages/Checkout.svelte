<script lang="ts">
    import { link } from "svelte-spa-router";
    import { ArrowLeft, SealWarning, ArrowRight } from "phosphor-svelte";

    import { type Checkout } from '../lib/types';
    import Cart from "../lib/cart";

    const CheckoutData: Checkout = {
        personal: {
            name: "",
            email: "",
        },
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

    $: items = Cart.getEntries();
    $: totalPrice = Cart.getTotalPrice();

    let unavailableItems = false;
    Cart.getEntries().forEach(([_, item]) => {
        if (!item.data.availability) unavailableItems = true;
    });

    function onSubmit() {
        console.log(CheckoutData);
    }
</script>

<a href="/cart" use:link id="cancel-button"><ArrowLeft />&nbsp;Cancel</a>
<div class="spacer half" />
<div class="checkout">
    <div id="form-container">
        <h2>Checkout</h2>
        <form on:submit|preventDefault={onSubmit} id="form">
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
            <div class="spacer" />

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
            <div class="spacer half" />
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
                <h2>Cart Total: ${totalPrice}</h2>
            </div>
            <hr>
            <div class="section">
                <div class="table">
                    <table>
                        <tr><th>Price</th><th>Item Name</th><th>Amount</th></tr>
                        {#each items as [_, item]}
                            <tr class:table-row-error={!item.data.availability}>
                                <td>£{item.data.price * item.amount} (£{item.data.price})</td>
                                <td>{item.data.name}</td>
                                <td>{item.amount}</td>
                            </tr>
                        {/each}
                    </table>
                </div>
            </div>
            <hr>
            <div class="section">
                <p>To make any changes to your order, <a href="/cart" use:link>return to the cart</a>.</p>
            </div>
        </div>
        <div class="spacer half" />
        <button id="checkout-button" form="form">Checkout&nbsp;<ArrowRight /></button>
    </div>
</div>

<style lang="scss">
    @import "../styles/vars";

    #name { width: 300px; }
    #email { width: 300px; }
    #line1, #line2 { width: 400px; }
    #town { width: 250px; }
    #postcode { width: 200px; }

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

    #checkoutError {
        margin-left: auto;
        margin-right: auto;

        max-width: $sizing-default-width;
        height: 400px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        > h1 {
            display: flex;
            justify-content: center;
            align-items: center;

            font-size: $font-size-very-fucking-big;
            text-align: center;
        }
        > p {
            text-align: center;
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

        border-radius: $border-radius-circle;
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
    }
</style>
