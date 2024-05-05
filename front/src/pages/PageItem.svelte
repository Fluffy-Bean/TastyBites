<script lang="ts">
    import { Minus, Plus, SmileySad } from "phosphor-svelte";

    import { getPopularToday, getItemByUUID } from "../lib/test-api";
    import Cart from "../lib/cart";
    import MenuList from "../components/MenuList.svelte";
    import LoadingBar from "../components/LoadingBar.svelte";
    import LoadingImage from "/MenuItemLoading.svg";

    export let params: {
        uuid?: string;
    };

    let basketAmount = 1;

    $: item = getItemByUUID(params.uuid);
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

<div class="main">
    {#await item}
        <div id="images">
            <div>
                <img src={LoadingImage} alt="">
            </div>
            <ul>
                <li><img src={LoadingImage} alt=""></li>
                <li><img src={LoadingImage} alt=""></li>
                <li><img src={LoadingImage} alt=""></li>
                <li><img src={LoadingImage} alt=""></li>
                <li><img src={LoadingImage} alt=""></li>
            </ul>
        </div>

        <div id="info">
            <div class="loading title" />
            <div class="loading price" />

            <div class="loading description" />
        </div>
    {:then item}
        <div id="images">
            <div>
                {#if item.images}
                    <img src="{item.images[0]}" alt="Item">
                {:else}
                    <img src="/MenuItemLoading.svg" alt="Item">
                {/if}
            </div>
            <ul>
                <li><img src={LoadingImage} alt=""></li>
                <li><img src={LoadingImage} alt=""></li>
                <li><img src={LoadingImage} alt=""></li>
                <li><img src={LoadingImage} alt=""></li>
                <li><img src={LoadingImage} alt=""></li>
            </ul>
        </div>

        <div id="info">
            <h2>{item.name}</h2>
            <p>£{item.price}</p>

            <div class="container">
                <p>{item.description}</p>
            </div>

            <div id="basket-controls">
                <button class="button" class:disabled={basketAmount <= 1} on:click={reduce}><Minus /></button>
                <p>{basketAmount}</p>
                <button class="button" class:disabled={basketAmount >= 99} on:click={increase}><Plus /></button>
                <hr>
                <button class="button add" on:click={add} id="add-to-cart">Add to Cart</button>
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
            <MenuList {items} />
        {:catch error}
            <p>{error}</p>
        {/await}
    </div>
</div>

<style lang="scss">
    @import "../styles/vars";

    $padding: 1px;

    .main {
        display: flex;
        flex-direction: row;
    }

    #images {
        display: flex;
        flex-direction: column;

        > div {
            margin-bottom: $spacing-small;
            padding: $spacing-small;

            width: 650px;
            height: 500px;

            display: flex;
            justify-content: center;
            align-items: center;

            border-radius: $border-radius-normal;
            background-color: $color-background;

            overflow: hidden;

            > img {
                max-width: 100%;
                max-height: 100%;

                border-radius: $border-radius-normal;
            }
        }

        > ul {
            margin: 0;
            padding: 0;

            display: flex;
            flex-direction: row;

            > li {
                list-style: none;

                > img {
                    margin-right: $spacing-small;
                    width: 100px;
                    border-radius: $border-radius-normal;
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
            font-size: $font-size-h1;
            padding-bottom: $spacing-small;
        }
        > p {
            font-size: $font-size-h2;
            padding-bottom: $spacing-normal;
        }
        .container {
            padding: $spacing-normal;
            width: 100%;
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

    .loading {
        position: relative;

        border-radius: $border-radius-large;

        background: linear-gradient(to right, $color-background 8%, rgba($color-dark, 0.3) 38%, $color-background 54%);
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
            background-color: rgba($color-background, 0.9);
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
            height: 400px;
            width: 100%;
        }
    }

    @keyframes loading{
        0%{
            background-position: -500px 0
        }
        100%{
            background-position: 500px 0
        }
    }
</style>