import React, { useState } from "react";
import RecipeList from "../components/HomePage-components/RecipeList";

export default function Homepage({recipes, query}) {

  return (
    <RecipeList
      recipes={recipes}
      query={query}
    />
  );
}
