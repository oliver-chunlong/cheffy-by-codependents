import { View } from "react-native";
import { GridListItem } from "react-native-ui-lib";

export default function RecipeCard({ recipe }) {
  return (
    <GridListItem
      title={recipe.recipe_name}
      description={recipe.recipe_description}
      imageProps={{ source: { uri: recipe.recipe_img_url } }}
    />
  );
}
