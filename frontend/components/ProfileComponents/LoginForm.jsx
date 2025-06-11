import { useState, useContext } from "react";
import { View, Text, TextField, Button, Image } from "react-native-ui-lib";
import { UserContext } from "../../context/UserContext";
import LogInText from "../../assets/login.webp";
import Eggy from "../../assets/CookingEggy.png";
import { styles } from "../../styles/styles";

export default function LoginForm({ setHasSeenStartScreen }) {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState("test user");
  const [password, setPassword] = useState("123");

  const handleSubmit = () => {
    login(username, password, setHasSeenStartScreen);
  };

  return (
    <View style={styles.logInBox}>
      <View style={styles.LoginImages}>
        <Image source={LogInText} style={{ width: 200, height: 90 }} />
        <Image source={Eggy} style={{ width: 80, height: 120 }} />
      </View>
      <TextField
        placeholder="Username:"
        onChangeText={setUsername}
        value={username}
        style={styles.logInField}
      />
      <TextField
        placeholder="Password:"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        style={styles.logInField}
      />
      <Button
        label="Log In"
        labelStyle={{
          fontSize: 15,
          color: "white",
          fontWeight: "bold",
        }}
        onPress={handleSubmit}
        fullWidth
        style={[styles.loginButton, { marginTop: 30 }]}
      />
    </View>
  );
}
