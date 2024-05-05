<script lang="ts">
    import { link } from 'svelte-spa-router';
    import { Acorn, Fish, Leaf, Pepper, ArrowUpRight, GrainsSlash } from 'phosphor-svelte';

    import { type Item, Labels} from "../lib/types";
    import LoadingImage from '/MenuItemLoadingAlt.svg';

    export let item: Item;
</script>

<div class="menu-item">
    {#if item.images}
        <img src={item.images[0]} alt="" class="menu-item-image">
    {:else}
        <img src={LoadingImage} alt="" class="menu-item-image">
    {/if}

    <div class="menu-item-header">
        <ul>
            {#each item.labels as label}
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
        <a href="/item/{item.uuid}" use:link>
            View&nbsp;<ArrowUpRight />
        </a>
    </div>

    <ul class="menu-item-detail">
        <li>{item.name}</li>
        <li>£{item.price}</li>
    </ul>
</div>

