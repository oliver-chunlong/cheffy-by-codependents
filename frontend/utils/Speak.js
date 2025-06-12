import * as Speech from "expo-speech";

export function stopSpeaking() {
  // if (await Speech.isSpeakingAsync()) {
  Speech.stop();
  // }
}

export async function speak(text, onDone) {
  const voices = await Speech.getAvailableVoicesAsync();
  console.log(new Set(voices.map((v) => v.quality)));
  if (voices.length > 0) {
    Speech.speak(text, {
      rate: 1,
      voice: voices.find((voice) => voice.quality === "Enhanced")?.identifier,
      onDone: onDone,
      pitch: 1.3,
    });
  }
}
