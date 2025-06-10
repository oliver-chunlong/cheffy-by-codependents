import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Stepper({ value, onValueChange, min = 1, max = 1000 }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onValueChange(Math.max(value - 1, min))}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.value}>{value}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onValueChange(Math.min(value + 1, max))}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 20
  },
  button: {
    backgroundColor: "#fc9f5d",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  value: {
    fontSize: 18,
    fontWeight: "500",
    minWidth: 40,
    textAlign: "center",
  },
});
