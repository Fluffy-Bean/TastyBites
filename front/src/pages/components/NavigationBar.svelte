<script>
    import { link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active'

    export let scrolled = false;
</script>

<nav class:scrolled={scrolled}>
    <ul style="justify-content: flex-end">
        <li><a href="/" use:link use:active>Home</a></li>
        <li><a href="/contact" use:link use:active>Contact Us</a></li>
    </ul>

    <span>TastyBites</span>

    <ul style="justify-content: flex-start">
        <li><a href="/orders" use:link use:active>Orders</a></li>
        <li><a href="/cart" use:link use:active>Cart</a></li>
    </ul>
</nav>
