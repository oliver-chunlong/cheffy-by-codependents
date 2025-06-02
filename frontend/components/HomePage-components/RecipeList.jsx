import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TTSSample from "../TTSSample";
import SpeechRecogSample from "../SpeechRecogSample";
import RecipeCard from "./RecipeCard";

export default function RecipeList({ searchQuery, filterBy, category }) {
  //changes to filtering logic required

  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // useEffect(() => {
  //   /*Function to get recipes from the database*/
  //   /*UtilFunctionHere*/ .then((recipes) => {
  //     setAllRecipes(recipes);
  //     setFilteredRecipes(recipes);
  //   });
  // }, []);

  useEffect(() => {
    let filtered = allRecipes;

    if (searchQuery) {
      filtered = filtered.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filterBy) {
      filtered = filtered.filter((recipe) => recipe.diet === filterBy);
    }

    if (category) {
      filtered = filtered.filter((recipe) => recipe.category === category);
    }

    setFilteredRecipes(filtered);
  }, [searchQuery, filterBy, category, allRecipes]);

  return (
    <View>
      {filteredRecipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </View>
  );
}
