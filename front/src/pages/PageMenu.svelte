<script>
    import { ArrowClockwise } from "phosphor-svelte";
    import MenuList from "%/pages/components/MenuList.svelte";
    import LoadingBar from "%/pages/components/LoadingBar.svelte";

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
            // image: "/dab.jpg",
        }
    ];
</script>

<div class="menu">
    <div class="menu-filter">
        <LoadingBar />

        <div class="menu-filter-header">
            <h2>Filter</h2>
            <button><ArrowClockwise /></button>
        </div>

        <hr>

        <h3>Meal Preferences</h3>
        <ul>
            <li>Vegan</li>
            <li>Vegetarian</li>
            <li>Pescatarian</li>
        </ul>

        <hr>

        <h3>Allergies</h3>
        <ul>
            <li>Nut</li>
            <li>Sea</li>
            <li>Dairy</li>
        </ul>

        <hr>

        <h3>Types</h3>
        <ul>
            <li>Breakfast</li>
            <li>Main</li>
            <li>Dinner</li>
            <li>
                Drinks
                <ul>
                    <li>Alcoholic</li>
                    <li>Non-Alcoholic</li>
                </ul>
            </li>
            <li>Sides</li>
            <li>Sweet</li>
        </ul>

        <hr>

        <h3>Other</h3>
        <ul>
            <li>Hide Seasonal</li>
            <li>Hide Unavailable</li>
        </ul>

        <hr>

        <label>
            Price
            <input type="range" min="0" max="999">
        </label>
    </div>

    <div class="menu-list">
        <h2>Main Menu</h2>
        <MenuList items={items} />
        <div class="spacer"></div>

        <h2>Pies</h2>
        <MenuList items={items} />
        <div class="spacer"></div>

        <h2>Drinks</h2>
        <MenuList items={items} />
    </div>
</div>

<style lang="scss">
    h2 {
        margin-bottom: 16px;
    }
    .spacer {
        height: 32px;
    }

    .menu {
        display: flex;
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
    }

    .menu-list {
        //padding-left: 300px;
        padding-left: 16px;
    }

    .menu-filter {
        padding: 16px;

        width: 100%;
        max-width: calc(300px - 16px);

        position: sticky;
        top: calc(55px + 16px);

        //position: absolute;
        //top: 16px;
        //left: 16px;

        border-radius: 5px;
        background-color: #fffbf4;
        color: #33251a;

        h2 {
            margin-bottom: 0;
        }

        hr {
            margin: 16px -16px;
            height: 1px;
            border: 0 transparent;
            background-color: rgba(#443023, 0.1);
        }

        button {
            height: 32px;
            width: 32px;

            display: flex;
            justify-content: center;
            align-items: center;

            //position: absolute;
            //top: 12px;
            //right: 12px;

            text-decoration: none;
            font-size: 16px;

            border-radius: 99999px;
            border: 0 solid transparent;
            background-color: #443023;
            color: #e1dcd3;

            &:hover {
                background-color: #6A9343;
                color: #fffbf4;
            }
        }
    }

    .menu-filter-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>
