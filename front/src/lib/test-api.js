import Items from '%/lib/test-data.js';


let cache = {};


async function fakeDelay(timeout = 1000) {
    await new Promise(resolve => setTimeout(resolve, timeout));
}


export async function getAnnouncements() {
    if (cache.announcement_banner !== undefined) {
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
    if (cache.popular_today !== undefined) {
        return cache.popular_today;
    }

    const data = Items;
    cache.popular_today = data;
    await fakeDelay(200)
    return data;
}


export async function getMenuItems() {
    const data = [
        {
            name: "Main Menu",
            items: Items,
        },
        {
            name: "Breakfast",
            items: [],
        },
        {
            name: "Seasonal",
            items: Items,
        },
    ];
    await fakeDelay(20)
    return data;
}


export async function getItemByUUID(uuid) {
    let data;

    Items.forEach((item) => {
        if (item.uuid === uuid) {
            data = item;
        }
    });

    await fakeDelay(200)

    if (!data) {
        throw new Error("Resource could not be found");
    }

    return data;
}


export async function getItemsByUUID(items) {
    let data = [];

    Items.forEach((itemInDatabase) => {
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


export async function postContactEmail(name, email, message) {
    await fakeDelay(200)

    if (!name) {
        throw new Error("Namey missing");
    }
    if (!email) {
        throw new Error("Emaily missing");
    }
    if (!message) {
        throw new Error("Message missing");
    } else if (message.length < 150) {
        throw new Error("Message FUCKED");
    }

    return "Check your email to confirm the message!";
}
