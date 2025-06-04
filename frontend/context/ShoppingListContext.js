import { createContext, useState } from "react";

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const sample = [
    {
      recipe_id: 1,
      recipe_name: "Chana Masala",
      recipe_description: "Spiced chickpeas in a tomato-based curry",
      recipe_img_url: "https://example.jpg",
      created_by: 1,
      created_by_username: "Team Cheffy",
      ingredients: [
        {
          ingredient_id: 1,
          ingredient_name: "chickpeas",
          quantity_numerical: 250,
          quantity_unit: "grams",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 2,
          ingredient_name: "onion",
          quantity_numerical: 1,
          quantity_unit: "piece",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 3,
          ingredient_name: "garlic",
          quantity_numerical: 3,
          quantity_unit: "cloves",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 5,
          ingredient_name: "tomato",
          quantity_numerical: 150,
          quantity_unit: "grams",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 6,
          ingredient_name: "cumin",
          quantity_numerical: 1,
          quantity_unit: "teaspoon",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 8,
          ingredient_name: "turmeric",
          quantity_numerical: 0.5,
          quantity_unit: "teaspoon",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 9,
          ingredient_name: "olive oil",
          quantity_numerical: 2,
          quantity_unit: "tablespoons",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
      ],
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
    },
    {
      recipe_id: 2,
      recipe_name: "Chana Masala",
      recipe_description: "Spiced chickpeas in a tomato-based curry",
      recipe_img_url: "https://example.jpg",
      created_by: 1,
      created_by_username: "Team Cheffy",
      ingredients: [
        {
          ingredient_id: 1,
          ingredient_name: "chickpeas",
          quantity_numerical: 250,
          quantity_unit: "grams",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 2,
          ingredient_name: "onion",
          quantity_numerical: 1,
          quantity_unit: "piece",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 3,
          ingredient_name: "garlic",
          quantity_numerical: 3,
          quantity_unit: "cloves",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 5,
          ingredient_name: "tomato",
          quantity_numerical: 150,
          quantity_unit: "grams",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 6,
          ingredient_name: "cumin",
          quantity_numerical: 1,
          quantity_unit: "teaspoon",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 8,
          ingredient_name: "turmeric",
          quantity_numerical: 0.5,
          quantity_unit: "teaspoon",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
        {
          ingredient_id: 9,
          ingredient_name: "olive oil",
          quantity_numerical: 2,
          quantity_unit: "tablespoons",
          optional: false,
          dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
        },
      ],
      is_vegetarian: true,
      is_vegan: false,
      is_gluten_free: true,
      is_dairy_free: true,
      is_nut_free: false,
    },
  ];
  const [shoppingList, setShoppingList] = useState(sample);

  return (
    <ShoppingListContext.Provider value={{ shoppingList, setShoppingList }}>
      {children}
    </ShoppingListContext.Provider>
  );
};
