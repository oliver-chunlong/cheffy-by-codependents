import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Stepper({ value, onValueChange, min = 1, max = 1000 }) {
  return (
    <View>
      <TouchableOpacity onPress={() => onValueChange(Math.max(value - 1, min))}>
        <Text>-</Text>
      </TouchableOpacity>
      <Text>{value}</Text>
      <TouchableOpacity onPress={() => onValueChange(Math.min(value + 1, max))}>
        <Text>+</Text>
      </TouchableOpacity>
    </View>
  );
}
