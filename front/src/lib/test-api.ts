import type {CartItem, Item} from './types';
import TestData from './test-data';


let cache = {
    announcement_banner: undefined,
    popular_today: undefined,
};


// @ts-ignore
async function fakeDelay(timeout: number = 1000) {
    // @ts-ignore
    await new Promise((resolve: TimerHandler) => setTimeout(resolve, timeout));
}


export async function getAnnouncements(): Promise<{image: string}> {
    if (cache.announcement_banner) {
        return cache.announcement_banner;
    }
    const data = {
        image: "/BannerExampleImage.jpg",
    };
    cache.announcement_banner = data;

    await fakeDelay(200)

    return data;
}


export async function getPopularToday(): Promise<Item[]> {
    if (cache.popular_today) {
        return cache.popular_today;
    }
    const data: Item[] = TestData;
    cache.popular_today = data;

    await fakeDelay(200)

    return data;
}


export async function getMenuItems() {
    const data = [
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
    await fakeDelay(20)
    return data;
}


export async function getItemsByUUID(items: string[]): Promise<Item[] | Error> {
    let data: Item[] = [];

    TestData.forEach((itemInDatabase: Item) => {
        items.forEach((itemInRequest) => {
            if (itemInDatabase.uuid === itemInRequest) {
                data.push(itemInDatabase);
            }
        });
    });

    await fakeDelay(200)

    if (data.length < 0) {
        throw new Error("Resource could not be found");
    }

    return data;
}


export async function getItemByUUID(uuid: string): Promise<Item | Error> {
    let data: Item[] | Error = await getItemsByUUID([uuid]);

    if (data instanceof Error) {
        throw new Error("Resource could not be found");
    }
    if (data.length != 1) {
        throw new Error("Resource could not be found");
    }

    return data[0];
}


export async function postContactEmail(name: string, email: string, message: string): Promise<string | Error> {
    await fakeDelay(200)

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

export async function postVerifyCart(currentCartData: CartItem[]): Promise<CartItem[] | Error> {
    if (currentCartData.length <= 0) {
        return [];
    }

    let itemUUIDs: string[] = currentCartData.map((item) => item.uuid);
    let verifiedItems: Item[] | Error = await getItemsByUUID(itemUUIDs);

    if (verifiedItems instanceof Error) {
        return new Error("Could not collect new cart information");
    }

    let newCartData: CartItem[] = [];
    currentCartData.forEach((currentItem) => {
        let data: Item;
        verifiedItems.forEach((verifiedItem) => {
            if (verifiedItem.uuid === currentItem.uuid) {
                data = verifiedItem;
            }
        })

        if (data) {
            newCartData.push({
                uuid: currentItem.uuid,
                amount: currentItem.amount,
                data: data,
            });
        }
    });

    return newCartData;
}
