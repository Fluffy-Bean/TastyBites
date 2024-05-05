import { type CartItem, type Item } from "./types";
import TestData from "./test-data";

const cache = {};

async function fakeDelay(timeout = 1000) {
    await new Promise((resolve: TimerHandler) => setTimeout(resolve, timeout));
}

export async function getAnnouncements(): Promise<{ image: string }> {
    if (cache["announcement_banner"] !== undefined) {
        return cache["announcement_banner"];
    }
    await fakeDelay(200);

    const data = {
        image: "/BannerExampleImage.jpg",
    };
    cache["announcement_banner"] = data;

    return data;
}

export async function getPopularToday(): Promise<Item[]> {
    if (cache["popular_today"] !== undefined) {
        return cache["popular_today"];
    }
    await fakeDelay(200);

    const data: Item[] = TestData;
    cache["popular_today"] = data;

    return data;
}

export async function getMenuItems(): Promise<
    { name: string; items: Item[] }[]
> {
    await fakeDelay(20);
    return [
        {
            name: "Main Menu",
            items: TestData,
        },
        {
            name: "Breakfast",
            items: [],
        },
        {
            name: "Seasonal",
            items: TestData,
        },
    ];
}

export async function getItemsByUUID(items: string[]): Promise<Item[]> {
    await fakeDelay(200);

    const data: Item[] = [];

    TestData.forEach((itemInDatabase: Item) => {
        items.forEach((itemInRequest) => {
            if (itemInDatabase.uuid === itemInRequest) {
                data.push(itemInDatabase);
            }
        });
    });

    if (data.length === 0) {
        throw new Error("Resource could not be found");
    }

    return data;
}

export async function getItemByUUID(uuid: string): Promise<Item> {
    const data: Item[] = [];

    await getItemsByUUID([uuid])
        .then((result) => {
            if (result.length !== 1) {
                throw new Error("Resource could not be found");
            }
            data.push(...result);
        })
        .catch((error) => {
            throw error;
        });

    return data[0];
}

export async function postContactEmail(
    name: string,
    email: string,
    message: string
): Promise<string> {
    await fakeDelay(200);

    if (!name) {
        throw new Error("Name missing");
    }
    if (!email) {
        throw new Error("Email missing");
    }
    if (!message) {
        throw new Error("Message missing");
    } else if (message.length < 150) {
        throw new Error("Message FUCKED");
    }

    return "Check your email to confirm the message!";
}

export async function postVerifyCart(
    currentCartData: Record<string, CartItem>
): Promise<Record<string, CartItem>> {
    const verifiedItems: Item[] = [];

    await getItemsByUUID(Object.keys(currentCartData))
        .then((data) => {
            verifiedItems.push(...data);
        })
        .catch(() => {
            return new Error("Could not collect new cart information");
        });

    const newCartData: Record<string, CartItem> = {};

    Object.entries(currentCartData).forEach(([uuid, currentData]) => {
        verifiedItems.forEach((verifiedItem: Item) => {
            if (verifiedItem.uuid === uuid) {
                console.log(verifiedItem, uuid);
                newCartData[uuid] = {
                    amount: currentData.amount,
                    data: verifiedItem,
                };
            }
        });
    });

    return newCartData;
}
