<script lang="ts">
    import { link } from 'svelte-spa-router';
    import { ArrowRight, Basket } from "phosphor-svelte";

    import { type CartItem } from "../lib/types";
    import { getPopularToday } from "../lib/test-api";
    import Cart, { cartLoaded } from "../lib/cart";
    import MenuItemGrid from "../components/MenuItemGrid.svelte";
    import BasketItem from "../components/BasketItem.svelte";
    import DropDown from "../components/DropDown.svelte";

    let popularToday = getPopularToday();

    let items: [string, CartItem][];
    let totalPrice: number;
    let totalItems: number;

    Cart.subscribe(() => {
        items = Cart.getEntries();
        totalPrice = Cart.getTotalPrice();
        totalItems = Cart.getUniqueLength();
    });
</script>

{#await cartLoaded}
    <div id="emptyCart">
        <h1>Cart Loading&nbsp;<Basket weight="fill" /></h1>
        <p>This shouldn't take long</p>
    </div>
{:then _}
    {#if totalItems}
        <h1>Cart</h1>

        <a id="checkout-button" href="/cart/checkout" use:link>Checkout&nbsp;<ArrowRight /></a>
        <h2>Order total: £{totalPrice.toFixed(2)}</h2>

        {#each items as [_, item]}
            <div class="basket-item">
                <BasketItem item={item}/>
            </div>
        {/each}
    {:else}
        <div id="emptyCart">
            <h1>Empty Cart&nbsp;<Basket weight="fill" /></h1>
            <p>Why not go and checkout <a href="/menu" use:link>our menu</a>?</p>
        </div>
    {/if}
{/await}

<div class="spacer" />

<h2>Looking for something more?</h2>
{#await popularToday}
    <p>Loading</p>
{:then popularToday}
    <MenuItemGrid items={popularToday} />
{/await}

<div class="spacer" />

<h2>Help</h2>
<div class="container">
    <DropDown name="Booking">
        <p>Want to reserve a table instead? <a href="/booking" use:link>You can do this here</a>!</p>
    </DropDown>
    <hr>
    <DropDown name="Past Orders">
        <p>Looking past orders? Check out the <a href="/contact" use:link>commonly asked questions</a>.</p>
    </DropDown>
</div>

<style lang="scss">
    @import "../styles/vars";

    .basket-item {
        margin-bottom: $spacing-normal;
    }

    #checkout-button {
        padding: 0 $spacing-normal;

        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        text-shadow: 0 1px 0.5px rgba($color-dark, 0.3);
        text-decoration: none;
        font-size: $font-size-p;

        border: 0 solid transparent;
        border-radius: 9999px;
        background-color: $color-primary;
        color: $color-on-primary;

        float: right;

        &:hover, &:focus {
            border: 0 solid transparent;
            background-color: $color-dark;
            color: $color-on-dark;
            outline: 0 solid transparent
        }
    }

    #emptyCart {
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
</style>