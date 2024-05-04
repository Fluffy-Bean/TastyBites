import { wrap } from "svelte-spa-router/wrap";

import PageLoading from "./pages/PageLoading.svelte";
import Page404 from "./pages/Page404.svelte";
import Page500 from "./pages/Page500.svelte";

const routes = {
    "/": wrap({
        asyncComponent: () => import("./pages/PageIndex.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/menu": wrap({
        asyncComponent: () => import("./pages/PageMenu.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: true },
    }),
    "/item/:uuid": wrap({
        asyncComponent: () => import("./pages/PageItem.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: true },
    }),
    "/contact": wrap({
        asyncComponent: () => import("./pages/PageContact.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/about": wrap({
        component: PageLoading,
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/cart": wrap({
        asyncComponent: () => import("./pages/PageCart.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/ForOhFor": wrap({
        component: Page404,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "/ServerError": wrap({
        component: Page500,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
    "*": wrap({
        component: Page404,
        conditions: [],
        userData: { showNavBar: true, fullWidth: false },
    }),
};

export default routes;
