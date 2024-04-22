<script>
    import { link } from 'svelte-spa-router';

    export let params = {};
</script>

<h1>404</h1>
<p>Could not find resource you've searched for. <a href="/" use:link>Go Back</a></p>
