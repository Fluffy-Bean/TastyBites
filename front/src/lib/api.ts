import { type Item, type JSONResponse } from "./types";
import TestData from "./test-data";

const API_URL = "http://127.0.0.1:8080";

export async function getPopularToday(): Promise<Item[]> {
    const response = await fetch(API_URL + "/api/items");
    const {data, error}: JSONResponse = await response.json();

    if (response.ok) {
        if (data?.item) {
            return data?.item;
        } else {
            return Promise.reject(new Error("Failed to fetch popular today"))
        }
    } else {
        return Promise.reject(error)
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
