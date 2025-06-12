import { View, Text, StyleSheet, Image } from "react-native";

export default function CustomToast({ text1, text2, icon }) {
  console.log(icon);
  return (
    <View style={styles.container}>
      {icon && <Image source={icon} style={styles.icon} />}
      <View>
        <Text style={styles.text1}>{text1}</Text>
        {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    width: "90%",
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 12,
    resizeMode: "contain",
  },
  text1: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  text2: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});
