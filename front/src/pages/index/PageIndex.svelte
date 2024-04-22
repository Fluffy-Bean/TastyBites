<script>
    import { link } from 'svelte-spa-router';
    import Announcement from "%/pages/index/Announcement.svelte";
    import ItemList from "%/pages/components/ItemList.svelte";

    const items = [
        {name: "Breakfast", price: 69.99},
        {name: "Dinner", price: 21},
        {name: "Brick", price: 0},
        {name: "Toast", price: 4382749832743},
        {name: "water", price: 1},
        {name: "half eaten mouldy bread", price: -9999}
    ];
</script>

<Announcement />
<a href="/annoucements" use:link style="float: right">Learn More</a>

<div class="spacer"></div>

<h2>Menu</h2>
<ItemList {items} />
<a href="/menu" use:link style="float: right">See All</a>



<div class="spacer"></div>

<h2>About Us</h2>
<p>Link to the /about page</p>

<style lang="scss">
    .spacer {
        height: 50px;
    }
</style>
