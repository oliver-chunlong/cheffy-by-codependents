import { createContext, useState } from "react";

export const CurrentRecipeContext = createContext();

export const CurrentRecipeProvider = ({ children }) => {
  const [currentRecipe, setCurrentRecipe] = useState([
    {
      step_number: 1,
      step_description: "Heat olive oil in a pan.",
      time_required: 2,
      timed_task: true,
    },
    {
      step_number: 2,
      step_description: "Add chopped onion and sauté until translucent.",
      time_required: 5,
      timed_task: true,
    },
    {
      step_number: 3,
      step_description:
        "Add minced garlic and grated ginger. Cook for 1 minute.",
      time_required: 1,
      timed_task: true,
    },
    {
      step_number: 4,
      step_description:
        "Stir in cumin, coriander and turmeric. Cook spices for 30 seconds.",
      time_required: 1,
      timed_task: true,
    },
    {
      step_number: 5,
      step_description: "Add chopped tomatoes and cook until soft.",
      time_required: 7,
      timed_task: true,
    },
    {
      step_number: 6,
      step_description: "Add chickpeas and simmer for 15–20 minutes.",
      time_required: 20,
      timed_task: true,
    },
    {
      step_number: 7,
      step_description:
        "Adjust salt and spices to taste. Serve hot with rice or naan.",
      time_required: null,
      timed_task: false,
    },
  ]);

  return (
    <CurrentRecipeContext.Provider value={{ currentRecipe, setCurrentRecipe }}>
      {children}
    </CurrentRecipeContext.Provider>
  );
};
