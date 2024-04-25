<script>
    import { onMount } from "svelte";
    import { link } from 'svelte-spa-router';
    import { ArrowUpRight } from "phosphor-svelte";
    import AnnouncementBanner from "%/pages/elements/AnnouncementBanner.svelte";
    import MenuList from "%/pages/elements/MenuList.svelte";
    import Items from '%/testData.js';
    import { map, tileLayer} from 'leaflet';

    let items = Items;

    onMount(() => {
        let Map = map('map').setView([51.505, -0.09], 13);
        tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }
        ).addTo(Map);
    })
</script>

<svelte:head>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""/>
</svelte:head>

<AnnouncementBanner />
<a href="/annoucements" use:link>Learn More <ArrowUpRight /></a>
<div class="spacer" />

<h2>Where to find us</h2>
<div id="contact">
    <div id="map"></div>
    <div class="container">
        <h2>Some Title</h2>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis dolore maiores, dolorem unde, illo vero dolores magnam omnis, explicabo vel eos voluptatem libero ullam ipsa molestias laboriosam voluptas nisi sunt.</p>
    </div>
</div>
<div class="spacer" />

<h2>Popular Today</h2>
<MenuList {items} />
<a href="/menu" use:link>See All <ArrowUpRight /></a>
<div class="spacer" />

<h2>About Us</h2>contact
<p>Want to know the story of the restaurant?</p>
<a href="/about" use:link>Continue reading <ArrowUpRight /></a>


<style lang="scss">
    @import "%/styles/vars";

    a {
        margin-top: 8px;

        padding-left: 10px;
        padding-right: 10px;

        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        float: right;

        text-decoration: none;

        border-radius: 9999px;
        background-color: transparent;
        color: $color-on-background;

        &:hover {
            background-color: $color-light;
            color: $color-on-light;
        }
    }

    #contact {
        display: flex;
        flex-direction: row;

        .container {
            margin-left: $spacing-normal;
            padding: $spacing-normal;
        }
    }

    #map {
        min-width: 550px;
        height: 350px;

        border-radius: $border-radius-normal;
    }

    @media only screen and (max-width: 900px) {
        #map {
            min-width: 400px;
            height: 300px;
        }
    }
    @media only screen and (max-width: 750px) {
        #contact {
            display: flex;
            flex-direction: column;

            .container {
                margin-left: 0;
                margin-top: $spacing-normal;
            }
        }
        #map {
            min-width: unset;
            height: 350px;
        }
    }
</style>
