import type { Item } from './types';
import { Labels } from "./types";

const TestData: Item[] = [
    {
        uuid: "soap",
        name: "Bar of Soap",
        price: 69.99,
        labels: [Labels.vegan, Labels.spicy],
        detail: "Example",
    },
    {
        uuid: "sock",
        name: "Sock",
        price: 21,
        labels: [Labels.vegan, Labels.fish, Labels.nut, Labels.spicy],
        detail: "Example",
    },
    {
        uuid: "brick",
        name: "Brick",
        price: 0,
        labels: [Labels.spicy],
        detail: "Example",
    },
    {
        uuid: "toast",
        name: "Toast",
        price: 4382749832743,
        labels: [Labels.gluten],
        detail: "Example",
    },
    {
        uuid: "water",
        name: "water",
        price: 1,
        labels: [Labels.fish],
        detail: "Example",
    },
    {
        uuid: "mouldy_bread",
        name: "half eaten mouldy bread",
        price: -99,
        labels: [Labels.nut],
        detail: "Example",
    },
    {
        uuid: "gwagwa",
        name: "GwaGwa",
        price: 69,
        labels: [Labels.nut],
        image: "/dab.jpg",
    },
    {
        uuid: "hogmelon",
        name: "Hogermellon",
        price: 1111,
        labels: [Labels.fish],
        image: "/wathog.jpg",
        detail: "Example",
    },
    {
        uuid: "bluhog",
        name: "Blue HOGGGGG",
        price: 0,
        labels: [Labels.nut, Labels.gluten, Labels.spicy],
        image: "/sonichog.jpg",
        detail: "Example",
    },
];

export default TestData;
