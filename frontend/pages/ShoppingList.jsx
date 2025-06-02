import { View, StyleSheet, Text, Button } from "react-native";
import ListIngredient from "../components/ShoppingListComponents/ListIngredient";
import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { useNavigation } from "@react-navigation/native";

export default function ShoppingList() {
  const { shoppingList, setShoppingList } = useContext(ShoppingListContext);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Shopping List</Text>
      {shoppingList.length === 0 ? (
        <Text
          style={{ color: "blue" }}
          onPress={() => navigation.navigate("Home")}
        >
          Select a recipe to add ingredients
        </Text>
      ) : (
        shoppingList.map((ingredient) => {
          return <ListIngredient ingredient={ingredient} />;
        })
      )}
      <Button
        title="Clear List"
        onPress={() => {
          setShoppingList([]);
        }}
      />
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
