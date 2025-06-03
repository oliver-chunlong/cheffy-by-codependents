import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import TTSSample from "../TTSSample";
import SpeechRecogSample from "../SpeechRecogSample";
import RecipeCard from "./RecipeCard";
import { requestRecipes } from "../../utils/axios";

export default function RecipeList({ searchQuery, filterBy, category, order }) {

  useEffect(() => {
    requestRecipes().then((recipes) => {
        return (
          <View>
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </View>
        );
    })
  })
}