import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, View, Text, Image } from "react-native-ui-lib";
import { styles } from "../styles/styles";
import Egg from "../assets/Start_Cooking.webp";
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
  const currentStep = currentRecipe?.instructions?.[step];
  const [repeat, setRepeat] = useState(0);

  useEffect(() => {
    setStep(0);
    setCurrentRecipe(recipe);
  }, [recipe]);
  const handleNext = () => {
    setStep(step + 1);
    if (step === currentRecipe.instructions.length - 1) {
      setComplete(true);
      setStep(0);
    }
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };
  const handleRepeat = () => {
    setRepeat(repeat + 1);
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (complete) {
          setStep(0);
          setComplete(false);
          setStart(false);
        }
      };
    }, [complete])
  );

  if (!currentRecipe) {
    return (
      <View style={styles.cookingContainerNoRecipe}>
        <Text style={styles.cookingNoRecipeText}>
          Select a recipe to get started!
        </Text>
        <Button
          onPress={() => {
            navigation.navigate("Home");
          }}
          style={styles.cookingModeButton}
        >
          <Text style={styles.cookingModeButtonText}>return to homepage</Text>
        </Button>
      </View>
    );
  }

  if (complete) return <Completed recipe={recipe} />;

  if (!start)
    return (
      <View style={styles.cookingContainerNoRecipe}>
        {/* <Image source={Egg} style={{ width: 220, height: 180 }} /> */}
        <Button
          onPress={() => {
            setStart(true);
          }}
          style={styles.cookingModeButton}
        >
          <Text style={styles.cookingModeButtonText}>Start Cooking!</Text>
        </Button>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.cookingModeContainer}>
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
      <Button onPress={handleNext} style={styles.cookingModeButton}>
        <Text style={styles.cookingModeButtonText}>Next Step</Text>
      </Button>
      <Button
        title="Previous Step"
        onPress={handleBack}
        style={styles.cookingModeButton}
      >
        <Text style={styles.cookingModeButtonText}>Previous Step</Text>
      </Button>
      <View style={{ height: 150 }} />
      <SpeechRecognition
        complete={complete}
        setIsTimerRunning={setIsTimerRunning}
        handleNext={handleNext}
        handleBack={handleBack}
        handleRepeat={handleRepeat}
        start={start}
      />
    </ScrollView>
  );
}
