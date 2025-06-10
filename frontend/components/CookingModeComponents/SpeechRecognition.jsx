import { useEffect, useState } from "react";
import useListen from "../../utils/hooks/Listen.js";

export default function SpeechRecognition({
  setIsTimerRunning,
  handleRepeat,
  handleBack,
  handleNext,
  start,
  complete,
}) {
  const [transcript, startListening, stopListening] = useListen();
  const [lastCommandTime, setLastCommandTime] = useState(0);

  useEffect(() => {
    if (complete) {
      stopListening();
    } else if (start) {
      startListening();
    }
    return () => {
      stopListening();
    };
  }, [start, complete]);

  useEffect(() => {
    const now = Date.now();
    if (!transcript || now - lastCommandTime <= 2000) return;

    const spoken = transcript.toLowerCase();
    console.log("Spoken:", spoken);
    const commands = [
      { keywords: ["next"], action: handleNext },
      { keywords: ["go back"], action: handleBack },
      {
        keywords: ["repeat", "what", "say again"],
        action: handleRepeat,
      },
      { keywords: ["start timer"], action: () => setIsTimerRunning(true) },
      { keywords: ["pause timer"], action: () => setIsTimerRunning(false) },
    ];

    for (let { keywords, action } of commands) {
      if (keywords.some((command) => spoken.includes(command))) {
        action();
        setLastCommandTime(now);
        stopListening();
        setTimeout(() => {
          startListening();
        }, 500);
        break;
      }
    }
  }, [transcript]);

  return;
}
