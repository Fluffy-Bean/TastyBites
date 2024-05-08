import { type Writable, get, writable } from "svelte/store";

import { type CartItem, type Item } from "./types";
import { getItemByUUID, postVerifyCart } from "./test-api";

function createCartStore() {
    let loaded = false;

    const cart: Writable<Record<string, CartItem>> = writable({});

    async function init() {
        let localData: Record<string, CartItem> = {};
        try {
            localData = JSON.parse(localStorage.getItem("basket")) || {};
        } catch {
            console.error("Local Cart data fucked");
        }

        try {
            const newData: Record<string, CartItem> = await postVerifyCart(localData);
            cart.set(newData);
        } catch (error) {
            console.error("Could not load basket:", error);
        }

        loaded = true;
    }

    async function addToCart(uuid: string, amount: number) {
        if (!loaded) {
            return
        }

        if (get(cart)[uuid] !== undefined) {
            cart.update((cart: Record<string, CartItem>) => {
                cart[uuid].amount += amount;
                return cart;
            });
        } else {
            await getItemByUUID(uuid).then((data: Item) => {
                cart.update((cart: Record<string, CartItem>) =>
                    Object.assign({}, cart, {
                        [uuid]: { uuid, amount, data },
                    })
                );
            });
        }

        cart.update((cart: Record<string, CartItem>) => {
            if (cart[uuid].amount <= 0) {
                delete cart[uuid]; // skipcq: JS-0320
            } else if (cart[uuid].amount > 99) {
                cart[uuid].amount = 99; // skipcq: JS-0320
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
        if (!loaded) {
            return
        }

        cart.update((cart) => {
            delete cart[uuid]; // skipcq: JS-0320
            return cart;
        });
    }

    return {
        ...cart,
        init,
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
export const cartLoaded = Cart.init()

// Make sure to update localstorage on any changes
Cart.subscribe((value) => {
    localStorage.setItem("basket", JSON.stringify(value));
});

export default Cart;
