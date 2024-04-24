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
        //padding: $spacing-normal;
        border-bottom: 1px solid transparent;

        //background-color: $color-light;
        color: $color-on-light;

        .dropdown-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            p {
                font-size: $font-size-h5;
                font-weight: $font-weight-bold;
            }

            button {
                height: 25px;
                width: 30px;

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
            //padding-top: $spacing-small;
            display: none;
        }

        &.open {
            .dropdown-header {
                padding-bottom: $spacing-small;
                //border-bottom: 1px solid rgba($color-dark, 0.1);

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
