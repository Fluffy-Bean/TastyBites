<script>
    import { link } from 'svelte-spa-router';

    import Cart from '%/lib/cart.ts';
    import MenuList from "%/components/MenuList.svelte";

    console.log($Cart);
</script>

<h1>Shopping Cart</h1>

<MenuList items={$Cart} />

<ul>
    {#each $Cart as item}
        <li>
            <button on:click={() => {Cart.removeByUUID(item.uuid)}}>Yeet {item.name}</button>
        </li>
    {/each}
</ul>

<p>Looking past orders? Check out the <a href="/contact" use:link>commonly asked questions</a></p>
