import * as Progress from "react-native-progress";

export default function Progressbar({ step, totalSteps }) {
  const progressValue = totalSteps > 0 ? step / totalSteps : 0;
  const clampedProgress = Math.max(0, Math.min(1, progressValue));

  return (
    <Progress.Bar
      height={25}
      progress={clampedProgress}
      useNativeDriver
      color={"#f6c47b"}
      unfilledColor={"#f5f5f5"}
      borderWidth={0}
      borderRadius={12}
      margin={1}/>
  );
}