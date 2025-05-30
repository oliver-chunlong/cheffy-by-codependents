import { View, StyleSheet, Text } from "react-native";

export default function CookingMode() {
  return (
    <View style={styles.container}>
      <Text>Cooking Mode</Text>
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
