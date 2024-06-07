<script lang="ts">
    import { onMount } from "svelte";
    import { link } from 'svelte-spa-router';
    import { Acorn, Fish, Leaf, Pepper, ArrowUpRight, Grains } from 'phosphor-svelte';

    import { type Item, Labels} from "../lib/types";
    import LoadingImage from '/assets/MenuItemLoadingAlt.svg';

    export let item: Item;

    let element: HTMLElement;

    function keepSquare() {
        element.style.height = "";
        element.style.height = element.offsetWidth + "px";
    }

    onMount(keepSquare)
</script>

<svelte:window on:resize={keepSquare}></svelte:window>

<div class="menu-item" bind:this={element}>
    {#if !item.availability}
        <!--<div class="menu-item-notice"><span>Item is no-longer for sale</span></div>-->
    {/if}

    {#if item.images && item.images[0]}
        <img src={item.images[0]} alt="" class="menu-item-image">
    {:else}
        <img src={LoadingImage} alt="" class="menu-item-image">
    {/if}

    <ul class="menu-item-labels">
        {#if item.labels}
            {#each item.labels as label}
                {#if label === Labels.vegan}
                    <li class="vegan"><Leaf weight="fill" /></li>
                {:else if label === Labels.fish}
                    <li class="fish"><Fish weight="fill" /></li>
                {:else if label === Labels.nut}
                    <li class="nut"><Acorn weight="fill" /></li>
                {:else if label === Labels.gluten}
                    <li class="gluten"><Grains weight="fill" /></li>
                {:else if label === Labels.spicy}
                    <li class="spicy"><Pepper weight="fill" /></li>
                {/if}
            {/each}
        {/if}
    </ul>

    <a class="menu-item-link" href="/item/{item.uuid}" use:link>View&nbsp;<ArrowUpRight /></a>
    <ul class="menu-item-detail"><li>£{item.price.toFixed(2)} | {item.name}</li></ul>
</div>

