import Timer from "../Timer";
import { useEffect } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import * as Speech from "expo-speech";

export default function CookingModeStep({
  step_number,
  step_description,
  time_required,
  isTimerRunning,
  setIsTimerRunning,
  repeat,
}) {
  useEffect(() => {
    setIsTimerRunning(false);
    Speech.stop();
    Speech.speak(step_description);
  }, [step_number, repeat]);

  return (
    <View style={styles.container}>
      <Text>step {step_number}</Text>
      <Text>{step_description}</Text>
      {time_required ? (
        <View>
          <Timer seconds={time_required * 60} isRunning={isTimerRunning} />
          <Button
            title={isTimerRunning ? "Pause Timer" : "Start Timer"}
            onPress={() => setIsTimerRunning((prev) => !prev)}
          />
        </View>
      ) : null}
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
