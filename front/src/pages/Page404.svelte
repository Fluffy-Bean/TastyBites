<script>
    import { SmileySad } from "phosphor-svelte";
</script>

<div>
    <h1>You're lost!&nbsp;<SmileySad weight="fill" /></h1>
    <p>Error 404</p>
</div>

<style lang="scss">
    @import "../styles/vars";

    div {
        padding: $spacing-large;

        height: 100%;

        display: flex;
        flex-direction: column;
    }
    h1 {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: $font-size-very-fucking-big;
        text-align: center;
    }
    p {
        text-align: center;
    }
</style>