import * as Progress from "react-native-progress";

export default function Progressbar({ step, totalSteps }) {
  return (
    <Progress.Bar height={25} progress={step / totalSteps} useNativeDriver />
  );
}
