<script>
    import MenuItem from "%/components/MenuItem.svelte";

    export let items = [];
</script>

<ul>
    {#each items as item}
        <li>
            <MenuItem item={item} />
        </li>
    {/each}
</ul>

<style lang="scss">
    ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 16px
    }
    li {
        margin: 0;
    }
</style>
