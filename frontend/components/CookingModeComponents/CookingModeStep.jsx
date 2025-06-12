import Timer from "../Timer";
import { useEffect, useState } from "react";
import { styles } from "../../styles/styles";
import { Card, View, Text, Button, Switch, Image } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { speak, stopSpeaking } from "../../utils/Speak";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";
import TimesUp from "../../assets/TimesUp.webp";

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

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/simple-notification-152054.mp3")
    );
    await sound.playAsync();
  };

  const handleTimerEnd = () => {
    Toast.show({
      type: "customToast",
      position: "top",
      props: {
        text1: "Timer done!",
        text2: "Move onto the next step!",
        icon: TimesUp,
      },
    });
    playSound();
  };

  return (
    <Card style={styles.cookingModeStepContainer}>
      <View style={styles.cookingStepWrapper}>
        <Text style={[styles.cookingModeText, { marginTop: 20 }]}>
          Step {step_number}
        </Text>
        <Text style={styles.cookingModeText}>{step_description}</Text>
      </View>

      <Card style={styles.cookingTimerCard}>
        {time_required ? (
          <Timer
            seconds={time_required * 60}
            isRunning={isTimerRunning}
            handleTimerEnd={handleTimerEnd}
            key={step_number}
          />
        ) : (
          <View style={{ height: 96 }} />
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {time_required && (
            <Button
              style={styles.cookingIconButton}
              onPress={() => setIsTimerRunning((prev) => !prev)}
            >
              <Icon
                name={
                  isTimerRunning
                    ? "pause-circle-outline"
                    : "play-circle-outline"
                }
                size={70}
                style={styles.timerPlayIcon}
              />
            </Button>
          )}
          <Button
            style={styles.cookingIconButton}
            margin-20
            onPress={() => setHasReading(!hasReading)}
          >
            <Icon
              name={hasReading ? "volume-high" : "volume-mute"}
              size={70}
              style={styles.speakerPlayIcon}
            />
          </Button>
        </View>
      </Card>
    </Card>
  );
}
