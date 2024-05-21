import { type Item, Labels } from "./types";

const TestData: Item[] = [
    {
        uuid: "soap",
        availability: true,
        name: "Bar of Soap",
        price: 2.99,
        description: "Example",
        labels: [Labels.vegan, Labels.spicy],
    },
    {
        uuid: "sock",
        availability: true,
        name: "Sock",
        price: 1.99,
        description: "Example",
        labels: [Labels.vegan, Labels.fish, Labels.nut, Labels.spicy],
    },
    {
        uuid: "brick",
        availability: false,
        name: "Brick",
        price: 0,
        description: "Example",
        labels: [Labels.spicy],
    },
    {
        uuid: "toast",
        availability: true,
        name: "Toast",
        price: 3.49,
        description: "Example",
        labels: [Labels.gluten],
    },
    {
        uuid: "water",
        availability: true,
        name: "water",
        price: 1,
        description: "Example",
        labels: [Labels.fish],
    },
    {
        uuid: "mouldy_bread",
        availability: true,
        name: "Singular slice of bread",
        price: 0.39,
        description: "Example",
        labels: [Labels.nut],
    },
    {
        uuid: "cup_cake_leg",
        availability: true,
        name: "Eated Cupcake",
        price: 1.69,
        description: `
aurgh

Contains:
- Single Pringle GwaGwa
- Cupcake with icing eated
`,
        labels: [Labels.nut],
        images: [
            "/item_images/cupcake.jpg",
            "/item_images/cupcake.jpg",
            "/item_images/cupcake.jpg",
        ],
    },
    // {
    //     uuid: "gwagwa",
    //     availability: false,
    //     name: "GwaGwa",
    //     price: 69,
    //     description: `Example`,
    //     labels: [Labels.nut],
    //     images: ["/item_images/dab.jpg"],
    // },
    {
        uuid: "hogmelon",
        availability: true,
        name: "Hogermellon",
        price: 12.99,
        description: `
This is a sample description.

Contains the following:
- hog
- melon
        `,
        labels: [Labels.nut, Labels.gluten, Labels.spicy, Labels.fish],
        images: ["/item_images/wathog.jpg", "/item_images/sonichog.jpg"],
    },
    {
        uuid: "bluhog",
        availability: true,
        name: "Blue HOGGGGG",
        price: 13.99,
        description: `
This is a sample description.

Blue Hog
        `,
        labels: [Labels.nut, Labels.gluten, Labels.spicy],
        images: ["/item_images/sonichog.jpg"],
    },
];

export default TestData;
