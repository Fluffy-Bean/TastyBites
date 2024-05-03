export enum Labels {
    vegan = "VEGAN",
    fish = "FISH",
    nut = "NUT",
    spicy = "SPICY",
    gluten = "GLUTEN",
}

export interface Item {
    uuid: string,
    name: string,
    price: number,
    detail?: string,
    labels: Labels[],
    image?: string,
}

// UUID is stored in both Item and CartItem, this isn't the best, I don't like it
// But it's the simplest way of doing this shit
export interface CartItem {
    uuid: string,
    amount: number,
    data: Item,
}
