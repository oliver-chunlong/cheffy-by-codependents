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
        <Text style={styles.title} numberOfLines={1}>
          {recipe.recipe_name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {recipe.recipe_description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}