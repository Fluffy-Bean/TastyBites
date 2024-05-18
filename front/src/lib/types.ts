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

export type CartRecord = Record<string, CartItem>;

export type Checkout = {
    personal: {
        name: string;
        email: string;
        phone?: number;
    };
    message: string;
    delivery: boolean;
    address: {
        line1: string;
        line2?: string;
        town: string;
        postcode: string;
    };
};

export type JSONResponse = {
    data?: {
        item: Item[]; // Todo Make this not just item type
    };
    error?: string;
};
