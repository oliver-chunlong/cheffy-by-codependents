import { FlatList, StyleSheet, Alert } from "react-native";
import ListIngredient from "../components/ShoppingListComponents/ListIngredient";
import { useContext, useState } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/styles";
import { Text, View, Button, Modal } from "react-native-ui-lib";

export default function ShoppingList() {
  const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
      <View style={styles.cookingContainerNoRecipe}>
        <Text style={styles.cookingNoRecipeText}>
          Select a recipe to add ingredients
        </Text>
        <Button
          onPress={() => {
            navigation.navigate("Home", { screen: "Home" });
          }}
          style={styles.cookingModeButton}
        >
          <Text style={styles.cookingModeButtonText}>return to homepage</Text>
        </Button>
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
              onPress={() => setShowConfirmModal(true)}
              style={styles.shoppingListButton}
            >
              <Text style={styles.shoppingListButtonText}>Clear List</Text>
            </Button>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <Modal
        transparent
        animationType="fade"
        visible={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 300,
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              elevation: 5,
            }}
          >
            <Text style={[styles.buttonText, { color: "black" }]}>
              Are you sure you want to clear the shopping list?
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 6,
              }}
            >
              <Button
                label="Cancel"
                onPress={() => setShowConfirmModal(false)}
                style={styles.shoppingListCancelButton}
              />
              <Button
                label="Clear"
                onPress={() => {
                  setShoppingList([]);
                  setShowConfirmModal(false);
                }}
                style={styles.shoppingListClearButton}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
