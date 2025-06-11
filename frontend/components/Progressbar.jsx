import * as Progress from "react-native-progress";
import { View, Text } from "react-native-ui-lib";

export default function Progressbar({ step, totalSteps }) {
  const progressValue = totalSteps > 0 ? step / totalSteps : 0;
  const clampedProgress = Math.max(0, Math.min(1, progressValue));

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Progress.Bar
        width={300}
        height={25}
        progress={clampedProgress}
        useNativeDriver
        color={"#f6c47b"}
        unfilledColor={"#f5f5f5"}
        borderWidth={0}
        borderRadius={12}
        margin={1}
      />
      <Text>
        {step + 1}/{totalSteps + 1}
      </Text>
    </View>
  );
}
