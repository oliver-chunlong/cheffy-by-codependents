import * as Progress from "react-native-progress";

export default function Progressbar({ step, totalSteps }) {
  return (
    <Progress.Bar 
      height={25} 
      progress={step / totalSteps} 
      useNativeDriver 
      color={"#f6c47b"} 
      unfilledColor={"#f5f5f5"}
      borderWidth={0}
      borderRadius={12}
      margin={1}/>
  );
}
