<script lang="ts">
    import { onMount } from "svelte";
    import { link } from 'svelte-spa-router';
    import { ArrowUpRight } from "phosphor-svelte";
    import L from 'leaflet';

    import { getPopularToday } from "../lib/test-api";
    import AnnouncementBanner from "../components/AnnouncementBanner.svelte";
    import LoadingBar from "../components/LoadingBar.svelte";
    import MenuItemGrid from "../components/MenuItemGrid.svelte";

    let items = getPopularToday();

    onMount(() => {
        const leafletMap = L.map('map').setView([50.82304922105467, -0.432780150496344], 13);
        L.tileLayer(
            'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            {
                maxZoom: 20,
                attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a>",
            },
        ).addTo(leafletMap);
        L.marker([50.82304922105467, -0.432780150496344]).addTo(leafletMap);

    });
</script>

<AnnouncementBanner />

<div class="spacer" />

<h2>Where to find us</h2>
<div id="contact">
    <div id="map"></div>
    <div class="container">
        <h2>Opening Times</h2>
        <p>Please make sure to checkout our full calendar, as we have different times during public holiday</p>
        <div id="timetable">
            <table>
                <tr><th>Day</th><th>Opening</th><th>Closing</th></tr>
                <tr><td>Monday</td><td>9am</td><td>12pm</td></tr>
                <tr><td>Tuesday</td><td>9am</td><td>12pm</td></tr>
                <tr><td>Wednesday</td><td>9am</td><td>12pm</td></tr>
                <tr><td>Thursday</td><td>9am</td><td>12pm</td></tr>
                <tr><td>Friday</td><td>9am</td><td>12pm</td></tr>
                <tr><td>Saturday</td><td>11am</td><td>2am</td></tr>
                <tr><td>Sunday</td><td>11am</td><td>2am</td></tr>
            </table>
        </div>
        <a href="/booking" use:link>Ready to book a table?</a>
    </div>
</div>

<div class="spacer" />

<h2>About Us</h2>
<div class="container padding">
    <p>
        Hello! We're TastyBites, a restaurant opened by young adults with a passion for making food thats healthy and organic.
        We opened this restaurant as we want others to be consious of where their food came from, and what it really is.
        <br><br>
        We've designed the restaurant to have a fun and positive energy, and we're inviting everyone to give it a try!
        <br><br>
        Read more on us if you wanna know our full back story...
    </p>
</div>
<a href="/about" use:link>Continue reading <ArrowUpRight /></a>

<div class="spacer" />

<h2>Popular Today</h2>
<div id="popular">
    {#await items}
        <LoadingBar />
    {:then items}
        <MenuItemGrid {items} />
    {:catch error}
        <p>{error}</p>
    {/await}
</div>
<a href="/menu" use:link>See All <ArrowUpRight /></a>


<style lang="scss">
    @import "../styles/vars";

    a {
        margin-top: 8px;
        padding: 0 $spacing-small;

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

    #map {
        min-width: 550px;
        border-radius: $border-radius-normal;
        box-shadow: 0 1px 0.5px rgba(#000, 0.3);
    }

    #contact {
        display: flex;
        flex-direction: row;

        .container {
            margin-left: $spacing-small;
            padding: $spacing-normal;

            width: 100%;

            h2, p {
                padding-bottom: $spacing-xsmall;
            }

            a {
                margin-top: 8px;
                padding: 0 $spacing-small;

                width: 100%;
                height: 30px;

                display: flex;
                justify-content: center;
                align-items: center;

                font-size: $font-size-p;
                text-decoration: none;

                border-radius: 9999px;
                background-color: $color-primary;
                color: $color-on-primary;

                &:hover {
                    background-color: $color-dark;
                    color: $color-on-dark;
                }
            }
        }
    }

    #timetable {
        border-radius: $border-radius-normal;
        border: 1px solid rgba(#000, 0.1);
        background-color: $color-light;

        overflow: hidden;

        table {
            width: 100%;
            border-collapse: collapse;

            tr {
                border-bottom: 1px solid rgba(#000, 0.1);

                &:last-of-type {
                    border: 0 solid transparent;
                }

                th, td {
                    padding: $spacing-xsmall $spacing-small;
                    border-right: 1px solid rgba(#000, 0.1);

                    &:last-of-type {
                        border: 0 solid transparent;
                    }
                }

                th {
                    font-weight: $font-weight-bolder;
                }
                td {
                    font-weight: $font-weight-normal;
                }
            }
        }
    }

    #popular {
        position: relative;
    }

    .padding {
        padding: $spacing-normal;
    }

    @media only screen and (max-width: 900px) {
        #map {
            min-width: 400px;
            border-radius: $border-radius-normal 0 0 $border-radius-normal;
        }
        #contact {
            .container {
                margin-left: 0;
                border-radius: 0 $border-radius-normal $border-radius-normal 0;
            }
        }
    }
    @media only screen and (max-width: 750px) {
        #map {
            min-width: unset;
            height: 350px;
            border-radius: $border-radius-normal $border-radius-normal 0 0;
        }
        #contact {
            display: flex;
            flex-direction: column;

            .container {
                border-radius: 0 0 $border-radius-normal $border-radius-normal;
            }
        }
    }
</style>
