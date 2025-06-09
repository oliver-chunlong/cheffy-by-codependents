import React, { useState, useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-ui-lib';

import { styles } from "../styles/styles";
import { requestRecipes } from "../utils/axios";

import Home from "../pages/Homepage.jsx";
import CookingMode from "../pages/CookingMode.jsx";
import ShoppingList from "../pages/ShoppingList.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import Profile from "../pages/Profile.jsx";
import SearchBar from "./HomePage-components/SearchBar.jsx";
import RecipeList from './HomePage-components/RecipeList'; 

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack({ navigation }) {
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({});

  useEffect(() => {
    requestRecipes().then((recipes) => {
      setAllRecipes(recipes);
      setFilteredRecipes(recipes); 
    });
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="Homepage"
        options={{
          headerStyle: styles.header,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>H O M E</Text>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
            onPress={() => navigation.navigate('Home', { screen: 'Profile' })}
              style={styles.profileButton}
            >
              <Image
                source={require('../assets/ProfileIcon.png')}
                style={styles.profileIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ),
          headerLeft: () => null,
        }}
      >
        {props => (
          <>
            <SearchBar
              allRecipes={allRecipes}
              setFilteredRecipes={setFilteredRecipes}
              query={query}
              setQuery={setQuery}
              activeFilters={activeFilters}
              setActiveFilters={setActiveFilters}
            />
            <RecipeList
              {...props}
              recipes={filteredRecipes}
            />
          </>
        )}
      </Stack.Screen>

      <Stack.Screen name="RecipeDetail" component={RecipeDetail} />

      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerRight: () => (
            <Button
              label="Home"
              onPress={() => navigation.navigate('Homepage')}
              style={styles.homeButton}
            />
          ),
        })}
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
        const icon = focused =>
          focused
            ? icons[route.name].active
            : icons[route.name].inactive || icons[route.name].active;

        let label;
        if (route.name === 'Home') label = 'MENU';
        else if (route.name === 'Cooking Mode') label = 'COOK';
        else if (route.name === 'Shopping List') label = 'LIST';

        return {
          headerShown: true,
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              <Image source={icon(focused)} style={styles.iconImage} />
              <Text
                style={[
                  styles.iconLabel,
                  focused ? styles.iconLabelActive : styles.iconLabelInactive,
                ]}
              >
                {label}
              </Text>
            </View>
          ),
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBar,
        };
      }}
    >
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
