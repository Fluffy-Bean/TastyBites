<script lang="ts">
    import { link } from "svelte-spa-router";
    import { ArrowLeft, ArrowRight, Basket, SealWarning } from "phosphor-svelte";

    import Cart from "../lib/cart";
    import PaymentForm from "./Checkout/PaymentForm.svelte";
    import LeFinal from "./Checkout/LeFinal.svelte";

    export let params: {
        progress?: string;
    };

    let unavailableItems = false;
    Cart.getEntries().forEach(([_, item]) => {
        if (!item.data.availability) unavailableItems = true;
    });

</script>

{#if unavailableItems}
    <div class="notice error">
        <SealWarning weight="fill" />&nbsp;&nbsp;<span>Order contains an item that is no-longer available</span>
    </div>
{/if}

<div id="checkoutHeader">
    <a href="/cart" use:link id="cancel-button"><ArrowLeft />&nbsp;Cancel</a>
</div>

{#if params.progress === "1"}
    <PaymentForm />
    <div id="checkoutFooter">
        <div />
        <a href="/cart/checkout/2" use:link id="navigation-button">Order&nbsp;<ArrowRight /></a>
    </div>
{:else if params.progress === "2"}
    <LeFinal />
    <div id="checkoutFooter">
        <a href="/cart/checkout/1" use:link id="navigation-button"><ArrowLeft />&nbsp;Payment</a>
        <a href="/cart/checkout/3" use:link id="navigation-button">Confirm Purchase&nbsp;<ArrowRight /></a>
    </div>
{:else}
    <div id="checkoutLost">
        <h1>Something went wrong!&nbsp;<Basket weight="fill" /></h1>
        <p>Return <a href="/cart/checkout/1" use:link>to checkout</a>.</p>
    </div>
{/if}

<style lang="scss">
    @import "../styles/vars";

    #checkoutHeader {
        padding-bottom: $spacing-normal;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        > p {
            padding: 0 $spacing-small;

            width: max-content;
            height: 30px;

            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;

            font-size: $font-size-p;
        }
    }

    #checkoutFooter {
        padding-top: $spacing-normal;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
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

        border-radius: 9999px;
        background-color: transparent;
        color: $color-on-background;

        &:hover {
            background-color: $color-error;
            color: $color-on-error;
        }
    }
    #navigation-button {
        padding: 0 $spacing-small;

        width: max-content;
        height: 30px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        font-size: $font-size-p;
        text-decoration: none;

        border-radius: 9999px;
        background-color: $color-light;
        color: $color-on-light;

        &:hover {
            background-color: $color-dark;
            color: $color-on-dark;
        }
    }

    #checkoutLost {
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

    .notice {
        margin-right: auto;
        margin-bottom: $spacing-large;
        margin-left: auto;

        max-width: $sizing-default-width;
        height: 40px;

        position: sticky;
        top: calc($spacing-small + $sizing-navigation-height);

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: $font-size-p;

        border-radius: $border-radius-large;
        background: $color-dark;
        color: $color-on-dark;

        box-shadow: 0 1px 0.5px rgba(#000, 0.3);

        &.error {
            background: $color-error;
            color: $color-on-error;
        }
    }
</style>