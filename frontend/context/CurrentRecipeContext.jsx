import { createContext, useState } from "react";

export const CurrentRecipeContext = createContext();

export const CurrentRecipeProvider = ({ children }) => {
  const [currentRecipe, setCurrentRecipe] = useState({
    recipe_id: 3,
    recipe_name: "Vegan Tofu Stir-Fry",
    recipe_description: "Crispy tofu with vegetables and soy sauce",
    recipe_img_url:
      "https://plus.unsplash.com/premium_photo-1712604940796-1a1dd9021bf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    created_by: 1,
    created_by_username: "Team Cheffy",
    ingredients: [
      {
        ingredient_id: 23,
        ingredient_name: "tofu",
        quantity_numerical: 200,
        quantity_unit: "grams",
        optional: false,
        dietary_restrictions: ["vegetarian", "vegan", "dairy-free", "nut-free"],
      },
      {
        ingredient_id: 24,
        ingredient_name: "broccoli",
        quantity_numerical: 100,
        quantity_unit: "grams",
        optional: false,
        dietary_restrictions: ["vegetarian", "vegan", "dairy-free", "nut-free"],
      },
      {
        ingredient_id: 22,
        ingredient_name: "soy sauce",
        quantity_numerical: 30,
        quantity_unit: "ml",
        optional: false,
        dietary_restrictions: ["vegetarian", "vegan", "dairy-free", "nut-free"],
      },
      {
        ingredient_id: 4,
        ingredient_name: "ginger",
        quantity_numerical: 10,
        quantity_unit: "grams",
        optional: true,
        dietary_restrictions: ["vegetarian", "vegan", "dairy-free", "nut-free"],
      },
      {
        ingredient_id: 3,
        ingredient_name: "garlic",
        quantity_numerical: 2,
        quantity_unit: "cloves",
        optional: false,
        dietary_restrictions: ["vegetarian", "vegan", "dairy-free", "nut-free"],
      },
    ],
    instructions: [
      {
        step_number: 1,
        step_description: "Cut tofu into cubes and pan-fry until golden.",
        time_required: 7,
        timed_task: true,
      },
      {
        step_number: 2,
        step_description: "Remove tofu and set aside.",
        time_required: 1,
        timed_task: true,
      },
      {
        step_number: 3,
        step_description:
          "In the same pan, add garlic and ginger, sauté briefly.",
        time_required: 1,
        timed_task: true,
      },
      {
        step_number: 4,
        step_description:
          "Add chopped broccoli and carrot. Stir-fry until tender-crisp.",
        time_required: 6,
        timed_task: true,
      },
      {
        step_number: 5,
        step_description: "Add tofu back to pan.",
        time_required: null,
        timed_task: false,
      },
      {
        step_number: 6,
        step_description:
          "Add soy sauce and toss everything together for 1–2 minutes.",
        time_required: 2,
        timed_task: true,
      },
      {
        step_number: 7,
        step_description: "Serve hot.",
        time_required: null,
        timed_task: false,
      },
    ],
    is_vegetarian: true,
    is_vegan: true,
    is_gluten_free: false,
    is_dairy_free: true,
    is_nut_free: true,
  });

  return (
    <CurrentRecipeContext.Provider value={{ currentRecipe, setCurrentRecipe }}>
      {children}
    </CurrentRecipeContext.Provider>
  );
};
