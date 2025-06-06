import { useEffect, useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { requestRecipes } from "../../utils/axios";
import  {styles}  from "../../styles/styles";
import Loading from "../Loading";


const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemMargin = 8;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

export default function RecipeList() {
  const [allRecipes, setAllRecipes] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    requestRecipes().then((recipes) => {
      if (recipes) setAllRecipes(recipes);
    });
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
      style={styles.card}
    >
      <Image source={{ uri: item.recipe_img_url }} style={styles.image} />
      <View style={styles.textWrapper}>
        <Text style={styles.title} numberOfLines={1}>
          {item.recipe_name}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.recipe_description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (allRecipes.length === 0) {
    return <Loading />;
  }


  return (
    <FlatList
      data={allRecipes}
      renderItem={renderItem}
      keyExtractor={(item, index) =>
        item.id ? item.id.toString() : index.toString()
      }
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
}
