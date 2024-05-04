import { type Writable, get, writable } from "svelte/store";

import { type CartItem, type Item } from "./types";
import { getItemByUUID, postVerifyCart } from "./test-api";

// Load content from localstorage
let local: Record<string, CartItem> = {};
try {
    await postVerifyCart(JSON.parse(localStorage.getItem("basket")))
        .then((data: Record<string, CartItem>) => {
            local = data;
            console.log(data);
        })
        .catch((error) => {
            throw error; // Hot potato style
        });
} catch {
    console.error("Failed to load cart");
}

// Store function
function createCartStore() {
    const cart: Writable<Record<string, CartItem>> = writable(local);

    async function addToCart(uuid: string, amount: number) {
        if (get(cart)[uuid] !== undefined) {
            cart.update((cart: Record<string, CartItem>) => {
                cart[uuid].amount += amount;
                return cart;
            });
        } else {
            await getItemByUUID(uuid).then((data: Item) => {
                cart.update((cart: Record<string, CartItem>) =>
                    Object.assign({}, cart, {
                        [uuid]: {uuid, amount, data},
                    })
                );
            });
        }

        cart.update((cart: Record<string, CartItem>) => {
            if (cart[uuid].amount <= 0) {
                delete cart[uuid]; // skipcq: JS-0320
            }
            return cart;
        });
    }

    function getEntries(): [string, CartItem][] {
        return Object.entries(get(cart));
    }

    function getUniqueLength(): number {
        return Object.keys(get(cart)).length;
    }

    function getTotalLength(): number {
        let totalCartSize = 0;
        Object.values(get(cart)).forEach((item: CartItem) => {
            totalCartSize += item.amount;
        });
        return totalCartSize;
    }

    function getTotalPrice(): number {
        let totalCartPrice = 0;
        Object.values(get(cart)).forEach((item: CartItem) => {
            totalCartPrice += item.amount * item.data.price;
        });
        return totalCartPrice;
    }

    function removeByUUID(uuid: string) {
        cart.update((cart) => {
            delete cart[uuid];  // skipcq: JS-0320
            return cart;
        });
    }

    return {
        ...cart,
        addToCart,
        getEntries,
        getUniqueLength,
        getTotalLength,
        getTotalPrice,
        removeByUUID,
    };
}

// Create store
const Cart = createCartStore();

// Make sure to update localstorage on any changes
Cart.subscribe((value) => {
    localStorage.setItem("basket", JSON.stringify(value));
});

// Debug
Cart.subscribe((value) => {
    console.log(value);
});

export default Cart;
