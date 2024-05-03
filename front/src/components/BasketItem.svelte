<script lang="ts">
    import type { CartItem } from "../lib/types";
    import Cart from "../lib/cart";

    export let item: CartItem;
</script>

<div class="container">
    {#if item.data.image}
        <img src="{item.data.image}" alt="Item" class="basket-item-image">
    {:else}
        <img src="/MenuItemLoadingAlt.svg" alt="Item" class="basket-item-image">
    {/if}

    <ul>
        <li class="basket-item-name">{item.data.name}</li>
        <li class="basket-item-controls">
            <button on:click={() => { Cart.addToCart(item.uuid, -1) }}>-</button>
            <input type="number" bind:value={item.amount}>
            <button on:click={() => { Cart.addToCart(item.uuid, 1) }}>+</button>
        </li>
        <li class="basket-item-price">£{item.data.price * item.amount} (£{item.data.price})</li>
    </ul>
</div>

<style lang="scss">
    @import "../styles/vars";

    .container {
        display: flex;
        flex-direction: row;

        // Move background out of way of the image
        background-position: 135px -43px;

        overflow: hidden;

        ul {
            margin: $spacing-small;
            padding: 0;

            display: flex;
            flex-direction: column;

            li {
                padding-bottom: $spacing-small;
                list-style: none;
            }
        }
    }

    .basket-item-image {
        margin: $spacing-small;

        width: 120px;
        height: 120px;

        border-radius: $border-radius-normal;

        object-fit: cover;
    }
    .basket-item-name {
        font-size: $font-size-h2;
    }
    .basket-item-controls {
        display: flex;
        flex-direction: row;
    }
    .basket-item-price {
        font-size: $font-size-p;
    }
</style>