import Timer from "../Timer";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { Card, View, Text, Button } from "react-native-ui-lib";

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
    <Card>
      <Text>step {step_number}</Text>
      <Text>{step_description}</Text>
      {time_required && (
        <Card>
          <Timer seconds={time_required * 60} isRunning={isTimerRunning} />
          <Button onPress={() => setIsTimerRunning((prev) => !prev)}>
            {isTimerRunning ? "Pause Timer" : "Start Timer"}
          </Button>
        </Card>
      )}
    </Card>
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
