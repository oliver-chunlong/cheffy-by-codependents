import { useState } from "react";
import { StyleSheet } from "react-native";
import Timer from "../components/Timer";
import Progressbar from "../components/Progressbar";
import { Card, Button, View, Text } from "react-native-ui-lib";

const sample = [
  {
    step_number: 1,
    step_description: "Heat olive oil in a pan.",
    time_required: 2,
    timed_task: true,
  },
  {
    step_number: 2,
    step_description: "Add chopped onion and sauté until translucent.",
    time_required: 5,
    timed_task: true,
  },
  {
    step_number: 3,
    step_description: "Add minced garlic and grated ginger. Cook for 1 minute.",
    time_required: 1,
    timed_task: true,
  },
  {
    step_number: 4,
    step_description:
      "Stir in cumin, coriander and turmeric. Cook spices for 30 seconds.",
    time_required: 1,
    timed_task: true,
  },
  {
    step_number: 5,
    step_description: "Add chopped tomatoes and cook until soft.",
    time_required: 7,
    timed_task: true,
  },
  {
    step_number: 6,
    step_description: "Add chickpeas and simmer for 15–20 minutes.",
    time_required: 20,
    timed_task: true,
  },
  {
    step_number: 7,
    step_description:
      "Adjust salt and spices to taste. Serve hot with rice or naan.",
    time_required: null,
    timed_task: false,
  },
];

export default function CookingMode({ instructions = sample }) {
  const [step, setStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  function hasMoreSteps() {
    return step < instructions.length - 1;
  }

  return (
    <View style={styles.container}>
      <Progressbar step={step} totalSteps={instructions.length} />
      <Card>
        <Text>Step {instructions[step].step_number}</Text>
        <Text>{instructions[step].step_description}</Text>
        {instructions[step].timed_task && (
          <Card>
            <Timer
              seconds={instructions[step].time_required}
              isRunning={isTimerRunning}
            />
            {!isTimerRunning && (
              <Button onPress={() => setIsTimerRunning(true)}>
                <Text>Start</Text>
              </Button>
            )}
          </Card>
        )}
        <Button
          onPress={() => {
            setIsTimerRunning(false);
            if (hasMoreSteps) {
              setStep((prev) => prev + 1);
            }
          }}
        >
          <Text>{hasMoreSteps ? "Next step" : "Bon appetit"}</Text>
        </Button>
      </Card>
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
