import Timer from "../Timer";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Speech from "expo-speech";
import { Card, View, Text, Button, Switch } from "react-native-ui-lib";

export default function CookingModeStep({
  step_number,
  step_description,
  time_required,
  isTimerRunning,
  setIsTimerRunning,
  repeat,
}) {
  const [hasReading, setHasReading] = useState(false);

  useEffect(() => {
    setIsTimerRunning(false);
    Speech.stop();
    if (hasReading) {
      Speech.speak(step_description);
    }
  }, [step_number, repeat, hasReading]);

  return (
    <Card>
      <Text>step {step_number}</Text>
      <Text>{step_description}</Text>
      {time_required && (
        <Card>
          <Timer seconds={time_required * 60} isRunning={isTimerRunning} />
          <Button onPress={() => setIsTimerRunning((prev) => !prev)}>
            <Text>{isTimerRunning ? "Pause Timer" : "Start Timer"}</Text>
          </Button>
        </Card>
      )}
      <View justifyContent="space-between">
        <Text>Read outloud</Text>
        <Switch margin-20 value={hasReading} onValueChange={setHasReading} />
      </View>
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
