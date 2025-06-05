import { StyleSheet } from "react-native";
import { useState } from "react";
import { Text, View, Checkbox, ListItem } from "react-native-ui-lib";

export default function ListIngredient({ ingredient }) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <ListItem.Part row style={styles.item}>
      <Checkbox value={isChecked} onValueChange={setIsChecked} />
      <Text>{`${ingredient.quantity_numerical} ${ingredient.quantity_unit} ${ingredient.ingredient_name}`}
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
