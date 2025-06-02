import { useEffect, useState } from "react";

function removingLeading0(text) {
  if (text[0].startsWith("0")) {
    const leading = text.shift().charAt(-1);
    return [leading, ...text];
  }
  return text;
}

function removingLeadingEmpty(text) {
  while (text.length > 1 && text[0] === "00") {
    text.shift();
  }
  return text;
}

function toTimeArray(date) {
  return date.toUTCString().split(" ").at(-2).split(":");
}

export default function Timer({ seconds, isRunning, onFinish }) {
  const start = new Date(0);

  const [timer, setTimer] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(start);

  useEffect(() => {
    const date = new Date(0);
    date.setSeconds(seconds);
    setSecondsLeft(date);
  }, [seconds]);

  useEffect(() => {
    if (secondsLeft.valueOf() === start.valueOf() && isRunning && timer) {
      clearInterval(timer);
      setTimer(null);
      onFinish && onFinish();
    }
  }, [secondsLeft]);

  if (isRunning && !timer && secondsLeft.valueOf() > start.valueOf()) {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev.valueOf() > start.valueOf()) {
          const date = new Date(prev.getTime());
          date.setSeconds(date.getSeconds() - 1);
          return date;
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

  let text = toTimeArray(secondsLeft);
  text = removingLeadingEmpty(text);
  text = removingLeading0(text);

  return <p className="timer">{text.join(":")}</p>;
}
