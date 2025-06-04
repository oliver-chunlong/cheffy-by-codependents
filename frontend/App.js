import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import { UserProvider } from "./context/UserContext";
import { CurrentRecipeProvider } from "./context/CurrentRecipeContext";

export default function App() {
  return (
    <CurrentRecipeProvider>
      <UserProvider>
        <ShoppingListProvider>
          <NavigationContainer>
            <NavBar />
          </NavigationContainer>
        </ShoppingListProvider>
      </UserProvider>
    </CurrentRecipeProvider>
  );
}
