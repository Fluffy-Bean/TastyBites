<script>
    import { link } from 'svelte-spa-router';
    import AnnouncementBanner from "%/pages/components/AnnouncementBanner.svelte";
    import MenuList from "%/pages/components/MenuList.svelte";

    const items = [
        {name: "Breakfast", price: 69.99},
        {name: "Dinner", price: 21},
        {name: "Brick", price: 0},
        {name: "Toast", price: 4382749832743},
        {name: "water", price: 1},
        {name: "half eaten mouldy bread", price: -9999},
    ];
</script>

<AnnouncementBanner />
<a href="/annoucements" use:link style="float: right">Learn More</a>

<div class="spacer"></div>

<h2>Menu</h2>
<MenuList {items} />
<a href="/menu" use:link style="float: right">See All</a>

<div class="spacer"></div>

<h2>About Us</h2>
<p>Want to know the story of the restaurant?</p>
<a href="/about" use:link style="float: right">Continue reading</a>

<style lang="scss">
    h2 {
        margin-bottom: 16px;
    }
    .spacer {
        height: 100px;
    }
</style>
