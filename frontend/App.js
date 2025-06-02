import { NavigationContainer } from "@react-navigation/native";
import NavBar from "./components/NavBar";
import { ShoppingListProvider } from "./context/ShoppingListContext";

export default function App() {
  return (
    <ShoppingListProvider>
      <NavigationContainer>
        <NavBar />
      </NavigationContainer>
    </ShoppingListProvider>
  );
}
