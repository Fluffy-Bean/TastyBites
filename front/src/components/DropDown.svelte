<script>
    import { CaretDown } from "phosphor-svelte";

    export let open = false;
    export let name;
</script>

<div class="dropdown" class:open={open}>
    <div class="dropdown-header">
        <p>{name}</p>
        <button on:click={() => { open = !open }}>
            <CaretDown />
        </button>
    </div>
    <div class="dropdown-content">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    @import "%/styles/vars";

    .dropdown {
        border-bottom: 1px solid transparent;

        color: $color-on-light;

        .dropdown-header {
            padding: $spacing-normal;

            position: relative;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            p {
                font-size: $font-size-h5;
                font-weight: $font-weight-bold;
            }

            button {
                padding: 0;

                height: 100%;
                width: 60px;

                position: absolute;
                top: 0;
                right: 0;

                display: flex;
                justify-content: center;
                align-items: center;

                text-decoration: none;
                font-size: $font-size-p;

                border: 0 solid transparent;
                background-color: transparent;
                color: $color-on-light;

                transition: transform 0.1s ease-in-out;

                &:hover {
                    color: $color-primary;
                }
            }
        }

        .dropdown-content {
            padding: 0 $spacing-normal $spacing-normal;
            display: none;
        }

        &.open {
            .dropdown-header {
                //padding: $spacing-normal $spacing-normal $spacing-small;

                button {
                    transform: rotate(-180deg);
                }
            }
            .dropdown-content {
                display: block;
            }
        }
    }

</style>
