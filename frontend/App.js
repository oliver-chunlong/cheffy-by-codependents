import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import { UserProvider } from "./context/UserContext";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import Toast from "react-native-toast-message";
import CustomToast from "./styles/CustomToast";
export default function App() {
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
          <NavBar />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </ShoppingListProvider>
    </UserProvider>
  );
}
