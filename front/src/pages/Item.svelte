<script lang="ts">
    import { link } from 'svelte-spa-router';
    import { Acorn, Fish, GrainsSlash, Leaf, Minus, Pepper, Plus, SmileySad, ShoppingCart, SealWarning, ArrowLeft } from "phosphor-svelte";
    import SvelteMarkdown from 'svelte-markdown'

    import { Labels } from "../lib/types";
    import { getPopularToday, getItemByUUID } from "../lib/test-api";
    import Cart, { cartLoaded } from "../lib/cart";
    import MenuItemGrid from "../components/MenuItemGrid.svelte";
    import LoadingBar from "../components/LoadingBar.svelte";
    import LoadingImage from "/assets/MenuItemLoading.svg";

    export let params: {
        uuid?: string;
    };

    let basketAmount = 1;
    let selectedImage = 0;

    $: item = getItemByUUID(params.uuid);
    $: item.finally(() => { selectedImage = 0 });
    $: popularToday = getPopularToday();

    function reduce() {
        if (basketAmount > 1) {
            basketAmount -= 1;
        }
    }

    function increase() {
        if (basketAmount < 99) {
            basketAmount += 1;
        }
    }

    function add() {
        Cart.addToCart(params.uuid, basketAmount);
    }
</script>

{#await item then item}
    {#if !item.availability}
        <div class="notice error">
            <SealWarning weight="fill" />&nbsp;&nbsp;<span>Item is no-longer for sale</span>
        </div>
    {/if}
{/await}

<a href="/menu" use:link id="back-button"><ArrowLeft />&nbsp;Back</a>

<div class="spacer half" />

<div class="main">
    {#await item}
        <div id="images">
            <div class="img-main">
                <div class="loading image" />
            </div>
            <ul class="img-alts">
                <li><div class="loading image-small" /></li>
                <li><div class="loading image-small" /></li>
                <li><div class="loading image-small" /></li>
                <li><div class="loading image-small" /></li>
                <li><div class="loading image-small" /></li>
            </ul>
        </div>

        <div class="spacer half" />

        <div id="info">
            <div class="loading title" />
            <div class="loading price" />
            <div class="loading description" />
        </div>
    {:then item}
        <div id="images">
            <div class="img-main loaded">
                {#if item.images && item.images[selectedImage]}
                    <img src="{item.images[selectedImage]}" alt="Item">
                {:else}
                    <img src={LoadingImage} alt="Item">
                {/if}
            </div>
            <ul class="img-alts">
                {#if item.images && item.images.length > 1}
                    {#each item.images as image, i}
                        <li class:selected={selectedImage === i}>
                            <button on:click={() => { selectedImage = i }}>
                                <img src={image} alt="">
                            </button>
                        </li>
                    {/each}
                {/if}
            </ul>
        </div>

        <div class="spacer half" />

        <div id="info">
            <h2>{item.name}</h2>
            <p>£{item.price}</p>

            <div class="spacer" />

            <div class="container">
                <div id="description">
                    {#if item.description}
                        <SvelteMarkdown source={item.description} />
                    {:else}
                        <p>Item is missing information</p>
                    {/if}
                </div>
                <hr>
                <div id="small-text">
                    <p>If you require any specific informtaion on a meal, <a href="/contact" use:link>please contact us</a>.</p>
                </div>
            </div>

            <div class="spacer half" />

            <ul id="allergy-labels">
                {#each item.labels as label}
                    {#if label === Labels.vegan}
                        <li class="vegan"><Leaf weight="fill" />&nbsp;&nbsp;Vegan</li>
                    {:else if label === Labels.fish}
                        <li class="fish"><Fish weight="fill" />&nbsp;&nbsp;Sea</li>
                    {:else if label === Labels.nut}
                        <li class="nut"><Acorn weight="fill" />&nbsp;&nbsp;Nut</li>
                    {:else if label === Labels.gluten}
                        <li class="gluten"><GrainsSlash weight="fill" />&nbsp;&nbsp;Gluten Free</li>
                    {:else if label === Labels.spicy}
                        <li class="spicy"><Pepper weight="fill" />&nbsp;&nbsp;Spicy</li>
                    {/if}
                {/each}
            </ul>

            <div class="spacer" />

            <div id="basket-controls">
                <button class="button" class:disabled={basketAmount <= 1} on:click={reduce}><Minus /></button>
                <p>{basketAmount}</p>
                <button class="button" class:disabled={basketAmount >= 99} on:click={increase}><Plus /></button>
                <div class="spacer half" />
                {#await cartLoaded}
                    <button class="button add disabled" id="add-to-cart">Add&nbsp;to&nbsp;Cart&nbsp;&nbsp;<ShoppingCart weight="fill" /></button>
                {:then _}
                    <button class="button add" on:click={add} id="add-to-cart">Add&nbsp;to&nbsp;Cart&nbsp;&nbsp;<ShoppingCart weight="fill" /></button>
                {/await}
            </div>
        </div>
    {:catch error}
        <div id="error">
            <h1>Server fucking died...&nbsp;<SmileySad weight="fill" /></h1>
            <p>Error: {error.message}</p>
        </div>
    {/await}
</div>

<div class="spacer"></div>

<div class="other">
    <h2>Popular</h2>
    <div id="popular">
        {#await popularToday}
            <LoadingBar />
        {:then items}
            <MenuItemGrid {items} />
        {:catch error}
            <p>{error}</p>
        {/await}
    </div>
</div>

<style lang="scss">
    @import "../styles/vars";

    $padding: 1px;

    .notice {
        margin-right: auto;
        margin-bottom: $spacing-large;
        margin-left: auto;

        max-width: $sizing-default-width;
        height: 45px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: $font-size-h6;

        border-radius: $border-radius-normal;
        background: $color-dark;
        color: $color-on-dark;

        &.error {
            background: $color-error;
            color: $color-on-error;
        }
    }

    #back-button {
        margin-top: 8px;
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
            background-color: $color-light;
            color: $color-on-light;
        }
    }

    .main {
        display: flex;
        flex-direction: row;
    }

    #images {
        display: flex;
        flex-direction: column;

        .img-main {
            margin-bottom: $spacing-small;

            width: 600px;
            height: 450px;

            display: flex;
            justify-content: center;
            align-items: center;

            overflow: hidden;

            &.loaded {
                border-radius: $border-radius-large;
                border: 1px solid rgba($color-dark, 0.15);
                background-color: rgba($color-dark, 0.1);
            }

            > .loading.image {
                width: 100%;
                height: 100%;
            }

            > img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .img-alts {
            margin: 0;
            padding: 0;

            display: flex;
            flex-direction: row;

            > li {
                list-style: none;

                > .loading.image-small {
                    margin-right: $spacing-small;
                    width: 100px;
                    height: 100px;
                }

                > button {
                    margin-right: $spacing-small;
                    padding: 0;

                    width: 100px;
                    height: 100px;

                    border-radius: $border-radius-normal;
                    border: 1px solid transparent;
                    background: transparent;

                    overflow: hidden;

                    > img {
                        width: 100%;
                        height: 100%;
                        display: block;
                        object-fit: cover;
                    }

                    &:hover, &:focus-visible {
                        border: 1px solid $color-dark;
                    }
                }

                &.selected > button {
                    border: 1px solid $color-primary !important;
                }
            }
        }
    }

    #info {
        width: 100%;

        display: flex;
        flex-direction: column;
        align-items: flex-end;

        > h2 {
            padding-bottom: $spacing-xsmall;
            font-size: $font-size-h1;
        }
        > p {
            padding: 0;
            font-size: $font-size-h2;
        }

        .container {
            width: 100%;

            #description {
                padding: $spacing-normal;
            }

            #small-text {
                padding: $spacing-small $spacing-normal;

                p {
                    font-size: $font-size-xsmall;
                }
            }
        }
    }

    #basket-controls {
        display: flex;
        flex-direction: row;

        > .button {
            min-width: 35px;
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

            &.add {
                padding: 0 $spacing-normal;

                border: 0 solid transparent;
                border-radius: $border-radius-circle;
                background-color: $color-dark;
                color: $color-on-dark;

                &:hover,
                &:focus-visible {
                    background-color: $color-primary;
                    color: $color-on-primary;
                }
            }

            &.disabled {
                border: 1px solid rgba($color-dark, 0.1);
                color: rgba($color-on-light, 0.6) !important;

                &:hover,
                &:focus-visible {
                    border: 1px solid rgba($color-dark, 0.1);
                    background-color: $color-light;
                    color: rgba($color-on-light, 0.6);
                }

                &.add {
                    background-color: $color-dark !important;
                    color: rgba($color-on-dark, 0.6) !important;
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
    }

    .other {
        margin-left: auto;
        margin-right: auto;
        max-width: $sizing-default-width;
    }

    #popular {
        position: relative;
    }

    #error {
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

    #allergy-labels {
        padding: 0;

        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        flex-wrap: wrap;

        > li {
            margin: 0 0 0 $spacing-xsmall;
            padding: 0 $spacing-small;

            min-width: 30px;
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

    .loading {
        position: relative;

        border-radius: $border-radius-large;

        background: linear-gradient(
                        to right,
                        rgba($color-dark, 0) 8%,
                        rgba($color-dark, 0.3) 38%,
                        rgba($color-dark, 0) 54%
                    ) no-repeat;
        background-size: 1000px 100%;
        animation: loading 1s infinite linear;

        overflow: hidden;

        &::after {
            content: '';

            position: absolute;
            top: $padding;
            right: $padding;
            bottom: $padding;
            left: $padding;

            border-radius: calc($border-radius-large - $padding);
            background-color: darken($color-background, 10%);
            background-image: url("/assets/Noise.png");

            opacity: 0.9;
        }

        &.title {
            margin-bottom: $spacing-small;
            height: calc($font-size-h1 + 10px);
            width: 150px;
        }
        &.price {
            margin-bottom: $spacing-normal;
            height: calc($font-size-h2 + 10px);
            width: 60px;
        }
        &.description {
            height: 300px;
            width: 100%;
        }
    }

    @keyframes loading{
        0%{
            background-position: -600px 0
        }
        100%{
            background-position: 600px 0
        }
    }
</style>