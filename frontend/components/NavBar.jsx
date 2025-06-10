import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  {styles}  from "../styles/styles";
import { Button } from 'react-native-ui-lib';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from "react";
import { requestRecipes } from "../utils/axios";

import Home from "../pages/Homepage.jsx";
import CookingMode from "../pages/CookingMode.jsx";
import ShoppingList from "../pages/ShoppingList.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import Profile from "../pages/Profile.jsx";
import SearchBar from "./HomePage-components/SearchBar.jsx"
import CreateNewRecipe from "../pages/CreateNewRecipe.jsx"

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeStack() {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    requestRecipes()
      .then(recipes => {
        console.log("Fetched recipes:", recipes); 
        setAllRecipes(recipes);
        setFilteredRecipes(recipes);
      });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      
      <Stack.Screen
      name="Homepage"
      options={({ navigation }) => ({
      headerStyle: styles.header,
      headerTitleAlign: "center",
      headerTitle: () => (
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>H O M E</Text>
      </View>
      ),
      headerLeft: () => null,
      headerRight: () => (
      <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={styles.profileButton}
      >
        <Image
        source={require('../assets/ProfileIcon.png')}
        style={styles.profileIcon}
        resizeMode="contain"
        />
        </TouchableOpacity>
        ),
    })}
    >

        {props => (
          <>
            <SearchBar recipes={allRecipes} setFilteredRecipes={setFilteredRecipes} />
            <Home {...props} recipes={filteredRecipes} />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
        headerStyle: styles.header,
        headerTitleAlign: "center",
        headerTitle: () => (
        <View style={styles.titleWrapper}>
          <Text style={styles.titleText}>P R O F I L E</Text>
        </View>
        ),
        headerRight: () => (
        <Button
        label="Home"
        onPress={() => navigation.navigate('Homepage')}
        style={styles.homeButton}
        />
        ),
        })}
      />
      <Stack.Screen
        name="CreateNewRecipe"
        component={CreateNewRecipe}
        options={{
        headerTitle: "Create a recipe",
        headerTitleAlign: "center",
        headerStyle: styles.header,
        headerTitle: () => (
      <View style={styles.titleWrapper}>
        <Text style={styles.titleText}>C R E A T E  A  R E C I P E</Text>
      </View>
      ),
      }}

      />
    </Stack.Navigator>
  );
}

const icons = {
  Home: {
    active: require('../assets/MenuOnSelect.png'),
    inactive: require('../assets/Menu.png'),
  },
  'Cooking Mode': {
    active: require('../assets/CookingOnSelect.png'),
    inactive: require('../assets/Cooking.png'),
  },
  'Shopping List': {
    active: require('../assets/ListOnSelect.png'),
    inactive: require('../assets/List.png'),
  },
};

export default function NavBar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        const icon = focused => focused ? icons[route.name].active : icons[route.name].inactive || icons[route.name].active;

        let label;
        if (route.name === 'Home') label = 'MENU';
        else if (route.name === 'Cooking Mode') label = 'COOK';
        else if (route.name === 'Shopping List') label = 'LIST';

        return {
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image source={icon(focused)} style={styles.iconImage} />
              <Text style={[styles.iconLabel, focused ? styles.iconLabelActive : styles.iconLabelInactive]}>
                {label}
              </Text>
            </View>
          ),
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        };
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Cooking Mode" component={CookingMode} />
      <Tab.Screen name="Shopping List" component={ShoppingList} />
    </Tab.Navigator>
  );
}