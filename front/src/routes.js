import { wrap } from "svelte-spa-router/wrap";

import PageLoading from "./pages/Loading.svelte";
import Page404 from "./pages/404.svelte";

const routes = {
    "/": wrap({
        asyncComponent: () => import("./pages/Index.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/menu": wrap({
        asyncComponent: () => import("./pages/Menu.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: true },
    }),
    "/item/:uuid": wrap({
        asyncComponent: () => import("./pages/Item.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: true },
    }),
    "/contact": wrap({
        asyncComponent: () => import("./pages/Contact.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/about": wrap({
        asyncComponent: () => import("./pages/About.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/cart": wrap({
        asyncComponent: () => import("./pages/Cart.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/cart/checkout": wrap({
        component: Page404,
        conditions: [],
        userData: { showNavBar: false, fullWidth: true },
    }),
    "/booking": wrap({
        asyncComponent: () => import("./pages/Booking.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: true },
    }),
    "*": wrap({
        component: Page404,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
};

export default routes;
