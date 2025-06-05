import React, { useState, useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card, Button, View, Text } from "react-native-ui-lib";

import CookingModeStep from "../components/CookingModeComponents/CookingModeStep";
import Progressbar from "../components/Progressbar";
import Completed from "../components/CookingModeComponents/Completed";
import SpeechRecognition from "../components/CookingModeComponents/SpeechRecognition";

export default function CookingMode(props) {
  const recipe = props?.route?.params?.recipe;
  const navigation = useNavigation();

  const [step, setStep] = useState(0);
  const [start, setStart] = useState(false);
  const [complete, setComplete] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(recipe);
  const currentStep = currentRecipe?.instructions[step];

  const [repeat, setRepeat] = useState(0);

  useEffect(() => {
    setStep(0);
    setCurrentRecipe(recipe);
  }, [recipe]);

  const handleNext = () => {
    setStep((prev) => prev + 1);
    if (step === currentRecipe.instructions - 1) {
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
          setCurrentRecipe({});
          setStart(false);
        }
      };
    }, [complete])
  );

  if (!currentRecipe) {
    return (
      <View>
        <Text>Select a recipe to get started!</Text>
        <Button onPress={() => navigation.navigate("Home")}>
          <Text>return to homepage</Text>
        </Button>
      </View>
    );
  }
  if (complete) return <Completed />;

  if (!start)
    return (
      <Button
        onPress={() => {
          setStart(true);
        }}
      >
        <Text>Start Cooking</Text>
      </Button>
    );

  return (
    <View style={styles.container}>
      <Text>Cooking Mode</Text>
      <Progressbar
        step={step}
        totalSteps={currentRecipe?.instructions?.length - 1}
      />
      {currentStep && (
        <CookingModeStep
          step_number={currentStep.step_number}
          step_description={currentStep.step_description}
          time_required={currentStep.time_required}
          isTimerRunning={isTimerRunning}
          setIsTimerRunning={setIsTimerRunning}
          repeat={repeat}
        />
      )}
      <Button onPress={handleNext}>
        <Text>Next Step</Text>
      </Button>
      <Button title="Previous Step" onPress={handleBack}>
        <Text>Previous Step</Text>
      </Button>

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
