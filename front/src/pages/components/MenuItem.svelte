<script>
    import { link } from 'svelte-spa-router';
    import {Acorn, Fish, Leaf, Flame, ArrowUpRight } from "phosphor-svelte"
    import LoadingImage from '/MenuItemLoadingAlt.svg';

    export let id;
    export let name;
    export let price;
    export let image;
    export let labels = []
</script>

<div class="menu-item">
    {#if !image}
        <img src={LoadingImage} alt="" class="menu-item-image">
    {:else}
        <img src={image} alt="" class="menu-item-image">
    {/if}

    <div class="menu-item-header">
        <ul>
            {#each labels as label}
                {#if label === "vegan"}
                    <li class="vegan"><Leaf weight="fill" /></li>
                {/if}
                {#if label === "fish"}
                    <li class="fish"><Fish weight="fill" /></li>
                {/if}
                {#if label === "nut"}
                    <li class="nut"><Acorn weight="fill" /></li>
                {/if}
                {#if label === "spicy"}
                    <li class="spicy"><Flame weight="fill" /></li>
                {/if}
            {/each}
        </ul>
        <a href="/item/{id}" use:link>View <ArrowUpRight /></a>
    </div>

    <ul class="menu-item-detail">
        <li>{name}</li>
        <li>£{price}</li>
    </ul>
</div>

