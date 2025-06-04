import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";

export default function SpeechRecognition({
  setIsTimerRunning,
  handleRepeat,
  handleBack,
  handleNext,
  start,
  complete,
}) {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [lastCommandTime, setLastCommandTime] = useState(0);

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    const speech = event.results[0]?.transcript;
    if (speech) setTranscript(speech);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
    handleStart();
  });

  //restart after every command
  const restartRecognition = () => {
    ExpoSpeechRecognitionModule.stop();
    setTranscript("");
    setTimeout(handleStart, 500);
  };

  //checks if what was said matches our conditions.
  useEffect(() => {
    const now = Date.now();
    if (now - lastCommandTime <= 2000) return;
    const spoken = transcript.toLowerCase();
    console.log(spoken);

    if (spoken.includes("next")) {
      handleNext();
      setLastCommandTime(now);
      restartRecognition();
    }
    if (spoken.includes("start timer")) {
      setIsTimerRunning(true);
      setLastCommandTime(now);
      restartRecognition();
    }
    if (spoken.includes("pause timer")) {
      setIsTimerRunning(false);
      setLastCommandTime(now);
      restartRecognition();
    }
    if (spoken.includes("go back")) {
      handleBack();
      setLastCommandTime(now);
      restartRecognition();
    }
    if (
      spoken.includes("repeat") ||
      spoken.includes("what") ||
      spoken.includes("say again")
    ) {
      handleRepeat();
      setLastCommandTime(now);
      restartRecognition();
    }
  }, [transcript]);

  //handles stopping speech on unmount or when complete.
  useEffect(() => {
    if (complete) {
      ExpoSpeechRecognitionModule.stop();
    } else if (!complete && start) {
      // TODO: this handleStart function is the reason app crashes
      //   handleStart();
    }
  }, [complete, start]);
  useEffect(() => {
    return () => {
      ExpoSpeechRecognitionModule.stop();
    };
  }, []);

  const handleStart = async () => {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      console.warn("Permissions not granted", result);
      return;
    }
    ExpoSpeechRecognitionModule.start({
      lang: "en-GB",
      interimResults: true,
      continuous: true,
    });
  };

  return <View>{recognizing && <Text>Listening...</Text>}</View>;
}
