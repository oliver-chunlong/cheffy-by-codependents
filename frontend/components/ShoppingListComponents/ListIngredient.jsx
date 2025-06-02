import { View, Text, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";

export default function ListIngredient({ ingredient }) {
  const [isChecked, setIsChecked] = useState(false);
  console.log(ingredient);
  return (
    <View style={styles.item}>
      {" "}
      <Checkbox value={isChecked} onValueChange={setIsChecked} />
      <Text>{ingredient}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
});
