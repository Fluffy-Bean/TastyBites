<script>
    import Router from 'svelte-spa-router';
    import { replace } from 'svelte-spa-router';
    import routes from '%/routes.js';
    import NavigationBar from "%/pages/elements/NavigationBar.svelte";
    import FooterBar from "%/pages/elements/FooterBar.svelte";

    let oldLocation = undefined;
    let showNavBar = false;
    let fullWidth = false;

    let windowScrollY = 0;
    let windowWidth = 0;

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
    <NavigationBar
        scrolled={windowScrollY > 0}
        mobile={windowWidth < 700}
    />
{/if}
<main
    class:nav-space={showNavBar}
    class:full-width={fullWidth}
>
    <Router
        routes={routes}
        restoreScrollState={true}
        on:routeLoading={routeLoading}
        on:conditionsFailed={conditionFailure}
    />
</main>
<FooterBar />
