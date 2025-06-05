import { FlatList, StyleSheet } from "react-native";
import ListIngredient from "../components/ShoppingListComponents/ListIngredient";
import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { useNavigation } from "@react-navigation/native";

import { Text, View, Button } from "react-native-ui-lib";

export default function ShoppingList() {
  const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
  const navigation = useNavigation();
  const sumedUpIngredients = Object.values(
    shoppingList?.reduce((ingredients, recipe) => {
      for (const ingridient of recipe.ingredients) {
        if (!ingredients[ingridient.ingredient_id]) {
          ingredients[ingridient.ingredient_id] = ingridient;
        } else {
          ingredients[ingridient.ingredient_id].quantity_numerical +=
            ingridient.quantity_numerical;
        }
      }
      return ingredients;
    }, {}) ?? {}
  );
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
        <View>
          <Text>Ingridients for:</Text>
          <FlatList
            data={shoppingList}
            keyExtractor={(item) => item.recipe_id}
            renderItem={({ item }) => (
              <Text key={item.recipe_id}>{item.recipe_name}</Text>
            )}
          />
          <FlatList
            data={sumedUpIngredients}
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
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
