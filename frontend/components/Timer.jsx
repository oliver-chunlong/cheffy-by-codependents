import { useEffect, useState } from "react";

export default function Timer({ seconds, isRunning, onFinish }) {
  const [timer, setTimer] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  useEffect(() => {
    setSecondsLeft(seconds);
  }, [seconds]);

  useEffect(() => {
    if (secondsLeft === 0 && isRunning && timer) {
      clearInterval(timer);
      setTimer(null);
      onFinish && onFinish();
    }
  }, [secondsLeft]);

  if (isRunning && !timer && secondsLeft > 0) {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(t);
          return 0;
        }
      });
    }, 1000);
    setTimer(interval);
  } else if (timer && !isRunning) {
    clearInterval(timer);
  }

  return <p className="timer">{secondsLeft}</p>;
}
