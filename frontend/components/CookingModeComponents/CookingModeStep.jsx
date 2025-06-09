import Timer from "../Timer";
import { useEffect, useState } from "react";
import { styles } from "../../styles/styles";
import { Card, View, Text, Button, Switch } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { speak, stopSpeaking } from "../../utils/Speak";

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
    stopSpeaking();
    if (hasReading) {
      speak(step_description);
    }
  }, [step_number, repeat, hasReading]);

  return (
    <Card style={styles.cookingModeStepContainer}>
      <View style={styles.cookingStepWrapper}>
        <Text style={styles.cookingModeText}>Step {step_number}</Text>
        <Text style={styles.cookingModeText}>{step_description}</Text>
      </View>
      {time_required && (
        <Card style={styles.cookingTimerCard}>
          <Timer seconds={time_required * 60} isRunning={isTimerRunning} />
          <Button
            style={styles.cookingIconButton}
            onPress={() => setIsTimerRunning((prev) => !prev)}
          >
            <Icon
              name={
                isTimerRunning ? "pause-circle-outline" : "play-circle-outline"
              }
              size={100}
              style={styles.timerPlayIcon}
            />
          </Button>
        </Card>
      )}
      <View style={styles.cookingReadSection}>
        <Text style={styles.cookingModeText}>Read outloud</Text>
        <Switch margin-20 value={hasReading} onValueChange={setHasReading} />
      </View>
    </Card>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#ecf0f1",
//     padding: 8,
//   },
// });
