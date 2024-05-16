<script lang="ts">
    export let image: string;
    export let toRight = false;
</script>

<div class="image-with-text" class:toRight={toRight}>
    <img src={image} alt="With Text">

    <div class="container">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    @import "../styles/vars";

    .image-with-text {
        display: flex;
        flex-direction: row;
        align-items: center;

        > img {
            margin-right: $spacing-normal;

            max-width: 500px;
            max-height: 350px;

            border-radius: $border-radius-large;

            box-shadow: 0 1px 0.5px rgba(#000, 0.3);
        }

        > .container {
            width: 100%;
        }

        &.toRight {
            flex-direction: row-reverse;

            > img {
                margin-right: 0;
                margin-left: $spacing-normal;
            }
        }
    }
</style>