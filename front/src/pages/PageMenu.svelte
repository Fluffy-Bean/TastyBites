<script>
    import { ArrowClockwise } from "phosphor-svelte";

    import { getMenuItems } from "../lib/test-api";
    import LoadingBar from "../components/LoadingBar.svelte";
    import MenuList from "../components/MenuList.svelte";
    import DropDown from "../components/DropDown.svelte";

    let items = getMenuItems();

    function reloadMenu() {
        items = getMenuItems();
    }
</script>

<div class="menu">
    <div class="container" id="filter">
        <div class="header">
            <h2>Filters</h2>
            <button on:click={reloadMenu}><ArrowClockwise /></button>
        </div>
        <hr>
        <DropDown name="Meal Prefrences" open={true}>
            <ul>
                <li>
                    <label>
                        <input type="checkbox">
                        Vegan
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Vegetarian
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Pescatarian
                    </label>
                </li>
            </ul>
        </DropDown>
        <hr>
        <DropDown name="Allergies" open={true}>
            <ul>
                <li>
                    <label>
                        <input type="checkbox">
                        Deez Nut
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Sea
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Dairy
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Gluten
                    </label>
                </li>
            </ul>
        </DropDown>
        <hr>
        <DropDown name="Meal Types" open={true}>
            <ul>
                <li>
                    <label>
                        <input type="checkbox">
                        Breakfast
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Main
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Dinner
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Alcoholic Drinks
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Non-Alcoholic Drinks
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Sides
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Sweet
                    </label>
                </li>
            </ul>
        </DropDown>
        <hr>
        <DropDown name="Other">
            <ul>
                <li>
                    <label>
                        <input type="checkbox">
                        Hide Seasonal
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Hide Unavailable
                    </label>
                </li>
                <li>
                    <label>
                        <input type="checkbox">
                        Hog
                    </label>
                </li>
            </ul>
        </DropDown>
    </div>

    <div id="menu-list">
        {#await items}
            <LoadingBar />
        {:then items}
            {#each items as section}
                <h2>{section.name}</h2>
                {#if section.items.length > 0}
                    <MenuList items={section.items} />
                {:else}
                    <p>No results</p>
                {/if}
                <div class="spacer" />
            {/each}
        {:catch error}
            <p>{error}</p>
        {/await}
    </div>
</div>

<style lang="scss">
    @import "../styles/vars";

    .menu {
        display: flex;
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
    }

    #menu-list {
        margin-left: $spacing-normal;
        width: 100%;
        position: relative;
    }

    #filter {
        min-width: calc(300px - $spacing-normal);
        width: 100%;
        max-width: calc(300px - $spacing-normal);
        position: sticky;
        top: calc($sizing-navigation-height + $spacing-normal);

        button {
            height: 32px;
            width: 32px;

            display: flex;
            justify-content: center;
            align-items: center;

            text-decoration: none;
            font-size: $font-size-p;

            border-radius: $border-radius-circle;
            border: 0 solid transparent;
            background-color: $color-dark;
            color: $color-on-dark;

            &:hover {
                background-color: $color-primary;
                color: $color-on-primary;
            }
        }
    }

    @media only screen and (max-width: 670px) {
        .menu {
            flex-direction: column;
        }

        #filter {
            max-width: unset;
            position: unset;
        }

        #menu-list {
            margin-left: 0;
            margin-top: $spacing-normal;
        }
    }
</style>
