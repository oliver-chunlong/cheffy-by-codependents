import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import CookingModeStep from "../components/CookingModeComponents/CookingModeStep";
import Progressbar from "../components/Progressbar";
import Completed from "../components/CookingModeComponents/Completed";
import { useFocusEffect } from "@react-navigation/native";
import { useContext } from "react";
import { CurrentRecipeContext } from "../context/CurrentRecipeContext";
import { useNavigation } from "@react-navigation/native";

export default function CookingMode() {
  const navigation = useNavigation();
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const { currentRecipe, setCurrentRecipe } = useContext(CurrentRecipeContext);
  const currentStep = currentRecipe[step];
  const handleNext = () => {
    setStep(step + 1);
    if (step === currentRecipe.length - 1) {
      setComplete(true);
      setStep(0);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (complete) {
          setStep(0);
          setComplete(false);
          setCurrentRecipe([]);
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
  return complete ? (
    <Completed />
  ) : (
    <View style={styles.container}>
      <Text>Cooking Mode</Text>
      <Progressbar step={step} totalSteps={currentRecipe.length - 1} />
      <CookingModeStep
        step_number={currentStep.step_number}
        step_description={currentStep.step_description}
        time_required={currentStep.time_required}
      />
      <Button title="Next Step" onPress={handleNext} />
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
