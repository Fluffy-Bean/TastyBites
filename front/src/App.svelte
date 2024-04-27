<script>
    import Router from 'svelte-spa-router';
    import { replace, link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active'
    import { TwitterLogo, FacebookLogo, InstagramLogo, TiktokLogo } from 'phosphor-svelte';

    import routes from '%/routes.js';
    import Logo from '/LogoAlt.svg';

    const links = {
        home: {path: '/', className: 'active'},
        menu: {path: '/menu', className: 'active'},
        contact: {path: '/contact', className: 'active'},
        cart: {path: '/cart', className: 'active'},
    }

    let windowScrollY = 0;
    let windowWidth = 0;

    let oldLocation = undefined;
    let fullWidth = false;
    let showNavBar = false;

    $: scrolled = windowScrollY > 0
    $: mobile = windowWidth < 700

    function routeLoading(event) {
        if (event.detail.location === oldLocation) {
            return; // not an actual change
        }
        showNavBar = event.detail.userData.showNavBar;
        fullWidth = event.detail.userData.fullWidth;
        oldLocation = event.detail.location;
    }

    function conditionFailure(event) {
        replace("/");
    }
</script>

<svelte:window bind:scrollY={windowScrollY} bind:innerWidth={windowWidth} />
<svelte:head>
    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=erode@300,301,400,401,500,501,600,601,700,701,1,2&display=swap">
</svelte:head>


{#if showNavBar }
    <nav class:scrolled={scrolled} class:mobile={mobile}>
        {#if !mobile}
            <ul style="justify-content: flex-end">
                <li use:active={links.home}><a href="/" use:link>Home</a></li>
                <li use:active={links.menu}><a href="/menu" use:link>Menu</a></li>
            </ul>
            <span><img src={Logo} alt="TastyBites"></span>
            <ul style="justify-content: flex-start">
                <li use:active={links.contact}><a href="/contact" use:link>Contact&nbsp;Us</a></li>
                <li use:active={links.cart}><a href="/cart" use:link>Cart</a></li>
            </ul>
        {:else}
            <ul>
                <li use:active={links.home}><a href="/" use:link>Home</a></li>
                <li use:active={links.menu}><a href="/menu" use:link>Menu</a></li>
                <li use:active={links.contact}><a href="/contact" use:link>Contact&nbsp;Us</a></li>
                <li use:active={links.cart}><a href="/cart" use:link>Cart</a></li>
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
        <p>gwagwa</p>
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

<style lang="scss">
    // ToDo: Move this SCSS to its own _footer.scss file
    footer {
        padding: 16px;

        position: relative;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;

        border-top: 2px solid #6A9343;
        background-color: #443023;
        color: #e1dcd3;

        overflow: hidden;
    }

    .footer-section {
        padding: 16px;

        min-width: 200px;
        width: 100%;
        max-width: 500px;

        > ul {
            padding: 0;

            display: flex;
            flex-direction: row;

            > li {
                margin: 0 16px 0 0;
                list-style: none;

                > a {
                    height: 40px;
                    width: 40px;

                    display: flex;
                    justify-content: center;
                    align-items: center;

                    text-decoration: none;
                    font-size: 16px;

                    border-radius: 99999px;
                    background-color: transparent;
                    color: #e1dcd3;

                    &:hover {
                        background-color: #fffbf4;
                        color: #33251a;
                    }
                }
            }
        }

        > h4 {
            margin-bottom: 10px;
        }
    }
</style>

