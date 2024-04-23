<script>
    import { link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active'

    export let scrolled = false;
</script>

<nav class:scrolled={scrolled}>
    <ul style="justify-content: flex-end">
        <li use:active={{path: '/', className: 'active'}}>
            <a href="/" use:link>Home</a>
        </li>
        <li use:active={{path: '/menu', className: 'active'}}>
            <a href="/menu" use:link>Menu</a>
        </li>
    </ul>

    <span>TastyBites</span>

    <ul style="justify-content: flex-start">
        <li use:active={{path: '/contact', className: 'active'}}>
            <a href="/contact" use:link>Contact Us</a>
        </li>
        <li use:active={{path: '/cart', className: 'active'}}>
            <a href="/cart" use:link>Cart</a>
        </li>
    </ul>
</nav>
