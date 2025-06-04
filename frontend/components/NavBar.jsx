import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Icon } from 'react-native-ui-lib';

import Home from "../pages/Homepage.jsx";
import CookingMode from "../pages/CookingMode.jsx";
import ShoppingList from "../pages/ShoppingList.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import Profile from "../pages/Profile.jsx";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Homepage"
        component={Home}
        options={({ navigation }) => ({
          headerRight: () => (
          <Button
          label="Profile"
          onPress={() => navigation.navigate("Profile")}
          style={{ marginRight: 12 }}
          />
          ),
        })}
      />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />

      <Stack.Screen 
      name="Profile" 
      component={Profile} 
      options={({ navigation }) => ({
        headerRight: () => (
          <Button 
          label="Home"
          onPress={() => navigation.navigate("Homepage")}
          style={{ marginRight: 12 }}
          />
        ),
        })}
        />
    </Stack.Navigator>
  );
}

export default function NavBar() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />

      <Tab.Screen name="Cooking Mode" 
      component={CookingMode} 
      />

      <Tab.Screen 
      name="Shopping List" 
      component={ShoppingList} 
      />
    </Tab.Navigator>
  );
}