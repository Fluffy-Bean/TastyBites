<script>
    import DropDown from "%/components/DropDown.svelte";
</script>

<h1>Contact us</h1>

<div class="menu-filter">
    <div class="menu-filter-header">
        <h2>Commonly Asked Questions</h2>
    </div>
    <hr>

    <div class="menu-filter-section">
        <DropDown name="Can I refund my order?">
            <p>If you ordered online, if we haven't started making your food yet, a refund is possible.</p>
            <p>If you reserved a table, you can refund upto 1 hour before your time.</p>
        </DropDown>
    </div>

    <hr>

    <div class="menu-filter-section">
        <DropDown name="Deez nuts">
            <p>Gottem</p>
        </DropDown>
    </div>
</div>

<div class="spacer"></div>

<h2>Contact From</h2>

<style lang="scss">
    @import "%/styles/vars";

    h1, h2 {
        margin-bottom: $spacing-small;
    }
    .spacer {
        height: $spacing-large;
    }

    .menu-filter {
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
</style>