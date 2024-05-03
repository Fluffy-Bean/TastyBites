import { get, writable } from "svelte/store";

import type { CartItem } from './types';
import { getItemByUUID } from "./test-api";


// Load content from localstorage
let local = [];
try {
    local = JSON.parse(localStorage.getItem("basket")) || []
} catch {
    console.error("Failed to load cart")
}

// Store function
function createCartStore() {
    const cart = writable(local);

    async function addToCart(uuid: string, amount: number) {
        let found = false;

        get(cart).forEach((item: CartItem) => {
            if (item.uuid === uuid) {
                item.amount += amount;
                found = true;
            }
        });

        if (!found) {
            const newItem: CartItem = {
                uuid: uuid,
                amount: amount,
                data: await getItemByUUID(uuid),
            };
            cart.update((cart: CartItem[]) => [...cart, newItem]);
        }

        // Remove items that have an amount of 0 or lower
        cart.update((cart) => cart.filter((item) => item.amount > 0))
    }

    function getUniqueLength() {
        return get(cart).length;
    }

    function getTotalLength() {
        let amounts = get(cart).map((item) => item.amount);
        return amounts.reduce((a, b) => a + b, 0);
    }

    function getTotalPrice() {
        let price = 0;
        get(cart).forEach((item) => {
            price += item.amount * item.data.price;
        })
        return price;
    }

    function removeByUUID(uuid: string) {
        cart.update((cart) => cart.filter((item) => item.uuid !== uuid))
    }

    return {
        ...cart,
        addToCart,
        getUniqueLength,
        getTotalLength,
        getTotalPrice,
        removeByUUID,
    }
}

// Create store
const Cart = createCartStore();

// Make sure to update localstorage on any changes
Cart.subscribe((value) => {
    localStorage.setItem("basket", JSON.stringify(value));
});

export default Cart;
