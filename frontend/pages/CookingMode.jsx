import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { CurrentRecipeContext } from "../context/CurrentRecipeContext";

import CookingModeStep from "../components/CookingModeComponents/CookingModeStep";
import Progressbar from "../components/Progressbar";
import Completed from "../components/CookingModeComponents/Completed";
import SpeechRecognition from "../components/CookingModeComponents/SpeechRecognition";

export default function CookingMode() {
  const navigation = useNavigation();
  const { currentRecipe, setCurrentRecipe } = useContext(CurrentRecipeContext);

  const [step, setStep] = useState(0);
  const [start, setStart] = useState(false);
  const [complete, setComplete] = useState(false);
  const currentStep = currentRecipe[step];

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [repeat, setRepeat] = useState(0);

  const handleNext = () => {
    setStep((prev) => prev + 1);
    if (step === currentRecipe.length - 1) {
      setComplete(true);
      setStep(0);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const handleRepeat = () => {
    setRepeat((prev) => prev + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (complete) {
          setStep(0);
          setComplete(false);
          setCurrentRecipe([]);
          setStart(false);
        }
      };
    }, [complete])
  );

  if (currentRecipe.length === 0) {
    return (
      <View>
        <Text>Select a recipe to get started!</Text>
        <Button
          title="return to homepage"
          onPress={() => navigation.navigate("Home")}
        />
      </View>
    );
  }
  if (complete) return <Completed />;

  if (!start)
    return (
      <Button
        title="Start Cooking"
        onPress={() => {
          setStart(true);
        }}
      />
    );

  return (
    <View style={styles.container}>
      <Text>Cooking Mode</Text>
      <Progressbar step={step} totalSteps={currentRecipe.length - 1} />
      <CookingModeStep
        step_number={currentStep.step_number}
        step_description={currentStep.step_description}
        time_required={currentStep.time_required}
        isTimerRunning={isTimerRunning}
        setIsTimerRunning={setIsTimerRunning}
        repeat={repeat}
      />
      <Button title="Next Step" onPress={handleNext} />
      <Button title="Previous Step" onPress={handleBack} />

      <SpeechRecognition
        setStep={setStep}
        complete={complete}
        step={step}
        setIsTimerRunning={setIsTimerRunning}
        setRepeat={setRepeat}
        handleNext={handleNext}
        handleBack={handleBack}
        handleRepeat={handleRepeat}
        start={start}
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
