export enum Labels {
    vegan = "VEGAN",
    fish = "FISH",
    nut = "NUT",
    spicy = "SPICY",
    gluten = "GLUTEN",
}

export enum TimeSlots {
    slot0 = "8am to 10am",
    slot1 = "10am to 12am",
    slot2 = "12am to 2pm",
    slot3 = "2pm to 4pm",
    slot4 = "4pm to 6pm",
    slot5 = "6pm to 8pm",
    slot6 = "8pm to 10pm",
}
export enum Tables {
    table1 = "Table 1",
    table2 = "Table 2",
    table3 = "Table 3",
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

export type Booking = {
    date: {
        date: Date;
        slot: TimeSlots;
    };
    table: Tables;
    message: string;
    personal: {
        name: string;
        email: string;
        phone?: number;
    };
};

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
