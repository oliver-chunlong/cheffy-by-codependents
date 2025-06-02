import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button } from "react-native";

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
              title="profile"
              onPress={() => navigation.navigate("Profile")}
            />
          ),
        })}
      />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
      <Stack.Screen name="Profile" component={Profile} />
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
      <Tab.Screen name="Cooking Mode" component={CookingMode} />
      <Tab.Screen name="Shopping List" component={ShoppingList} />
    </Tab.Navigator>
  );
}
