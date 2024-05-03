<script lang="ts">
    import { link } from 'svelte-spa-router';
    import { Plus, Minus, Trash } from 'phosphor-svelte';

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
        <li class="basket-item-name"><a href="/item/{item.uuid}" use:link>{item.data.name}</a></li>
        <li class="basket-item-controls">
            <button class="button " on:click={() => { Cart.addToCart(item.uuid, -1) }}><Minus /></button>
            <p>{item.amount}</p>
            <button class="button " on:click={() => { Cart.addToCart(item.uuid, 1) }}><Plus /></button>
            <hr>
            <button class="button evil" on:click={() => { Cart.removeByUUID(item.uuid) }}><Trash /></button>
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
    .basket-item-name a {
        font-size: $font-size-h2;
        text-decoration: underline;

        color: $color-on-light;

        &:hover {
            text-decoration: none;
        }
    }
    .basket-item-controls {
        display: flex;
        flex-direction: row;

        > .button {
            width: 35px;
            height: 35px;

            display: flex;
            justify-content: center;
            align-items: center;

            font-family: $font-family;
            font-size: $font-size-p;

            border: 1px solid rgba($color-dark, 0.2);
            border-radius: $border-radius-normal;
            background-color: $color-light;
            color: $color-on-light;

            &:hover {
                border: 1px solid rgba($color-dark, 0.4);
            }
            &:focus {
                border: 1px solid rgba($color-primary, 0.9);
                outline: 0 solid transparent;
            }

            &.evil {
                border: 1px solid $color-error;
                color: $color-error;

                &:hover,
                &:focus {
                    background-color: rgba($color-error, 0.1);
                }
            }
        }

        > p {
            width: 40px;
            height: 35px;

            display: flex;
            justify-content: center;
            align-items: center;

            font-family: $font-family;
            font-size: $font-size-p;

            border: 1px solid transparent;
            color: $color-on-light;
        }

        > hr {
            margin: 0 $spacing-small;

            width: 1px;
            height: 100%;

            border: 0 solid transparent;
            background-color: rgba($color-dark, 0.1);
        }
    }
    .basket-item-price {
        font-size: $font-size-p;
    }
</style>