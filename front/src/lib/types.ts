export interface Item {
    uuid: string,
    name: string,
    price: number,
    detail?: string,
    labels: Labels[],
    image?: string,
}

export enum Labels {
    vegan = "VEGAN",
    fish = "FISH",
    nut = "NUT",
    spicy = "SPICY",
    gluten = "GLUTEN",
}
