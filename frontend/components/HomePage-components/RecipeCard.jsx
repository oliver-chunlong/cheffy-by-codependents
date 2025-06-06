import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import  {styles}  from "../../styles/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

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
          {recipe.is_vegetarian && <Icon name="alpha-v-circle-outline" size={20} color="green" />}
          {recipe.is_vegan && <Icon name="leaf" size={20} color="green" />}
          {recipe.is_gluten_free && <Icon name="barley-off" size={20} color="yellow" />}
          {!recipe.is_dairy_free && <Icon name="cow-off" size={20} color="blue" />}
          {!recipe.is_nut_free && <Icon name="peanut-off" size={20} color="brown" />}
        </View>
      </View>
    </TouchableOpacity>
  );
}