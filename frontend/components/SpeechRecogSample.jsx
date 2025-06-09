// import React, { useState } from "react";
// import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
// import {
//   ExpoSpeechRecognitionModule,
//   useSpeechRecognitionEvent,
// } from "expo-speech-recognition";

// const steps = ["Step 1", "Step 2", "Step 3", "Step 4", "Step 5"];

// export default function SpeechRecogSample() {
//   const [step, setStep] = useState(0);
//   const [recognizing, setRecognizing] = useState(false);
//   const [speechInput, setSpeechInput] = useState("");

//   useSpeechRecognitionEvent("start", () => setRecognizing(true));
//   useSpeechRecognitionEvent("end", () => setRecognizing(false));

//   useSpeechRecognitionEvent("result", (e) => {
//     const spoken = e.results[0]?.transcript;
//     if (!spoken) return;
//     setSpeechInput(spoken);
//     if (spoken.toLowerCase().includes("next step") && step < steps.length - 1) {
//       setStep((prev) => prev + 1);
//     }
//   });

//   const startListening = async () => {
//     const perms = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
//     if (!perms.granted) {
//       console.log("No Microphone Permission");
//       return;
//     }
//     ExpoSpeechRecognitionModule.start({
//       lang: "en-US",
//       interimResults: true,
//       continuous: true,
//     });
//     console.log("Listening!!!!");
//   };

//   const stopListening = () => {
//     ExpoSpeechRecognitionModule.stop();
//   };

//   return (
//     <SafeAreaView>
//       <Text>{steps[step]}</Text>
//       <Button
//         title={recognizing ? "Stop Listening" : "Start Listening"}
//         onPress={recognizing ? stopListening : startListening}
//       />
//       <Text>{speechInput}</Text>
//     </SafeAreaView>
//   );
// }
