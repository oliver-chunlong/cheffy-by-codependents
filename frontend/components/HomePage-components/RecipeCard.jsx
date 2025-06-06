import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import  {styles}  from "../../styles/styles";

export default function RecipeCard({ recipe }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("RecipeDetail", { recipe })}
    >
      <Image
        source={{ uri: recipe.recipe_img_url }}
        style={styles.image}
      />
      <View style={styles.textWrapper}>
        <Text style={styles.recipeTitle} numberOfLines={1}>
          {recipe.recipe_name}
        </Text>
        <View style={styles.iconRow}>
          {recipe.is_vegetarian && <Text style={styles.icon}>🥦</Text>}
          {recipe.is_vegan && <Text style={styles.icon}>🌱</Text>}
          {recipe.is_gluten_free && <Text style={styles.icon}>🚫🌾</Text>}
          {!recipe.is_dairy_free && <Text style={styles.icon}>🥛</Text>}
          {!recipe.is_nut_free && <Text style={styles.icon}>🥜</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
}