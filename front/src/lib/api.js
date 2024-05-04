import TestData from "%/lib/test-data.ts";

export async function getPopularToday() {
    const res = await fetch("/api/items");
    const data = res.json();

    if (res.ok) {
        return data;
    } else {
        throw new Error("Failed to fetch popular today");
    }
}

export function getMenuItems() {
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
