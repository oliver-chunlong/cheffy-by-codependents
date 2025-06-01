import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useEffect, useState } from "react";

function stop() {
  ExpoSpeechRecognitionModule.stop();
}

async function start() {
  const { granted } = await ExpoSpeechRecognitionModule.getPermissionsAsync();
  if (!granted) {
    const result = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
    if (!result.granted) {
      throw new Error("Speech recognition permission not granted");
    }
  }

  ExpoSpeechRecognitionModule.start({
    lang: "en-US",
    interimResults: true,
    continuous: true,
    androidIntentOptions: { EXTRA_LANGUAGE_MODEL: "web_search" },
    iosTaskHint: "confirmation",
    requiresOnDeviceRecognition: true,
  });
}

export default function useListen() {
  const [transcript, setTranscript] = useState("");

  useSpeechRecognitionEvent("result", (event) => {
    console.log("result:", event.results);
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("end", (event) => {
    setTranscript("");
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  return [transcript, start, stop];
}

export function useDetect(wordToDetect, onDetect) {
  const [transcript] = useListen();
  const [words, setWords] = useState([]);
  useEffect(() => {
    setWords(transcript.split(" ").map((word) => word.toLowerCase()));
  }, [transcript]);
  const detected = words.filter((word) => word === wordToDetect.toLowerCase());
  if (detected.length) {
    onDetect();
    stop();
    setWords([]);
    start();
  }
  return [start, stop];
}
