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

    function addToCart(item: any) {
        cart.update((cart) => [...cart, item]);
    }

    function getLength() {
        return get(cart).length;
    }

    function removeByUUID(uuid: string) {
        cart.update((cart) => cart.filter((item) => item.uuid !== uuid))
    }

    return {
        ...cart,
        addToCart,
        getLength,
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
