export enum Labels {
    vegan = "VEGAN",
    fish = "FISH",
    nut = "NUT",
    spicy = "SPICY",
    gluten = "GLUTEN",
}

export type Item = {
    uuid: string;
    availability?: boolean;
    name: string;
    price: number;
    description: string;
    labels?: Labels[];
    images?: string[];
};

export type CartItem = {
    amount: number;
    data: Item;
};

export type JSONResponse = {
    data?: any; // Todo make this _not_ an any
    error?: string;
};
