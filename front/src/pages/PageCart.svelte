<script>
    import { link } from 'svelte-spa-router';

    import { getItemsByUUID } from "%/lib/test-api.ts";
    import LoadingBar from "%/components/LoadingBar.svelte";
    import Cart from '%/lib/cart.ts';
    import MenuList from "%/components/MenuList.svelte";

    $: items = getItemsByUUID($Cart.map((item) => item.uuid));
</script>

<h1>Shopping Cart</h1>

{#await items}
    <LoadingBar />
{:then items}
    {#if items.length}
        <MenuList items={items} />
    {:else}
        <p>Empty.....</p>
    {/if}

    <ul>
        {#each items as item}
            <li>
                <button on:click={() => {Cart.removeByUUID(item.uuid)}}>Yeet {item.name}</button>
            </li>
        {/each}
    </ul>
{/await}

<p>Looking past orders? Check out the <a href="/contact" use:link>commonly asked questions</a></p>
