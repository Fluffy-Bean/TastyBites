<script lang="ts">
    import { CaretDown } from "phosphor-svelte";

    export let open = false;
    export let name: string;
</script>

<div class="dropdown" class:open={open}>
    <button class="dropdown-header" on:click={() => { open = !open }}>
        <span class="dropdown-text">{name}</span>
        <span class="dropdown-button"><CaretDown /></span>
    </button>
    <div class="dropdown-content">
        <slot></slot>
    </div>
</div>

<style lang="scss">
    @import "../styles/vars";

    .dropdown {
        border-bottom: 1px solid transparent;

        color: $color-on-light;

        .dropdown-header {
            padding: $spacing-normal;

            width: 100%;

            position: relative;

            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            border: 0 solid transparent;
            background-color: transparent;

            .dropdown-text {
                font-size: $font-size-h6;
                font-weight: $font-weight-bold;
            }

            .dropdown-button {
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
            }

            &:hover, &:focus-visible {
                .dropdown-button {
                    color: $color-primary;
                    outline: 0 solid transparent;
                    transform: rotate(-15deg);
                }
            }
        }

        .dropdown-content {
            padding: 0 $spacing-normal $spacing-normal;
            display: none;
        }

        &.open {
            .dropdown-header {
                .dropdown-button {
                    transform: rotate(-180deg);
                }

                &:hover, &:focus-visible {
                    .dropdown-button {
                        transform: rotate(calc(-180deg + 15deg));
                    }
                }
            }
            .dropdown-content {
                display: block;
            }
        }
    }

</style>
