import { ScrollView, FlatList, StyleSheet } from "react-native";
import ListIngredient from "../components/ShoppingListComponents/ListIngredient";
import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { useNavigation } from "@react-navigation/native";

import { Text, View, Button } from "react-native-ui-lib";

export default function ShoppingList() {
  const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
  const navigation = useNavigation();
  const safeShoppingList = Array.isArray(shoppingList) ? shoppingList : [];
  const summedUpIngredients = Object.values(
    safeShoppingList.reduce((ingredients, recipe) => {
      if (!recipe?.ingredients || !Array.isArray(recipe.ingredients))
        return ingredients;

      for (const ingredient of recipe.ingredients) {
        if (!ingredient || !ingredient.ingredient_id) continue;

        if (!ingredients[ingredient.ingredient_id]) {
          ingredients[ingredient.ingredient_id] = { ...ingredient };
        } else {
          ingredients[ingredient.ingredient_id].quantity_numerical +=
            ingredient.quantity_numerical;
        }
      }

      return ingredients;
    }, {})
  );
  const recipeCount = shoppingList.reduce((acc, item) => {
    acc[item.recipe_id] = acc[item.recipe_id] || { ...item, count: 0 };
    acc[item.recipe_id].count += 1;
    return acc;
  }, {});
  const uniqueRecipesWithCount = Object.values(recipeCount);

  return (
    <View style={styles.container}>
      <Text>Shopping List</Text>
      {shoppingList?.length === 0 ? (
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Home")}
        >
          Select a recipe to add ingredients
        </Text>
      ) : (
        <ScrollView>
          <Text>Ingredients for:</Text>
          <FlatList
            data={uniqueRecipesWithCount}
            keyExtractor={(item) => item.recipe_id}
            renderItem={({ item }) => (
              <Text key={item.recipe_id}>
                {`${
                  item.count > 1
                    ? item.count + " orders of"
                    : item.count + " order of"
                } ${item.recipe_name} `}
              </Text>
            )}
          />
          <FlatList
            data={summedUpIngredients}
            keyExtractor={(item) => item.ingredient_id}
            renderItem={({ item }) => <ListIngredient ingredient={item} />}
          />
          <Button
            onPress={() => {
              setShoppingList((prev) => []);
            }}
          >
            <Text>Clear List</Text>
          </Button>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
