import {
  ExpoSpeechRecognitionModule,
  useSpeechRecognitionEvent,
} from "expo-speech-recognition";
import { useState } from "react";

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
  });
}

export default function useListen() {
  const [transcript, setTranscript] = useState("");

  useSpeechRecognitionEvent("result", (event) => {
    console.log("start");
    setTranscript(event.results[0]?.transcript);
  });
  useSpeechRecognitionEvent("error", (event) => {
    console.log("error code:", event.error, "error message:", event.message);
  });

  return [transcript, start, stop];
}
