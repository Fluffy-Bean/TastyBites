<script>
    import MenuItem from "%/pages/components/MenuItem.svelte";

    export let items = [];
</script>

<ul>
    {#each items as item}
        <li>
            <MenuItem
                id={item.name}
                name={item.name}
                price={item.price}
                image={item.image}
                labels={item.labels}
            />
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