<script lang="ts">
    import { type CartItem } from "../../lib/types";
    import Cart from "../../lib/cart";

    let items: [string, CartItem][];
    let totalPrice: number;

    Cart.subscribe(() => {
        items = Cart.getEntries();
        totalPrice = Cart.getTotalPrice();
    });
</script>

<h1>Checkout > Order</h1>
<div class="container">
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
</div>

<style lang="scss">
    @import "../../styles/vars";

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