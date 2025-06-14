import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Image, SafeAreaView, ScrollView } from "react-native";
import { Text, Button, Icon } from "react-native-ui-lib";

import { styles } from "../styles/styles";
import { requestRecipes } from "../utils/axios";

import Home from "../pages/Homepage.jsx";
import CookingMode from "../pages/CookingMode.jsx";
import ShoppingList from "../pages/ShoppingList.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import Profile from "../pages/Profile.jsx";

import SearchBar from "./HomePage-components/SearchBar.jsx";
import CreateNewRecipe from "../pages/CreateNewRecipe.jsx";
import RecipeList from "./HomePage-components/RecipeList";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack({ navigation }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});
  const [order, setOrder] = useState("");

  useEffect(() => {
    requestRecipes().then((recipes) => {
      setAllRecipes(recipes);
      setFilteredRecipes(recipes);
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Home"
        options={{
          headerStyle: styles.header,
          headerTitleStyle: {
            color: "white",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "H O M E",
          headerTintColor: "white",
          headerRight: () => (
            <Button
              round
              size={Button.sizes.small}
              backgroundColor="transparent"
              onPress={() => navigation.navigate("Home", { screen: "Profile" })}
              style={{ marginRight: 10 }}
            >
              <Image
                source={require("../assets/ProfileIcon.png")}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
            </Button>
          ),
          headerLeft: () => null,
        }}
      >
        {(props) => (
          <SafeAreaView style={{ flex: 1 }}>
            <SearchBar
              allRecipes={allRecipes}
              setFilteredRecipes={setFilteredRecipes}
              query={query}
              setQuery={setQuery}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            <RecipeList {...props} recipes={filteredRecipes} />
          </SafeAreaView>
        )}
      </Stack.Screen>

      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={{
          headerStyle: styles.header,
          headerTitleStyle: {
            color: "white",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "R E C I P E",
          headerTintColor: "white",
        }}
      />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerStyle: styles.header,
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerTitle: "P R O F I L E",
        })}
      />
      <Stack.Screen
        name="CreateNewRecipe"
        component={CreateNewRecipe}
        options={{
          headerTitle: "Create a recipe",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "white",
          },
          headerTintColor: "white",
          headerTitle: "N E W  R E C I P E",
          headerStyle: styles.header,
        }}
      />
    </Stack.Navigator>
  );
}

const icons = {
  Home: {
    active: require("../assets/MenuOnSelect.png"),
    inactive: require("../assets/Menu.png"),
  },
  "Cooking Mode": {
    active: require("../assets/CookingOnSelect.png"),
    inactive: require("../assets/Cooking.png"),
  },
  "Shopping List": {
    active: require("../assets/ListOnSelect.png"),
    inactive: require("../assets/List.png"),
  },
};

export default function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const icon = (focused) =>
          focused ? icons[route.name].active : icons[route.name].inactive;

        const label =
          route.name === "Home"
            ? "Menu"
            : route.name === "Cooking Mode"
            ? "Cook"
            : "List";

        return {
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image source={icon(focused)} style={{ width: 24, height: 24 }} />
              <Text
                style={{
                  fontSize: 10,
                  marginTop: 4,
                  color: focused ? "#000" : "#888",
                  fontWeight: focused ? "bold" : "normal",
                }}
              >
                {label}
              </Text>
            </View>
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#fff",
            height: 60,
            borderTopWidth: 0.5,
            borderColor: "#ddd",
          },
        };
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Home", {
              screen: "Home",
            });
          },
        })}
      />
      <Tab.Screen
        name="Cooking Mode"
        component={CookingMode}
        options={{
          headerStyle: styles.header,
          headerTitleStyle: {
            color: "white",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "C O O K I N G   M O D E",
        }}
      />
      <Tab.Screen
        name="Shopping List"
        component={ShoppingList}
        options={{
          headerStyle: styles.header,
          headerTitleStyle: {
            color: "white",
          },
          headerShadowVisible: false,
          headerTitleAlign: "center",
          headerTitle: "S H O P P I N G   L I S T",
        }}
      />
    </Tab.Navigator>
  );
}
