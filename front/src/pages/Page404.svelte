<script>
    import { link } from 'svelte-spa-router';

    export let params = {};
</script>

<div>
    <h1>404</h1>
    <p>Could not find resource you've searched for. <a href="/" use:link>Go Back</a></p>
</div>

<style>
    div {
        padding: 16px;
        height: 100%;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    h1 {
        text-align: center;
    }
    p {
        text-align: center;
    }
    a {
        text-decoration: none;
        color: #6A9343;

        &:hover {
            text-decoration: underline;
        }
    }
</style>