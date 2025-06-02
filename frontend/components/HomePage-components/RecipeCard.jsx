import { View } from "react-native";
import { GridListItem } from "react-native-ui-lib";

import { useNavigation } from "@react-navigation/native";

export default function RecipeCard({ recipe }) {
  const navigation = useNavigation();
  return (
    <GridListItem
      title={recipe.recipe_name}
      description={recipe.recipe_description}
      imageProps={{ source: { uri: recipe.recipe_img_url } }}
      onPress={() => navigation.navigate("RecipeDetail")}
    />
  );
}
