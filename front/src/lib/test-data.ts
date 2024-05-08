import { type Item, Labels } from "./types";

const TestData: Item[] = [
    {
        uuid: "soap",
        name: "Bar of Soap",
        price: 69.99,
        description: `
Example
        `,
        labels: [Labels.vegan, Labels.spicy],
    },
    {
        uuid: "sock",
        name: "Sock",
        price: 21,
        description: `
Example
        `,
        labels: [Labels.vegan, Labels.fish, Labels.nut, Labels.spicy],
    },
    {
        uuid: "brick",
        name: "Brick",
        price: 0,
        description: `
Example
        `,
        labels: [Labels.spicy],
    },
    {
        uuid: "toast",
        name: "Toast",
        price: 4382749832743,
        description: `
Example
        `,
        labels: [Labels.gluten],
    },
    {
        uuid: "water",
        name: "water",
        price: 1,
        description: `
Example
        `,
        labels: [Labels.fish],
    },
    {
        uuid: "mouldy_bread",
        name: "half eaten mouldy bread",
        price: -99,
        description: `
Example
        `,
        labels: [Labels.nut],
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
        description: `
This is a sample description. Gay Balls.

Contains the following:
- hog
- melon
        `,
        labels: [Labels.nut, Labels.gluten, Labels.spicy, Labels.fish],
        images: ["/item_images/wathog.jpg","/item_images/sonichog.jpg"],
    },
    {
        uuid: "bluhog",
        name: "Blue HOGGGGG",
        price: 0,
        description: `
This is a sample description.

Gay Balls
        `,
        labels: [Labels.nut, Labels.gluten, Labels.spicy],
        images: ["/item_images/sonichog.jpg"],
    },
];

export default TestData;
