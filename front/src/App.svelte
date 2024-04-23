<script>
    import Router from 'svelte-spa-router';
    import { replace } from 'svelte-spa-router';
    import routes from '%/routes.js';
    import NavigationBar from "%/pages/components/NavigationBar.svelte";
    import FooterBar from "%/pages/components/FooterBar.svelte";

    let oldLocation = undefined;
    let showNavBar = false;
    let scrollY = 0;

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

<svelte:window bind:scrollY={scrollY} />
<svelte:head>
    <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=erode@300,301,400,401,500,501,600,601,700,701,1,2&display=swap">
</svelte:head>

{#if showNavBar }
    <NavigationBar scrolled={scrollY > 0} />
{/if}
<main class:nav-space={showNavBar}>
    <Router
        routes={routes}
        restoreScrollState={true}
        on:routeLoading={routeLoading}
        on:conditionsFailed={conditionFailure}
    />
</main>
<FooterBar />
