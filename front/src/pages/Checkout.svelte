<script lang="ts">
    import { link } from "svelte-spa-router";
    import { ArrowLeft } from "phosphor-svelte";
</script>


<a href="/cart" use:link id="back-button"><ArrowLeft />&nbsp;Back</a>
<h1>Cart</h1>

<h2>Order total: £Balls</h2>


<style lang="scss">
    @import "../styles/vars";

    #back-button {
        margin-top: 8px;
        padding: 0 $spacing-small;

        width: max-content;
        height: 30px;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        font-size: $font-size-p;
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