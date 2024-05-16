import { type Writable, get, writable } from "svelte/store";

import { type CartRecord, type CartItem, type Item } from "./types";
import { getItemByUUID, postVerifyCart } from "./test-api";

function createCartStore() {
    let loaded = false;

    const cart: Writable<CartRecord> = writable({});

    async function init(): Promise<void> {
        let localData: CartRecord = {};
        try {
            localData = JSON.parse(localStorage.getItem("basket")) || {};
        } catch {
            console.error("Local Cart data could not be parsed");
        }

        try {
            const newData: CartRecord = await postVerifyCart(localData);
            cart.set(newData);
        } catch (error) {
            console.error("Could not load basket:", error);
        }

        loaded = true;
    }

    async function addToCart(uuid: string, amount: number) {
        if (!loaded) return;

        if (get(cart)[uuid] !== undefined) {
            cart.update((cart: CartRecord) => {
                cart[uuid].amount += amount;
                return cart;
            });
        } else {
            await getItemByUUID(uuid).then((data: Item) => {
                cart.update((cart: CartRecord) =>
                    Object.assign({}, cart, {
                        [uuid]: { uuid, amount, data },
                    })
                );
            });
        }

        cart.update((cart: CartRecord) => {
            if (cart.uuid.amount <= 0) delete cart.uuid;
            if (cart.uuid.amount > 99) cart.uuid.amount = 99;
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

    function removeByUUID(uuid: string): void {
        if (!loaded) return;

        cart.update((cart: CartRecord) => {
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
export const cartLoaded = Cart.init();

// Make sure to update localstorage on any changes
Cart.subscribe((value: CartRecord) => {
    localStorage.setItem("basket", JSON.stringify(value));
});

export default Cart;
