import { StyleSheet } from "react-native";
import { useState } from "react";
import { Text, View, Checkbox, ListItem } from "react-native-ui-lib";

export default function ListIngredient({ ingredient }) {
  const [isChecked, setIsChecked] = useState(false);
  const countableIngredients = ["onion", "lime", "tortilla", "chilli pepper"];

  return (
    <ListItem.Part row style={styles.item}>
      <Checkbox value={isChecked} onValueChange={setIsChecked} />
      <Text>
        {`${ingredient.quantity_numerical}${
          ingredient.quantity_unit ? " " + ingredient.quantity_unit : ""
        } ${
          ingredient.quantity_numerical > 1 &&
          countableIngredients.includes(ingredient.ingredient_name)
            ? ingredient.ingredient_name + "s"
            : ingredient.ingredient_name
        }`}
      </Text>
    </ListItem.Part>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
});
