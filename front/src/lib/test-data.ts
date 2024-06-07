import { type Item, Labels } from "./types";

const TestData: Item[] = [
    {
        uuid: "organic_apple",
        availability: true,
        name: "Organic Apple",
        price: 0.99,
        description: `
Freshly picked organic apple.

**Story**:
These apples are harvested from our family orchard, which has been lovingly tended for generations. Each apple is handpicked to ensure it meets our high standards.

**Ingredients**:
- 100% organic apple

**Warnings**:
May contain seeds.

**General Information**:
Rich in fiber and vitamins, our organic apples are perfect for a healthy snack.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "quinoa_salad",
        availability: true,
        name: "Quinoa Salad",
        price: 7.49,
        description: `
A healthy quinoa salad with mixed vegetables.

**Story**:
Our quinoa salad is inspired by Mediterranean flavors, combining the freshest ingredients to create a nutritious and satisfying meal.

**Ingredients**:
- Organic quinoa
- Cherry tomatoes
- Cucumbers
- Red onions
- Olive oil
- Lemon juice
- Fresh herbs

**Warnings**:
Contains no allergens.

**General Information**:
High in protein and fiber, this salad is perfect for a light lunch or as a side dish.
        `,
        labels: [Labels.vegan, Labels.gluten, Labels.nut],
    },
    {
        uuid: "avocado_toast",
        availability: true,
        name: "Avocado Toast",
        price: 5.99,
        description: `
Smashed avocado on whole grain bread.

**Story**:
A modern classic, our avocado toast is made with perfectly ripe avocados and freshly baked whole grain bread.

**Ingredients**:
- Whole grain bread
- Organic avocado
- Sea salt
- Lemon juice

**Warnings**:
Contains gluten.

**General Information**:
Rich in healthy fats and fiber, this dish is a great way to start your day.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "berry_smoothie",
        availability: true,
        name: "Berry Smoothie",
        price: 4.99,
        description: `
A refreshing smoothie made with mixed berries.

**Story**:
Our berry smoothie is a favorite among our customers, blending the finest organic berries for a delicious and nutritious drink.

**Ingredients**:
- Strawberries
- Blueberries
- Raspberries
- Almond milk
- Chia seeds

**Warnings**:
Contains nuts (almond milk).

**General Information**:
Packed with antioxidants and vitamins, this smoothie is perfect for a quick and healthy breakfast.
        `,
        labels: [Labels.vegan, Labels.gluten, Labels.nut],
    },
    {
        uuid: "kale_chips",
        availability: true,
        name: "Kale Chips",
        price: 2.49,
        description: `
Crispy baked kale chips with sea salt.

**Story**:
Our kale chips are made from kale grown in our own garden, baked to perfection for a crunchy, guilt-free snack.

**Ingredients**:
- Organic kale
- Olive oil
- Sea salt

**Warnings**:
Contains no allergens.

**General Information**:
A great source of vitamins A, K, and C, these chips are a healthy alternative to traditional snacks.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "chickpea_wrap",
        availability: true,
        name: "Chickpea Wrap",
        price: 6.99,
        description: `
A delicious wrap filled with seasoned chickpeas and vegetables.

**Story**:
Inspired by Mediterranean street food, our chickpea wrap is a customer favorite, combining robust flavors with wholesome ingredients.

**Ingredients**:
- Whole wheat wrap
- Seasoned chickpeas
- Lettuce
- Tomato
- Cucumber
- Tahini sauce

**Warnings**:
Contains gluten and sesame.

**General Information**:
High in protein and fiber, this wrap is both filling and nutritious.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "lentil_soup",
        availability: true,
        name: "Lentil Soup",
        price: 5.49,
        description: `
Hearty lentil soup with carrots and celery.

**Story**:
Our lentil soup is a family recipe passed down through generations, bringing comfort and warmth in every bowl.

**Ingredients**:
- Lentils
- Carrots
- Celery
- Onions
- Garlic
- Vegetable broth
- Spices

**Warnings**:
Contains no allergens.

**General Information**:
Rich in protein and iron, this soup is perfect for a cozy meal.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "hummus_plate",
        availability: true,
        name: "Hummus Plate",
        price: 6.99,
        description: `
Creamy hummus served with fresh vegetables and pita bread.

**Story**:
Our hummus is made fresh daily, using a traditional recipe from the Mediterranean. It's perfect for sharing with friends and family.

**Ingredients**:
- Chickpeas
- Tahini
- Olive oil
- Lemon juice
- Garlic
- Fresh vegetables
- Pita bread

**Warnings**:
Contains gluten and sesame.

**General Information**:
Packed with protein and healthy fats, this dish is a great appetizer or snack.
        `,
        labels: [Labels.vegan, Labels.gluten, Labels.nut],
    },
    {
        uuid: "greek_salad",
        availability: true,
        name: "Greek Salad",
        price: 6.99,
        description: `
Traditional Greek salad with feta cheese, olives, and cucumber.

**Story**:
Our Greek salad is inspired by travels to the Mediterranean, bringing fresh and vibrant flavors to your table.

**Ingredients**:
- Cucumbers
- Tomatoes
- Red onions
- Kalamata olives
- Feta cheese
- Olive oil
- Oregano

**Warnings**:
Contains dairy.

**General Information**:
A refreshing and light salad, perfect as a side dish or a light meal.
        `,
        labels: [Labels.gluten],
    },
    {
        uuid: "overnight_oats",
        availability: true,
        name: "Overnight Oats",
        price: 3.99,
        description: `
Oats soaked overnight in almond milk with chia seeds and berries.

**Story**:
Our overnight oats are a perfect grab-and-go breakfast, inspired by busy mornings and a need for nutritious convenience.

**Ingredients**:
- Rolled oats
- Almond milk
- Chia seeds
- Mixed berries
- Maple syrup

**Warnings**:
Contains nuts (almond milk).

**General Information**:
High in fiber and omega-3 fatty acids, this dish is perfect for a healthy start to your day.
        `,
        labels: [Labels.vegan, Labels.gluten, Labels.nut],
    },
    {
        uuid: "veggie_burger",
        availability: true,
        name: "Veggie Burger",
        price: 8.99,
        description: `
A hearty veggie burger made with black beans and quinoa.

**Story**:
Our veggie burger is crafted from a blend of black beans and quinoa, offering a tasty and filling alternative to traditional burgers.

**Ingredients**:
- Black beans
- Quinoa
- Onions
- Garlic
- Spices
- Whole wheat bun

**Warnings**:
Contains gluten.

**General Information**:
High in protein and fiber, this burger is perfect for a healthy meal without compromising on flavor.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "turmeric_tea",
        availability: true,
        name: "Turmeric Tea",
        price: 2.99,
        description: `
A soothing tea made with turmeric and ginger.

**Story**:
Our turmeric tea is a blend of warming spices, perfect for a relaxing moment any time of day.

**Ingredients**:
- Turmeric
- Ginger
- Honey (optional)
- Lemon

**Warnings**:
Contains no allergens.

**General Information**:
Known for its anti-inflammatory properties, this tea is both delicious and beneficial for your health.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "roasted_almonds",
        availability: true,
        name: "Roasted Almonds",
        price: 3.49,
        description: `
Lightly salted roasted almonds.

**Story**:
Our roasted almonds are a simple yet satisfying snack, roasted in-house to ensure the highest quality.

**Ingredients**:
- Almonds
- Sea salt

**Warnings**:
Contains nuts.

**General Information**:
A great source of protein and healthy fats, these almonds are perfect for snacking on the go.
        `,
        labels: [Labels.vegan, Labels.gluten, Labels.nut],
    },
    {
        uuid: "grilled_vegetables",
        availability: true,
        name: "Grilled Vegetables",
        price: 5.99,
        description: `
Assorted seasonal vegetables grilled to perfection.

**Story**:
Our grilled vegetables are sourced from local farms, ensuring the freshest produce available.

**Ingredients**:
- Bell peppers
- Zucchini
- Eggplant
- Olive oil
- Herbs

**Warnings**:
Contains no allergens.

**General Information**:
A healthy and delicious side dish, perfect for any meal.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "chia_pudding",
        availability: true,
        name: "Chia Pudding",
        price: 4.49,
        description: `
Chia seeds soaked in almond milk, topped with fresh fruit.

**Story**:
Our chia pudding is a delightful dessert that's both nutritious and delicious, inspired by traditional recipes.

**Ingredients**:
- Chia seeds
- Almond milk
- Fresh fruit
- Honey (optional)

**Warnings**:
Contains nuts (almond milk).

**General Information**:
High in omega-3 fatty acids and fiber, this pudding is perfect for a healthy dessert or snack.
        `,
        labels: [Labels.vegan, Labels.gluten, Labels.nut],
    },
    {
        uuid: "spinach_quiche",
        availability: true,
        name: "Spinach Quiche",
        price: 6.49,
        description: `
A savory quiche with spinach and goat cheese.

**Story**:
Our spinach quiche is a family favorite, made with a flaky crust and a rich filling of spinach and goat cheese.

**Ingredients**:
- Spinach
- Goat cheese
- Eggs
- Whole wheat crust
- Onions
- Spices

**Warnings**:
Contains gluten and dairy.

**General Information**:
A delicious and satisfying dish, perfect for brunch or a light dinner.
        `,
        labels: [Labels.gluten],
    },
    {
        uuid: "carrot_ginger_soup",
        availability: true,
        name: "Carrot Ginger Soup",
        price: 4.99,
        description: `
A warming soup made with carrots and fresh ginger.

**Story**:
Our carrot ginger soup is inspired by traditional recipes, bringing a warm and comforting dish to your table.

**Ingredients**:
- Carrots
- Ginger
- Onions
- Vegetable broth
- Spices

**Warnings**:
Contains no allergens.

**General Information**:
Rich in vitamins and antioxidants, this soup is perfect for a cozy meal.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "stuffed_peppers",
        availability: true,
        name: "Stuffed Peppers",
        price: 7.49,
        description: `
Bell peppers stuffed with rice, tomatoes, and herbs.

**Story**:
Our stuffed peppers are a traditional dish, filled with a savory mix of rice and vegetables, perfect for a hearty meal.

**Ingredients**:
- Bell peppers
- Rice
- Tomatoes
- Onions
- Herbs

**Warnings**:
Contains no allergens.

**General Information**:
A wholesome and nutritious dish, perfect for lunch or dinner.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "zucchini_noodles",
        availability: true,
        name: "Zucchini Noodles",
        price: 5.99,
        description: `
Spiralized zucchini noodles with a light tomato sauce.

**Story**:
Our zucchini noodles are a healthy alternative to pasta, inspired by Italian cuisine and perfect for a light meal.

**Ingredients**:
- Zucchini
- Tomatoes
- Garlic
- Olive oil
- Basil

**Warnings**:
Contains no allergens.

**General Information**:
Low in carbs and calories, this dish is perfect for those looking for a lighter option.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
    {
        uuid: "fruit_salad",
        availability: true,
        name: "Fruit Salad",
        price: 4.49,
        description: `
A mix of seasonal organic fruits.

**Story**:
Our fruit salad is a vibrant mix of the freshest seasonal fruits, perfect for a refreshing and healthy snack.

**Ingredients**:
- Seasonal fruits (varies)
- Mint leaves
- Lime juice

**Warnings**:
Contains no allergens.

**General Information**:
Rich in vitamins and antioxidants, this salad is a great way to enjoy a variety of fruits.
        `,
        labels: [Labels.vegan, Labels.gluten],
    },
];

export default TestData;
