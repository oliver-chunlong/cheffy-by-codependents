import { View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RecipeDetail() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Recipe Detail</Text>
      <Button
        title="Add to Shopping List"
        onPress={() => navigation.getParent()?.navigate("Shopping List")}
      />
      <Button
        title="Go to Cooking Mode"
        onPress={() => navigation.getParent()?.navigate("Cooking Mode")}
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
