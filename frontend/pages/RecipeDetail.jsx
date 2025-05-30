import { View, StyleSheet, Text } from "react-native";

export default function RecipeDetail() {
  return (
    <View style={styles.container}>
      <Text>Recipe Detail</Text>
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
