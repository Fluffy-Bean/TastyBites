<script lang="ts">
    import { SmileySad } from "phosphor-svelte";
</script>

<div>
    <h1>Server Fucking Died!&nbsp;<SmileySad weight="fill" /></h1>
    <p>Error 500</p>
</div>

<style lang="scss">
    @import "../styles/vars";

    div {
        height: 400px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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