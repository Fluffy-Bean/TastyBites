import Items from '%/lib/testData.js';

export function getPopularToday() {
    return Items;
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
