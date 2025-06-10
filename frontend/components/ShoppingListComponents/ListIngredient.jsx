import { useState } from "react";
import { Text, Checkbox, ListItem } from "react-native-ui-lib";
import { styles } from "../../styles/styles";
export default function ListIngredient({ ingredient }) {
  const [isChecked, setIsChecked] = useState(false);
  const countableIngredients = ["onion", "lime", "tortilla", "chilli pepper"];

  return (
    <ListItem.Part style={styles.listIngredientPart}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        size={24}
        borderRadius={12}
        color={isChecked ? "#f6c47b" : "white"}
        iconColor="white"
        style={{
          backgroundColor: isChecked ? "#f6c47b" : "white",
          borderColor: "#f6c47b",
        }}
      />
      <Text style={styles.listIngredientText}>
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
