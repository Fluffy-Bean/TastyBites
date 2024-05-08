import type { Item } from "./types";
import { Labels } from "./types";

const TestData: Item[] = [
    {
        uuid: "soap",
        name: "Bar of Soap",
        price: 69.99,
        labels: [Labels.vegan, Labels.spicy],
        description: "Example",
    },
    {
        uuid: "sock",
        name: "Sock",
        price: 21,
        labels: [Labels.vegan, Labels.fish, Labels.nut, Labels.spicy],
        description: "Example",
    },
    {
        uuid: "brick",
        name: "Brick",
        price: 0,
        labels: [Labels.spicy],
        description: "Example",
    },
    {
        uuid: "toast",
        name: "Toast",
        price: 4382749832743,
        labels: [Labels.gluten],
        description: "Example",
    },
    {
        uuid: "water",
        name: "water",
        price: 1,
        labels: [Labels.fish],
        description: "Example",
    },
    {
        uuid: "mouldy_bread",
        name: "half eaten mouldy bread",
        price: -99,
        labels: [Labels.nut],
        description: "Example",
    },
    {
        uuid: "gwagwa",
        name: "GwaGwa",
        price: 69,
        labels: [Labels.nut],
        images: ["/item_images/dab.jpg"],
    },
    {
        uuid: "hogmelon",
        name: "Hogermellon",
        price: 1111,
        labels: [Labels.fish],
        images: ["/item_images/wathog.jpg"],
        description: "Example",
    },
    {
        uuid: "bluhog",
        name: "Blue HOGGGGG",
        price: 0,
        labels: [Labels.nut, Labels.gluten, Labels.spicy],
        images: ["/item_images/sonichog.jpg"],
        description: "Example",
    },
];

export default TestData;
