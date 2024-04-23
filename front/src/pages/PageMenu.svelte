<script>
    import MenuList from "%/pages/components/MenuList.svelte";

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

<h2>Menu</h2>
<MenuList {items} />
<div class="spacer"></div>

<h2>Menu</h2>
<MenuList {items} />
<div class="spacer"></div>

<h2>Menu</h2>
<MenuList {items} />

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