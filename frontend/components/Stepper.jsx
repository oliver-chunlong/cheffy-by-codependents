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
    marginLeft: 0,
    marginRight: 15,
  },
  button: {
    backgroundColor: "#ffcba0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 7,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  value: {
    fontSize: 18,
    minWidth: 45,
    textAlign: "center",
  },
});
