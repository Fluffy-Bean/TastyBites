<script lang="ts">
    import { getAnnouncements } from '../lib/test-api';

    let announcement = getAnnouncements();
</script>


{#await announcement}
    <div class="announcement-banner-loading" />
{:then announcement}
    <div class="announcement-banner">
        <img src={announcement.image} alt="">
    </div>
{:catch error}
    <p>{error}</p>
{/await}

<style lang="scss">
    @import "../styles/vars";

    $padding: 1px;

    .announcement-banner-loading {
        height: 400px;

        position: relative;

        border-radius: $border-radius-large;

        background: linear-gradient(
                        to right,
                        rgba($color-dark, 0) 8%,
                        rgba($color-dark, 0.3) 38%,
                        rgba($color-dark, 0) 54%
        ) no-repeat;
        background-size: 1500px 100%;
        animation: loading 1s infinite linear;

        overflow: hidden;

        &::after {
            content: '';

            position: absolute;
            top: $padding;
            right: $padding;
            bottom: $padding;
            left: $padding;

            border-radius: calc($border-radius-large - $padding);
            background-color: darken($color-background, 10%);
            background-image: url("/assets/Noise.png");

            opacity: 0.9;
        }
    }

    @media only screen and (max-width: 670px) {
        .announcement-banner-loading {
            margin: -$spacing-small;
            margin-bottom: 0;
            height: 250px;
        }
    }

    @keyframes loading{
        0%{
            background-position: -750px 0
        }
        100%{
            background-position: 750px 0
        }
    }
</style>