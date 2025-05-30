import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../pages/Home";
import CookingMode from "../pages/CookingMode";
import ShoppingList from "../pages/ShoppingList";
import RecipeDetail from "../pages/RecipeDetail";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
    </Stack.Navigator>
  );
}

export default function NavBar() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Cooking Mode" component={CookingMode} />
      <Tab.Screen name="Shopping List" component={ShoppingList} />
    </Tab.Navigator>
  );
}
