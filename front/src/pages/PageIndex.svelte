<script>
    import { link } from 'svelte-spa-router';
    import { ArrowUpRight } from "phosphor-svelte";
    import AnnouncementBanner from "%/pages/elements/AnnouncementBanner.svelte";
    import MenuList from "%/pages/elements/MenuList.svelte";

    const items = [
        {
            name: "Breakfast",
            price: 69.99,
            labels: ["vegan", "spicy",],
        },
        {
            name: "Dinner",
            price: 21,
            labels: ["vegan", "fish", "nut", "spicy",],
        },
        {
            name: "Brick",
            price: 0,
            labels: ["spicy",],
        },
        {
            name: "Toast",
            price: 4382749832743,
        },
        {
            name: "water",
            price: 1,
            labels: ["fish"],
        },
        {
            name: "half eaten mouldy bread",
            price: -9999,
            labels: ["nut"],
        },
        {
            name: "GwaGwa",
            price: "Priceless",
            labels: ["nut"],
            image: "/dab.jpg",
        }
    ];
</script>

<div>
    <AnnouncementBanner />
    <a href="/annoucements" use:link style="float: right">Learn More <ArrowUpRight /></a>
    <div class="spacer"></div>

    <h2>Popular Today</h2>
    <MenuList {items} />
    <a href="/menu" use:link style="float: right">See All <ArrowUpRight /></a>
    <div class="spacer"></div>

    <h2>About Us</h2>
    <p>Want to know the story of the restaurant?</p>
    <a href="/about" use:link style="float: right">Continue reading <ArrowUpRight /></a>
</div>

<style lang="scss">
    h2 {
        margin-bottom: 16px;
    }

    .spacer {
        height: 100px;
    }

    a {
        margin-top: 8px;

        padding-left: 10px;
        padding-right: 10px;

        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        text-decoration: none;

        border-radius: 9999px;
        background-color: transparent;
        color: #33251a;

        &:hover {
            background-color: #fffbf4;
            color: #33251a;
        }
    }
</style>
