import { type Item, type JSONResponse } from "./types";

const API_URL = "http://127.0.0.1:8080";

export async function getPopularToday(): Promise<Item[]> {
    const response = await fetch(`${API_URL}/api/items`);
    const { data, error }: JSONResponse = await response.json();

    if (response.ok) {
        if (data?.item) {
            return data?.item;
        }
        throw new Error("Failed to fetch popular today");
    }
    throw new Error(error);
}
