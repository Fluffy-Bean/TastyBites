<script>
    import { onMount } from "svelte";
    import { link } from 'svelte-spa-router';
    import { ArrowUpRight } from "phosphor-svelte";
    import AnnouncementBanner from "%/pages/elements/AnnouncementBanner.svelte";
    import MenuList from "%/pages/elements/MenuList.svelte";
    import Items from '%/testData.js';
    import L from 'leaflet';

    let items = Items;

    let map;
    onMount(() => {
        map = L.map('map').setView([51.505, -0.09], 13);
        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
        ).addTo(map);
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""/>
</svelte:head>

<div>
    <AnnouncementBanner />
    <a href="/annoucements" use:link style="float: right">Learn More <ArrowUpRight /></a>
    <div class="spacer"></div>

    <h2>Where to find us</h2>
    <div class="contact">
        <div id="map"></div>
        <div class="contact-detail">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis dolore maiores, dolorem unde, illo vero dolores magnam omnis, explicabo vel eos voluptatem libero ullam ipsa molestias laboriosam voluptas nisi sunt.</p>
        </div>
    </div>
    <div class="spacer"></div>

    <h2>Popular Today</h2>
    <MenuList {items} />
    <a href="/menu" use:link style="float: right">See All <ArrowUpRight /></a>
    <div class="spacer"></div>

    <h2>About Us</h2>
    <p>Want to know the story of the restaurant?</p>
    <a href="/about" use:link style="float: right">Continue reading <ArrowUpRight /></a>
</div>

<style lang="scss">
    @import "%/styles/vars";

    h2 {
        margin-bottom: $spacing-small;
    }
    .spacer {
        height: $spacing-large;
    }

    .contact {
        display: flex;
        flex-direction: row;

        #map {
            min-width: 600px;
            height: 400px;

            border-radius: $border-radius-normal;
        }

        .contact-detail {
            padding-left: $spacing-normal;
        }
    }

    a {
        margin-top: 8px;

        padding-left: 10px;
        padding-right: 10px;

        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        text-decoration: none;

        border-radius: 9999px;
        background-color: transparent;
        color: $color-on-background;

        &:hover {
            background-color: $color-light;
            color: $color-on-light;
        }
    }
</style>
