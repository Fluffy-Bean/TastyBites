<script>
    import Router, { replace, link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active'
    import { TwitterLogo, FacebookLogo, InstagramLogo, TiktokLogo } from 'phosphor-svelte';

    import Cart, { cartLoaded } from './lib/cart';
    import routes from './routes';
    import Logo from '/assets/LogoAlt.svg';
    import Spinner from '/spinner.svg';

    const links = {
        home: {path: '/', className: 'active'},
        menu: {path: '/menu', className: 'active'},
        contact: {path: '/contact', className: 'active'},
        cart: {path: '/cart', className: 'active'},
    }

    let scrollY = 0;
    let width = 0;
    let oldLocation = undefined;
    let fullWidth = false;
    let showNavBar = false;
    let cartItemCount = 0;

    Cart.subscribe(() => {
        cartItemCount = Cart.getTotalLength();
    });

    function routeLoading(event) {
        if (event.detail.location === oldLocation) {
            return; // not an actual change
        }

        showNavBar = event.detail.userData.showNavBar;
        fullWidth = event.detail.userData.fullWidth;
        oldLocation = event.detail.location;
    }

    function conditionFailure() {
        replace("/");
    }
</script>


<svelte:window
    bind:scrollY={scrollY}
    bind:innerWidth={width}
/>
<svelte:head>
    <link
        rel="stylesheet"
        href="https://api.fontshare.com/v2/css?f[]=erode@300,301,400,401,500,501,600,601,700,701,1,2&display=swap"
    />
    <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossorigin=""
    />
</svelte:head>


{#if showNavBar }
    <nav class:scrolled={scrollY > 0} class:mobile={width < 700}>
        {#if !(width < 700)}
            <ul style="justify-content: flex-end">
                <li use:active={links.home}><a href="/" use:link>Home</a></li>
                <li use:active={links.menu}><a href="/menu" use:link>Menu</a></li>
            </ul>
            <span class="nav-logo"><img src={Logo} alt="TastyBites"></span>
            <ul style="justify-content: flex-start">
                <li use:active={links.contact}><a href="/contact" use:link>Contact&nbsp;Us</a></li>
                <li use:active={links.cart}>
                    <a href="/cart" use:link>
                        Cart&nbsp;&nbsp;
                        <span class="nav-basket">
                            {#await cartLoaded}
                                <img src={Spinner} alt="Cart Loading">
                            {:then _}
                                {cartItemCount}
                            {/await}
                        </span>
                    </a>
                </li>
            </ul>
        {:else}
            <ul>
                <li use:active={links.home}><a href="/" use:link>Home</a></li>
                <li use:active={links.menu}><a href="/menu" use:link>Menu</a></li>
                <li use:active={links.contact}><a href="/contact" use:link>Contact&nbsp;Us</a></li>
                <li use:active={links.cart}>
                    <a href="/cart" use:link>
                        Cart&nbsp;&nbsp;
                        <span class="nav-basket">
                            {#await cartLoaded}
                                <img src={Spinner} alt="Cart Loading">
                            {:then _}
                                {cartItemCount}
                            {/await}
                        </span>
                    </a>
                </li>
            </ul>
        {/if}
    </nav>
{/if}
<main class:nav-space={showNavBar} class:full-width={fullWidth}>
    <Router
        routes={routes}
        restoreScrollState={true}
        on:routeLoading={routeLoading}
        on:conditionsFailed={conditionFailure}
    />
</main>
<footer>
    <div class="footer-section">
        <p>TastyBites is not a real restaurant</p>
    </div>
    <div class="footer-section">
        <h4>Find us on:</h4>
        <ul>
            <li><a href="www.twitter.com"><TwitterLogo weight="fill"/></a></li>
            <li><a href="www.twitter.com"><FacebookLogo weight="fill"/></a></li>
            <li><a href="www.twitter.com"><InstagramLogo weight="fill"/></a></li>
            <li><a href="www.twitter.com"><TiktokLogo weight="fill"/></a></li>
        </ul>
    </div>
</footer>
