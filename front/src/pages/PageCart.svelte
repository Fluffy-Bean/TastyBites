<script lang="ts">
    import { link } from 'svelte-spa-router';

    import { getPopularToday } from "../lib/test-api";
    import Cart from "../lib/cart";
    import MenuList from "../components/MenuList.svelte";
    import BasketItem from "../components/BasketItem.svelte";

    let popularToday = getPopularToday();

    $: items = $Cart;
    $: totalPrice = $Cart.map((item) => item.amount * item.data.price).reduce((a, b) => a + b, 0);
</script>


{#if items.length > 0}
    <h1>Cart</h1>

    <button id="checkout-button">Checkout</button>
    <h2>Order total: £{totalPrice}</h2>

    {#each items as item}
        <div class="basket-item">
            <BasketItem item={item}/>
        </div>
    {/each}
{:else}
    <div id="emptyCart">
        <h1>Empty Cart!</h1>
        <p>Go add some items from the menu...</p>
    </div>
{/if}

<div class="spacer" />

<h2>Looking for something more?</h2>
{#await popularToday}
    <p>Loading</p>
{:then popularToday}
    <MenuList items={popularToday} />
{/await}

<div class="spacer" />

<p>Looking past orders? Check out the <a href="/contact" use:link>commonly asked questions</a></p>

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

        text-shadow: 0 1px 0.5px rgba($color-dark, 0.3);;

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
        padding: $spacing-large;

        max-width: $sizing-default-width;

        display: flex;
        flex-direction: column;

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