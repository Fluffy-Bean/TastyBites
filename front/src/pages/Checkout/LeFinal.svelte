<script lang="ts">
    import { link } from "svelte-spa-router";
    import { SealWarning } from "phosphor-svelte";

    import Cart from "../../lib/cart";

    let items = Cart.getEntries();
    let totalPrice = Cart.getTotalPrice();

    let unavailableItems = false;
    Cart.getEntries().forEach(([_, item]) => {
        if (!item.data.availability) unavailableItems = true;
    });
</script>

<h1>Checkout > Order</h1>
<div class="container">
    {#if unavailableItems}
        <div class="unavailable-items-banner">
            <SealWarning weight="fill" />&nbsp;&nbsp;<span>Order contains an item that is no-longer available</span>
        </div>
    {/if}
    <div class="section small">
        <div class="table">
            <table>
                <tr><th>Price (each)</th><th>Item Name</th><th>Amount</th></tr>
                {#each items as [_, item]}
                    <tr>
                        <td>£{item.data.price * item.amount} (£{item.data.price})</td>
                        <td>{item.data.name}</td>
                        <td>{item.amount}</td>
                    </tr>
                {/each}
            </table>
        </div>
        <div class="spacer half" />

        <p>Total: ${totalPrice}</p>
    </div>
    <hr>
    <div class="section small">
        <p>To make any changes to your order, <a href="/cart" use:link>please go back to your cart</a>.</p>
    </div>
</div>

<style lang="scss">
    @import "../../styles/vars";

    .container {
        overflow: hidden;
    }

    .unavailable-items-banner {
        height: 30px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: $font-size-p;

        background: $color-error;
        color: $color-on-error;

        box-shadow: 0 1px 0.5px rgba(#000, 0.3);
    }

    .table {
        border-radius: $border-radius-normal;
        border: 1px solid rgba($color-dark, 0.3);
        background-color: $color-light;

        overflow: hidden;

        table {
            width: 100%;
            border-collapse: collapse;

            tr {
                border-bottom: 1px solid rgba($color-dark, 0.3);

                &:last-of-type {
                    border: 0 solid transparent;
                }

                th, td {
                    padding: $spacing-xsmall $spacing-small;
                    border-right: 1px solid rgba($color-dark, 0.3);

                    &:last-of-type {
                        border: 0 solid transparent;
                    }
                }

                th {
                    font-weight: $font-weight-bolder;
                }
                td {
                    font-weight: $font-weight-normal;
                }
            }
        }
    }
</style>