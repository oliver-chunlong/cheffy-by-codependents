import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import LoginForm from '../components/ProfileComponents/LoginForm';
import RecipeCard from '../components/HomePage-components/RecipeCard';
import FavouriteButton from '../components/FavouriteButton';
import { requestUserRecipes, requestFavouriteRecipes, requestRecipeById, deleteUserRecipe } from '../utils/axios';
import { styles } from '../styles/styles';

const normalizeRecipeImage = recipe => ({
  ...recipe,
  recipe_img_url: recipe.recipe_img_url || recipe.image_url
});

export default function Profile({ navigation, route }) {
  const { user, error, userError, logout } = useContext(UserContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const userId = user?.id || null;
  
  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setErrorMsg("");

    requestFavouriteRecipes(userId)
      .then(res => {
        const arr = Array.isArray(res) ? res : res.recipes || [];
        const normalized = arr.map(normalizeRecipeImage);
        setFavourites(normalized);
      })
      .catch(err => {
        console.error("Error loading favourites:", err.message);
        setErrorMsg("Failed to load favourite recipes.");
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  useEffect(() => {
    if (route.params?.newRecipe) {
      setMyRecipes(prev => [...prev, normalizeRecipeImage(route.params.newRecipe)]);
      navigation.setParams({ newRecipe: undefined });
    }
  }, [route.params?.newRecipe]);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setErrorMsg("");

    requestUserRecipes(userId)
      .then(res => {
        const arr = res || [];
        setMyRecipes(arr.map(normalizeRecipeImage));
      })
      .catch(err => {
        console.error("Error loading my recipes:", err.message);
        setErrorMsg("Failed to load your recipes.");
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

const handleDelete = async recipeId => {
  try {
    await deleteUserRecipe(userId, recipeId);
    setMyRecipes(prev => prev.filter(r => r.recipe_id !== recipeId));
    Alert.alert("Your recipe has been removed.");
  } catch (err) {
    console.error("Delete recipe error:", err.response?.data || err.message);
    Alert.alert("Failed to delete recipe.");
  }
};

const handleLogout = () => {
  logout();
  navigation.reset({ index: 0, routes: [{ name: "test user" }] });
};

if (!user) {
  return (
  <View style={styles.centered}>
    <LoginForm />
      {userError && <Text text80 red10 marginT-10>{userError}</Text>}
    </View>
  );
}

  return (

       <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Favourite recipes</Text>
        {isLoading && favourites.length === 0 ? (
          <ActivityIndicator size="large" style={styles.loading}/>
        ) : favourites.length === 0 ? (
          <View>
            <Text text90>No favourites yet</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {favourites.map(recipe => (
              <View key={recipe.recipe_id}>
                <RecipeCard recipe={recipe}>
                  <FavouriteButton
                    recipe_id={recipe.recipe_id}
                    onToggle={added => {
                      if (added) {
                        requestRecipeById(recipe.recipe_id)
                          .then(full => setFavourites(f => [...f, normalizeRecipeImage(full)]));
                      } else {
                        setFavourites(f => f.filter(r => r.recipe_id !== recipe.recipe_id));
                      }
                    }}
                  />
                </RecipeCard>
              </View>
            ))}
          </ScrollView>
        )}

        <View>
        <Text style={styles.sectionTitle}>My recipes</Text>
        </View>

        {isLoading && myRecipes.length === 0 ? (
          <ActivityIndicator size="large" style={styles.loading} /> ////
        ) : errorMsg ? (
          <Text text90 red10>{errorMsg}</Text>
        ) : myRecipes.length === 0 ? (
          <Text text90>No recipes yet</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {myRecipes.map(recipe => (
              <View key={recipe.recipe_id} style={styles.horizontalItem}> 
                <RecipeCard recipe={recipe}>
                  <View>
                    <FavouriteButton
                    recipe_id={recipe.recipe_id}
                    onToggle={added => {
                      if (added) {
                        requestRecipeById(recipe.recipe_id)
                          .then(full => setFavourites(f => [...f, normalizeRecipeImage(full)]));
                      } else {
                        setFavourites(f => f.filter(r => r.recipe_id !== recipe.recipe_id));
                      }
                    }}
                  />
                  <TouchableOpacity onPress={() => handleDelete(recipe.recipe_id)}>
                    <Icon name="delete" size={20} style={styles.deleteIcon} />
                  </TouchableOpacity>
                  </View>
                </RecipeCard>
              </View>
            ))}
          </ScrollView>
        )}
          <Button
          label="Create new recipe"
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateNewRecipe')}
        />
        <Button
          label="Log out"
          style={styles.actionButton}
          onPress={handleLogout}
          backgroundColor="red"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
