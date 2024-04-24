<script>
    import { ArrowClockwise } from "phosphor-svelte";
    import MenuList from "%/pages/elements/MenuList.svelte";
    import DropDown from "%/components/DropDown.svelte";
    import Items from '%/testData.js';

    let items = Items;
</script>

<div class="menu">
    <div class="menu-filter">
        <div class="menu-filter-header">
            <h2>Filters</h2>
            <button><ArrowClockwise /></button>
        </div>
        <hr>

        <div class="menu-filter-section">
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
        </div>

        <hr>

        <div class="menu-filter-section">
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
        </div>

        <hr>

        <div class="menu-filter-section">
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
        </div>
        <hr>

        <div class="menu-filter-section">
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
                </ul>
            </DropDown>
        </div>
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
    @import "%/styles/vars";

    h2 {
        margin-bottom: $spacing-small;
    }
    .spacer {
        height: $spacing-large;
    }

    .menu {
        display: flex;
        flex-direction: row;
        justify-content: normal;
        align-items: flex-start;
    }

    .menu-list {
        padding-left: $spacing-normal;
    }

    .menu-filter {
        width: 100%;
        max-width: calc(300px - $spacing-normal);

        position: sticky;
        top: calc($sizing-navigation-height + $spacing-normal);

        border-radius: $border-radius-normal;
        background-image: url('/BackgroundTextureAlt.svg');
        background-repeat: no-repeat;
        background-size: 200px 250px;
        background-position: 5px -43px;
        background-color: $color-light;
        color: $color-on-light;

        h2 {
            margin-bottom: 0;
        }

        hr {
            height: 1px;
            border: 0 transparent;
            background-color: rgba($color-dark, 0.1);
        }

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

        .menu-filter-header {
            padding: $spacing-normal;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }

        .menu-filter-section {
            padding: $spacing-normal;
        }
    }

    @media only screen and (max-width: 670px) {
        .menu {
            flex-direction: column;
        }

        .menu-list {
            padding-left: 0;
            padding-top: $spacing-normal;
        }

        .menu-filter {
            max-width: unset;
            position: unset;
        }
    }
</style>
