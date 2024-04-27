<script>
    import { getAnnouncements } from '%/lib/test-api.js';

    let announcement = getAnnouncements();
</script>


{#await announcement}
    <div class="announcement-banner-loading">
        <div />
    </div>
{:then announcement}
    <div class="announcement-banner">
        <img src={announcement.image} alt="">
    </div>
{:catch error}
    <p>{error}</p>
{/await}

<style lang="scss">
    @import "%/styles/vars";

    $padding: 1px;

    .announcement-banner-loading {
        height: 400px;

        position: relative;

        border-radius: $border-radius-large;

        background: linear-gradient(to right, $color-background 8%, rgba($color-dark, 0.3) 38%, $color-background 54%);
        background-size: 1000px 100%;
        animation: loading 1s infinite linear;

        overflow: hidden;

        > div {
            position: absolute;
            top: $padding;
            right: $padding;
            bottom: $padding;
            left: $padding;
            border-radius: calc($border-radius-large - $padding);
            background-color: rgba($color-background, 0.9);
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
            background-position: -500px 0
        }
        100%{
            background-position: 500px 0
        }
    }
</style>