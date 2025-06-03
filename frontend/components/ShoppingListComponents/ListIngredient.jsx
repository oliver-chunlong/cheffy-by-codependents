import { StyleSheet } from "react-native";
import { useState } from "react";
import { Text, View, Checkbox, ListItem } from "react-native-ui-lib";

export default function ListIngredient({ ingredient }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <ListItem.Part row style={styles.item}>
      <Checkbox value={isChecked} onValueChange={setIsChecked} />
      <Text>{ingredient.ingredient_name}</Text>
      <Text>{ingredient.quantity_numerical}</Text>
      <Text>{ingredient.quantity_unit}</Text>
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
