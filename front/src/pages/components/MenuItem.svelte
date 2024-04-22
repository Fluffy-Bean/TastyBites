<script>
    import { link } from 'svelte-spa-router';

    export let name;
    export let price;
    export let id;
</script>

<a href="/item/{id}" use:link>
    <span>{name}</span>
    <span>£{price}</span>
</a>

<style lang="scss">
    a {
        width: 200px;
        height: 200px;
        background-color: #f0f0f0;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
</style>