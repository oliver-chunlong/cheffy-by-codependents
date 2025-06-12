import { useEffect, useState, useCallback } from "react";
import { FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { requestRecipes } from "../../utils/axios";
import { styles } from "../../styles/styles";
import Loading from "../Loading";
import RecipeCard from "./RecipeCard";
import { BlurView } from "expo-blur";
import { Text, View, GridList, Spacings } from "react-native-ui-lib";

import FilterOrderBar from "./FilterOrderBar";

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemMargin = 8;

export default function RecipeList({ recipes, query }) {
  const navigation = useNavigation();

  const [activeFilters, setActiveFilters] = useState({});
  const [order, setOrder] = useState("name_asc");
  const [filteredRecipes, setFilteredRecipes] = useState(recipes || []);

  // useEffect(() => {
  //   console.log("RecipeList received recipes:", recipes);
  // }, [recipes]);

  useEffect(() => {
    requestRecipes({ searchQuery: query, filters: activeFilters, order })
      .then(setFilteredRecipes)
      .catch(() => setFilteredRecipes([]));
  }, [activeFilters, order, query]);

  useEffect(() => {
    setFilteredRecipes(recipes || []);
  }, [recipes]);

  useEffect(() => {
    let sorted = [...filteredRecipes];
    switch (order) {
      case "name_asc":
        sorted.sort((a, b) => a.recipe_name.localeCompare(b.recipe_name));
        break;
      case "name_desc":
        sorted.sort((a, b) => b.recipe_name.localeCompare(a.recipe_name));
        break;
      case "time_asc":
        sorted.sort((a, b) => a.cooking_time - b.cooking_time);
        break;
      case "time_desc":
        sorted.sort((a, b) => b.cooking_time - a.cooking_time);
        break;
    }
    setFilteredRecipes(sorted);
  }, [order]);

  const renderItem = useCallback(
    ({ item }) => <RecipeCard recipe={item} />,
    []
  );

  if (!filteredRecipes || filteredRecipes.length === 0) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 10, paddingTop: 0, paddingBottom: 7 }}>
        <FilterOrderBar
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          order={order}
          setOrder={setOrder}
        />
      </View>
      <View justifyContent="center">
        <FlatList
          style={{ alignSelf: "center" }}
          data={filteredRecipes}
          renderItem={renderItem}
          keyExtractor={(item, index) =>
            item.recipe_id ? item.recipe_id.toString() : index.toString()
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            paddingHorizontal: itemMargin,
          }}
        />
      </View>
    </View>
  );
}
