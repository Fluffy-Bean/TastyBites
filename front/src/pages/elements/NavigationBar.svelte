<script>
    import { link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active'
    import Logo from '/LogoAlt.svg';

    const links = {
        home: {path: '/', className: 'active'},
        menu: {path: '/menu', className: 'active'},
        contact: {path: '/contact', className: 'active'},
        cart: {path: '/cart', className: 'active'},
    }

    export let scrolled = false;
    export let mobile = false;
</script>

<nav class:scrolled={scrolled} class:mobile={mobile}>
    {#if !mobile}
        <ul style="justify-content: flex-end">
            <li use:active={links.home}>
                <a href="/" use:link>Home</a>
            </li>
            <li use:active={links.menu}>
                <a href="/menu" use:link>Menu</a>
            </li>
        </ul>

        <span><img src={Logo} alt="TastyBites"></span>

        <ul style="justify-content: flex-start">
            <li use:active={links.contact}>
                <a href="/contact" use:link>Contact&nbsp;Us</a>
            </li>
            <li use:active={links.cart}>
                <a href="/cart" use:link>Cart</a>
            </li>
        </ul>
    {:else}
        <ul>
            <li use:active={links.home}>
                <a href="/" use:link>Home</a>
            </li>
            <li use:active={links.menu}>
                <a href="/menu" use:link>Menu</a>
            </li>
            <li use:active={links.contact}>
                <a href="/contact" use:link>Contact&nbsp;Us</a>
            </li>
            <li use:active={links.cart}>
                <a href="/cart" use:link>Cart</a>
            </li>
        </ul>
    {/if}
</nav>
