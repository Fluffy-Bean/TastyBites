<script>
    import { link } from 'svelte-spa-router';
    import Acorn from 'phosphor-svelte/lib/Acorn';
    import Fish from 'phosphor-svelte/lib/Fish';
    import Leaf from 'phosphor-svelte/lib/Leaf';
    import Pepper from 'phosphor-svelte/lib/Pepper';
    import ArrowUpRight from 'phosphor-svelte/lib/ArrowUpRight';
    import GrainsSlash from 'phosphor-svelte/lib/GrainsSlash';
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
                {#if label === "gluten"}
                    <li class="gluten"><GrainsSlash weight="fill" /></li>
                {/if}
                {#if label === "spicy"}
                    <li class="spicy"><Pepper weight="fill" /></li>
                {/if}
            {/each}
        </ul>
        <a href="/item/{id}" use:link>View&nbsp;<ArrowUpRight /></a>
    </div>

    <ul class="menu-item-detail">
        <li>{name}</li>
        <li>£{price}</li>
    </ul>
</div>

