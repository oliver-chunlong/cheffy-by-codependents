import { View, Image, Text, StyleSheet } from "react-native";
import TTSSample from "../TTSSample";
import SpeechRecogSample from "../SpeechRecogSample";

export default function RecipeCard({ recipe }) {
  console.log(recipe)
  return (
    <View>
      <Image source={{ uri: recipe.recipe_img_url }} style={{ width: 200, height: 200 }} />
      <Text>{recipe.recipe_name}</Text>
      <Text>{recipe.recipe_description}</Text>
    </View>
  );
}
