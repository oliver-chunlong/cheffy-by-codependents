import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  {styles}  from "../styles/styles";
import { Button } from 'react-native-ui-lib';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

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
          headerStyle: styles.header,
          headerTitleAlign: 'center',
          headerTitle: () => (
            <View style={styles.titleWrapper}>
              <Text style={styles.titleText}>H O M E</Text>
              <View style={styles.searchWrapper}>
                <Text style={styles.searchIcon}>🔎</Text>
                <TextInput
                  // placeholder="Search"
                  placeholderTextColor="#999"
                  style={styles.searchInput}
                />
              </View>
            </View>
          ),
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
          headerLeft: () => null,
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
              onPress={() => navigation.navigate('Homepage')}
              style={styles.homeButton}
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
      <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      <Tab.Screen name="Cooking Mode" component={CookingMode} />
      <Tab.Screen name="Shopping List" component={ShoppingList} />
    </Tab.Navigator>
  );
}