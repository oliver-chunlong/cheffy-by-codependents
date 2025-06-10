import { FlatList, StyleSheet } from "react-native";
import ListIngredient from "../components/ShoppingListComponents/ListIngredient";
import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/styles";
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

  // If empty, show a message
  if (shoppingList?.length === 0) {
    return (
      <View style={styles.container}>
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Home")}
        >
          Select a recipe to add ingredients
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        paddingTop: 20,
        flex: 1,
        width: "100%",
        maxWidth: 480,
        alignSelf: "center",
      }}
    >
      <FlatList
        data={summedUpIngredients}
        keyExtractor={(item) => item.ingredient_id}
        renderItem={({ item }) => (
          <View style={styles.shoppingListItem}>
            <ListIngredient ingredient={item} />
          </View>
        )}
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 30, marginBottom: 10 }}>
            <Text style={styles.shoppingListText}>What you'll need for:</Text>
            {uniqueRecipesWithCount.map((item) => (
              <Text key={item.recipe_id} style={styles.shoppingListText}>
                {item.count > 1
                  ? `${item.count} servings of ${item.recipe_name}`
                  : `${item.count} serving of ${item.recipe_name}`}
              </Text>
            ))}
          </View>
        )}
        ListFooterComponent={() => (
          <View>
            <Button
              onPress={() => {
                setShoppingList([]);
              }}
              style={styles.shoppingListButton}
            >
              <Text style={styles.shoppingListButtonText}>Clear List</Text>
            </Button>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}
