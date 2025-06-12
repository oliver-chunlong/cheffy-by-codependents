import LoginForm from "../components/ProfileComponents/LoginForm";
import { styles } from "../styles/styles";
import { View, Button, Text, Image } from "react-native-ui-lib";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { ImageBackground } from "react-native";
import Logo from "../assets/Logo.webp";
import Background from "../assets/Background_graphic.webp";
export default function StartPage({ setHasSeenStartScreen }) {
  const { user, login, error, logout } = useContext(UserContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ImageBackground
        source={Background}
        style={styles.startBackground}
        resizeMode="cover"
        imageStyle={{
          // this moves the image inside the container
          marginLeft: 40,
          marginTop: 30,
        }}
      >
        <View style={styles.startWrapper}>
          <Image source={Logo} style={{ width: 200, height: 90 }} />
          <LoginForm setHasSeenStartScreen={setHasSeenStartScreen} />
          {error && (
            <Text text80 red10 marginT-10>
              {userError}
            </Text>
          )}
          <Button
            label="Continue as Guest"
            labelStyle={{
              fontSize: 15,
              color: "white",
              fontWeight: "bold",
            }}
            onPress={() => setHasSeenStartScreen(true)}
            fullWidth
            style={[styles.loginButton, { marginTop: -20 }]}
          />
        </View>
      </ImageBackground>
    </View>
  );
}
