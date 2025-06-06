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
            <View style={{ width: '100%' }}>
              <View style={styles.titleWrapper}>
                <Text style={styles.titleText}>H O M E</Text>
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
              </View>
              <View style={styles.searchWrapper}>
                <Image
                  source={require("../assets/searchIcon.png")}
                  style={styles.searchIconImage}
                />
                <TextInput
                  placeholderTextColor="#999"
                  style={styles.searchInput}
                />
              </View>
            </View>
          ),
          
          headerRight: () => null,
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