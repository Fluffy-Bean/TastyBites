import type { Item } from './types';
import TestData from './test-data';


let cache = {
    announcement_banner: null,
    popular_today: null,
};


// @ts-ignore
async function fakeDelay(timeout: number = 1000) {
    // @ts-ignore
    await new Promise((resolve: TimerHandler) => setTimeout(resolve, timeout));
}


export async function getAnnouncements() {
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


export async function getPopularToday() {
    if (cache.popular_today) {
        return cache.popular_today;
    }

    const data = TestData;
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


export async function getItemsByUUID(items: string[]) {
    let data = [];

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


export async function getItemByUUID(uuid: string) {
    let data = await getItemsByUUID([uuid]);

    if (data.length != 1) {
        throw new Error("Resource could not be found");
    }

    return data[0];
}


export async function postContactEmail(name: string, email: string, message: string) {
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
