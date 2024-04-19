<script>
    import Router from 'svelte-spa-router';
    import { replace, link } from 'svelte-spa-router';
    import active from 'svelte-spa-router/active'
    import routes from './routes';

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
        <ul>
            <li><a href="/" use:link use:active>Home</a></li>
            <li><a href="/contact" use:link use:active>Contact Us</a></li>
        </ul>
        <span>TastyBites</span>
        <ul>
            <li><a href="/orders" use:link use:active>Orders</a></li>
            <li><a href="/cart" use:link use:active>Shopping Cart</a></li>
        </ul>
    </nav>
{/if}
<Router
    {routes}
    restoreScrollState={true}
    on:routeLoading={routeLoading}
    on:conditionsFailed={conditionFailure}
/>
<footer>
    <p>TastyBites is a fake restaurant</p>
</footer>

<style lang="sass">
    nav
        display: flex
        justify-content: center
        align-items: center
        padding: 1rem
        background-color: #f8f9fa
        border-bottom: 1px solid #e9ecef
        ul
            padding: 0
            margin: 0
            display: flex
            list-style: none
            li
                margin: 0 1rem
        span
            margin: 0 1rem
            font-weight: bolder
</style>
