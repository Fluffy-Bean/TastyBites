import { type CartItem, type Item } from "./types";
import TestData from "./test-data";

const cache = {};

async function fakeDelay(timeout = 1000) {
    await new Promise((resolve: TimerHandler) => setTimeout(resolve, timeout));
}

export async function getAnnouncements(): Promise<{ image: string }> {
    if (cache["announcement_banner"] === undefined) {
        cache["announcement_banner"] = {
            image: "/banner_images/BannerExampleImage.jpg",
        };
        await fakeDelay(2000);
    }
    return cache["announcement_banner"];
}

export async function getPopularToday(): Promise<Item[]> {
    if (cache["popular_today"] === undefined) {
        cache["popular_today"] = TestData;
        await fakeDelay(2000);
    }
    return cache["popular_today"];
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
    const data: Item[] = [];

    TestData.forEach((itemInDatabase: Item) => {
        items.forEach((itemInRequest) => {
            if (itemInDatabase.uuid === itemInRequest) {
                data.push(itemInDatabase);
            }
        });
    });

    if (data.length === 0) throw new Error("Resource could not be found");

    await fakeDelay(2000);
    return data;
}

export async function getItemByUUID(uuid: string): Promise<Item> {
    const data = await getItemsByUUID([uuid]);
    if (data.length !== 1) throw new Error("Resource could not be found");
    return data[0];
}

export async function postContactEmail(
    name: string,
    email: string,
    reason: string,
    message: string
): Promise<string> {
    await fakeDelay(2000);

    if (!name) throw new Error("Name missing");
    if (!email) throw new Error("Email missing");
    if (!reason) throw new Error("Reason missing");
    if (!message) throw new Error("Message missing");
    if (message.length < 150) throw new Error("Message FUCKED");

    return "Check your email to confirm the message!";
}

export async function postVerifyCart(
    cartData: Record<string, CartItem>
): Promise<Record<string, CartItem>> {
    let verifiedItems: Item[] = [];

    try {
        verifiedItems = await getItemsByUUID(Object.keys(cartData));
    } catch (error) {
        throw new Error(error);
    }

    const newCartData: Record<string, CartItem> = {};

    Object.entries(cartData).forEach(([uuid, currentData]) => {
        verifiedItems.forEach((verifiedItem: Item) => {
            if (verifiedItem.uuid === uuid) {
                newCartData[uuid] = {
                    amount: currentData.amount,
                    data: verifiedItem,
                };
            }
        });
    });

    await fakeDelay(1);
    return newCartData;
}
