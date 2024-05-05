export enum Labels {
    vegan = "VEGAN",
    fish = "FISH",
    nut = "NUT",
    spicy = "SPICY",
    gluten = "GLUTEN",
}

export interface Item {
    uuid: string;
    name: string;
    price: number;
    labels: Labels[];
    description?: string;
    images?: string[];
}


export interface CartItem {
    amount: number;
    data: Item;
}
