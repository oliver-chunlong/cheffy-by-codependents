import * as Speech from "expo-speech";

export function stopSpeaking() {
  // if (await Speech.isSpeakingAsync()) {
  Speech.stop();
  // }
}

export async function speak(text) {
  const voices = await Speech.getAvailableVoicesAsync();
  if (voices.length > 0) {
    Speech.speak(text, { rate: 1 });
  }
  Speech.speak(text);
}
