import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import { UserProvider } from "./context/UserContext";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomToast from "./styles/CustomToast";
import React, { useContext, useState, useEffect } from "react";
import StartPage from "./pages/StartPage";

export default function App() {
  const [hasSeenStartScreen, setHasSeenStartScreen] = useState(false);
  const [fontsLoaded] = useFonts({
    calibri: require("./assets/fonts/Calibri.ttf"),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const toastConfig = {
    customToast: ({ props }) => {
      return <CustomToast {...props} />;
    },
  };

  return (
    <UserProvider>
      <ShoppingListProvider>
        <NavigationContainer>
          {hasSeenStartScreen ? (
            <NavBar />
          ) : (
            <StartPage setHasSeenStartScreen={setHasSeenStartScreen} />
          )}
        </NavigationContainer>
        <Toast config={toastConfig} />
      </ShoppingListProvider>
    </UserProvider>
  );
}
