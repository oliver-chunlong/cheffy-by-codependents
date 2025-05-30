import { View, StyleSheet } from "react-native";
import TTSSample from "./components/TTSSample";
import SpeechRecogSample from "./components/SpeechRecogSample";

export default function App() {
  return (
    <View style={styles.container}>
      <TTSSample />
      <SpeechRecogSample />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
