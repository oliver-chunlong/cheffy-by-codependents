import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TTSSample from "../TTSSample";
import SpeechRecogSample from "../SpeechRecogSample";
import RecipeCard from "./RecipeCard";
import { requestRecipes } from "../../utils/axios";

export default function RecipeList({ searchQuery, filterBy, category, order }) {

  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    requestRecipes(searchQuery, filterBy, category, order).then((recipes) => {
      setRecipes(recipes)
    })
  }, [searchQuery, filterBy, category, order])
  return (
    <View>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.recipe_id} recipe={recipe} />
      ))}
    </View>
  );
}