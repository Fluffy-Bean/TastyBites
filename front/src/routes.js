import { wrap } from "svelte-spa-router/wrap";
import PageLoading from "./routes/PageLoading.svelte";
import Page404 from "./routes/Page404.svelte";

const routes = {
    "/": wrap({
        asyncComponent: () => import("./routes/PageIndex.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true },
    }),
    "/contact": wrap({
        asyncComponent: () => import("./routes/PageContact.svelte"),
        loadingComponent: PageLoading,
        conditions: [],
        userData: { showNavBar: true },
    }),
    "/cart": wrap({
        asyncComponent: () => import("./routes/PageShoppingCart.svelte"),
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
