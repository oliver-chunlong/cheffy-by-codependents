import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <ShoppingListProvider>
        <NavigationContainer>
          <NavBar />
        </NavigationContainer>
      </ShoppingListProvider>
    </UserProvider>
  );
}
