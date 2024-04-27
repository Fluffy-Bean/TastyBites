import Items from '%/lib/test-data.js';

async function fakeDelay(timeout = 1000) {
    await new Promise(resolve => setTimeout(resolve, timeout));
}

export async function getAnnouncements() {
    const data = {
        image: "/BannerExampleImage.jpg",
    };
    await fakeDelay(2000)
    return data;
}

export async function getPopularToday() {
    const data = Items;
    await fakeDelay(2000)
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
    await fakeDelay(2000)
    return data;
}
