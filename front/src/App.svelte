<script>
    import Router from 'svelte-spa-router';
    import { replace, link, location } from 'svelte-spa-router';
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
        <p>TastyBites</p>
        <ul>
            <li><a href="/" use:link use:active>Home</a></li>
            <li><a href="/contact" use:link use:active>Contact Us</a></li>
            <li><a href="/cart" use:link use:active>Shopping Cart</a></li>
        </ul>
        <p>Location: {$location}</p>
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

<style>
</style>
