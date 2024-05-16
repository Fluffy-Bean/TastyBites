<script lang="ts">
    import { link } from 'svelte-spa-router';
    import { Plus, Minus, Trash, Acorn, Fish, GrainsSlash, Leaf, Pepper, SealWarning } from "phosphor-svelte";

    import { type CartItem, Labels } from "../lib/types";
    import Cart from "../lib/cart";
    import ImageLoading from '/assets/MenuItemLoading.svg';

    export let item: CartItem;

    function reduce() {
        if (item.amount > 1) {
            Cart.addToCart(item.data.uuid, -1)
        }
    }
    function add() {
        if (item.amount < 99) {
            Cart.addToCart(item.data.uuid, 1);
        }
    }
    function yeet() {
        Cart.removeByUUID(item.data.uuid)
    }
</script>


<div class="container" >
    {#if !item.data.availability}
        <div class="basket-item-notice">
            <SealWarning weight="fill" />&nbsp;&nbsp;<span>Item is no-longer for sale</span>
        </div>
    {/if}
    <div class="basket-item">
        {#if item.data.images && item.data.images[0]}
            <img src="{item.data.images[0]}" alt="Item" class="basket-item-image">
        {:else}
            <img src={ImageLoading} alt="Item" class="basket-item-image">
        {/if}

        <ul class="basket-item-data">
            <li class="basket-item-name"><a href="/item/{item.data.uuid}" use:link>{item.data.name}</a></li>
            <li class="basket-item-controls">
                <button class="button" class:disabled={item.amount <= 1} on:click={reduce}><Minus /></button>
                <p>{item.amount}</p>
                <button class="button" class:disabled={item.amount >= 99} on:click={add}><Plus /></button>
                <hr>
                <button class="button evil" on:click={yeet}><Trash /></button>
            </li>
            <li class="basket-item-price">£{item.data.price * item.amount} (£{item.data.price})</li>
        </ul>

        <ul class="basket-item-labels">
            {#each item.data.labels as label}
                {#if label === Labels.vegan}
                    <li class="vegan"><Leaf weight="fill" /></li>
                {:else if label === Labels.fish}
                    <li class="fish"><Fish weight="fill" /></li>
                {:else if label === Labels.nut}
                    <li class="nut"><Acorn weight="fill" /></li>
                {:else if label === Labels.gluten}
                    <li class="gluten"><GrainsSlash weight="fill" /></li>
                {:else if label === Labels.spicy}
                    <li class="spicy"><Pepper weight="fill" /></li>
                {/if}
            {/each}
        </ul>
    </div>
</div>

<style lang="scss">
    @import "../styles/vars";

    .container {
        overflow: hidden;
    }

    .basket-item {
        position: relative;

        display: flex;
        flex-direction: row;

        border-radius: $border-radius-normal;

        overflow: hidden;
    }
    .basket-item-notice {
        width: 100%;
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: $font-size-p;

        background: $color-error;
        color: $color-on-error;

        box-shadow: 0 1px 0.5px rgba(#000, 0.3);
    }
    .basket-item-image {
        margin: $spacing-small;

        width: 120px;
        height: 120px;

        border-radius: $border-radius-normal;

        object-fit: cover;
    }
    .basket-item-labels {
        padding: $spacing-normal;

        display: flex;
        flex-direction: row;

        > li {
            margin: 0 0 0 -15px;

            width: 30px;
            height: 30px;

            display: flex;
            justify-content: center;
            align-items: center;

            border-radius: $border-radius-circle;
            background-color: $color-dark;
            color: $color-on-dark;

            list-style: none;

            &.vegan {
                background-color: $color-vegan;
            }
            &.fish {
                background-color: $color-fish;
            }
            &.nut {
                background-color: $color-nut;
            }
            &.gluten {
                background-color: $color-gluten;
            }
            &.spicy {
                background-color: $color-spicy;
            }
        }
    }
    .basket-item-data {
        margin: 0;
        padding: $spacing-small;

        display: flex;
        flex-direction: column;
        flex-grow: 1;

        > li {
            padding-bottom: $spacing-small;
            list-style: none;
        }
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
            &:focus-visible {
                border: 1px solid rgba($color-primary, 0.9);
                outline: 0 solid transparent;
            }

            &.evil {
                border: 1px solid $color-error;
                color: $color-error;

                &:hover,
                &:focus-visible {
                    background-color: rgba($color-error, 0.1);
                }
            }

            &.disabled {
                border: 1px solid rgba($color-dark, 0.1);
                color: rgba($color-on-light, 0.6);

                &:hover,
                &:focus-visible {
                    border: 1px solid rgba($color-dark, 0.1);
                    background-color: $color-light;
                    color: rgba($color-on-light, 0.6);
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