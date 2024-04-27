import Items from '%/lib/testData.js';

export async function getPopularToday() {
    const res = await fetch("/api/items")
    const data = res.json()

    if (res.ok) {
        return data
    } else {
        throw new Error("Failed to fetch popular today")
    }
}

export function getMenuItems() {
    return [
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
}
