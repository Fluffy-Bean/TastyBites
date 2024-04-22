<script>
    import Router from 'svelte-spa-router';
    import { replace, link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active'
    import routes from '%/routes.js';

    let oldLocation = undefined;
    let showNavBar = false;

    function routeLoading(event) {
        if (event.detail.location === oldLocation) {
            return; // not an actual change
        }
        showNavBar = event.detail.userData.showNavBar;
        oldLocation = event.detail.location;
    }

    function conditionFailure(event) {
        replace("/");
    }
</script>

{#if showNavBar }
    <nav>
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
{/if}
<main>
    <Router
        {routes}
        restoreScrollState={true}
        on:routeLoading={routeLoading}
        on:conditionsFailed={conditionFailure}
    />
</main>
<footer>
    <p>TastyBites is a fake restaurant</p>
</footer>

<style lang="scss">
    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1rem;
        background-color: #f8f9fa;
        border-bottom: 1px solid #e9ecef;
        ul {
            width: 300px;
            padding: 0;
            margin: 0;
            display: flex;
            list-style: none;
            li {
                margin: 0 1rem;
            }
            span {
                margin: 0 1rem;
                font-weight: bolder;
            }
        }
    }
    main {
        padding: 1rem;
        flex-grow: 1;
    }
</style>
