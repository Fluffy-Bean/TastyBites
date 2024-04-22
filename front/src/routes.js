import { wrap } from "svelte-spa-router/wrap";
import PageLoading from "%/pages/PageLoading.svelte";
import Page404 from "%/pages/Page404.svelte";

const routes = {
    "/": wrap({
        asyncComponent: () => import("%/pages/index/PageIndex.svelte"),
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
    "/cart": wrap({
        asyncComponent: () => import("%/pages/PageShoppingCart.svelte"),
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
