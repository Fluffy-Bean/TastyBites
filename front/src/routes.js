import { wrap } from "svelte-spa-router/wrap";
import PageLoading from "%/pages/PageLoading.svelte";
import Page404 from "%/pages/Page404.svelte";

const routes = {
    "/": wrap({
        asyncComponent: () => import("%/pages/PageIndex.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true },
    }),
    "/menu": wrap({
        asyncComponent: () => import("%/pages/PageMenu.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true },
    }),
    "/contact": wrap({
        asyncComponent: () => import("%/pages/PageContact.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true },
    }),
    "/about": wrap({
        component: PageLoading,
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true },
    }),
    "/cart": wrap({
        asyncComponent: () => import("%/pages/PageCart.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true },
    }),
    '*': wrap({
        component: Page404,
        conditions: [],
        userData: { showNavBar: false },
    })
}

export default routes;
