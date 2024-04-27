<script>
    import MenuList from "%/components/MenuList.svelte";
    import LoadingImage from "/MenuItemLoading.svg";
    import Items from '%/lib/testData.js';

    let items = Items;

    export let params = {};
</script>

<div class="main">
    <div class="images">
        <div>
            <img src={LoadingImage} alt="">
        </div>
        <ul>
            <li><img src={LoadingImage} alt=""></li>
            <li><img src={LoadingImage} alt=""></li>
            <li><img src={LoadingImage} alt=""></li>
            <li><img src={LoadingImage} alt=""></li>
            <li><img src={LoadingImage} alt=""></li>
        </ul>
    </div>
    <div class="info">
        <h2>{params.name}</h2>
    </div>
</div>

<div class="spacer"></div>
<div class="other">
    <h2>Popular</h2>
    <MenuList items={items} />
</div>

<style lang="scss">
    @import "%/styles/vars";

    h2 {
        margin-bottom: $spacing-small;
    }
    .spacer {
        height: $spacing-large;
    }

    .main {
        display: flex;
        flex-direction: row;

        .images {
            display: flex;
            flex-direction: column;

            > div {
                margin-bottom: $spacing-small;

                width: 650px;
                height: 500px;

                display: flex;
                justify-content: center;
                align-items: center;

                //border-radius: $border-radius-large;
                //background-color: $color-light;

                overflow: hidden;

                > img {
                    max-width: 650px;
                    max-height: 500px;

                    border-radius: $border-radius-normal;
                }
            }

            > ul {
                margin: 0;
                padding: 0;

                display: flex;
                flex-direction: row;

                > li {
                    list-style: none;

                    > img {
                        margin-right: $spacing-small;
                        width: 100px;
                        border-radius: $border-radius-normal;
                    }
                }
            }
        }
    }

    .other {
        margin: 0 auto;
        max-width: $sizing-default-width;
    }
</style>