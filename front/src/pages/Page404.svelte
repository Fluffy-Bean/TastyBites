<script>
    import { link } from 'svelte-spa-router';

    export let params = {};
</script>

<div>
    <h1>404</h1>
    <p>Could not find resource you've searched for. <a href="/" use:link>Go Back</a></p>
</div>

<style lang="scss">
    @import "%/styles/vars";

    div {
        padding: $spacing-large;

        height: 100%;

        display: flex;
        flex-direction: column;
    }
    h1 {
        font-size: 50px;
        text-align: center;
    }
    p {
        text-align: center;
    }
    a {
        text-decoration: none;
        color: $color-primary;

        &:hover {
            text-decoration: underline;
        }
    }
</style>