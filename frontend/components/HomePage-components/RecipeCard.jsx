import { View, StyleSheet } from "react-native";
import TTSSample from "../TTSSample";
import SpeechRecogSample from "../SpeechRecogSample";

export default function RecipeCard({ recipe }) {
  return (
    <View>
      <Image source={{ uri: recipe.img.url }} />
      <Header>{recipe.title}</Header>
      <Text>{recipe.description}</Text>
    </View>
  );
}
