import { get, writable } from "svelte/store";

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

    function addToCart(uuid: string, amount: number) {
        let found = false;

        get(cart).forEach((item) => {
            if (item.uuid === uuid) {
                item.amount += amount;
                found = true;
            }
        });

        if (!found) {
            cart.update((cart) => [...cart, {uuid:uuid,amount:amount}]);
        }

        // Remove items that have an amount of 0 or lower
        cart.update((cart) => cart.filter((item) => item.amount > 0))
    }

    function getLength() {
        return get(cart).length;
    }

    function getByUUID(uuid: string) {
        get(cart).forEach((item) => {
            if (item.uuid === uuid) {
                return item;
            }
        })
        return {};
    }

    function removeByUUID(uuid: string) {
        cart.update((cart) => cart.filter((item) => item.uuid !== uuid))
    }

    return {
        ...cart,
        addToCart,
        getLength,
        getByUUID,
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
