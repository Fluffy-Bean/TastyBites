<script lang="ts">
    import { getAnnouncements } from '../lib/test-api';

    let announcement = getAnnouncements();
</script>


{#await announcement}
    <div class="loading-box" />
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

    .loading-box {
        height: 400px;
    }

    @media only screen and (max-width: 670px) {
        .loading-box {
            margin: -$spacing-small;
            margin-bottom: 0;
            height: 250px;
        }
    }
</style>