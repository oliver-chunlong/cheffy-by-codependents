import { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Timer from "../components/Timer";
import Progressbar from "../components/Progressbar";

export default function CookingMode() {
  const [step, setStep] = useState(2);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  return (
    <View style={styles.container}>
      <Text>Cooking Mode</Text>
      <Progressbar step={step} totalSteps={10} />
      <Timer seconds={3} isRunning={isTimerRunning} />
      <Button
        title="Start"
        onClick={() => setIsTimerRunning((prev) => !prev)}
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
