import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Text, Button } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { UserContext } from '../context/UserContext';
import LoginForm from '../components/ProfileComponents/LoginForm';
import RecipeCard from '../components/HomePage-components/RecipeCard';
import FavouriteButton from '../components/FavouriteButton';
import { requestUserRecipes, requestFavouriteRecipes, requestRecipeById, deleteUserRecipe } from '../utils/axios';
import { styles } from '../styles/styles';

export default function Profile({ navigation, route }) {
  const { user, userError, logout } = useContext(UserContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const userId = user?.id;
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!userId || !isFocused) return;
    setIsLoading(true);
    setErrorMsg("");

    requestFavouriteRecipes(userId)
      .then(res => {
        const ids = Array.isArray(res)
          ? res.map(fav => fav.recipe_id)
          : (res.favourites || []).map(fav => fav.recipe_id);

        return Promise.all(
          ids.map(async id => {
            const full = await requestRecipeById(id);
            return {
              ...full,
              recipe_img_url: full.recipe_img_url || full.image_url
            };
          })
        );
      })
      .then(setFavourites)
      .catch(err => {
        console.error("Error loading favourites:", err);
        setErrorMsg("Failed to load favourite recipes.");
      })
      .finally(() => setIsLoading(false));
  }, [userId, isFocused]);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setErrorMsg("");

    requestUserRecipes(userId)
      .then(res =>
        Promise.all(
          (res || []).map(async raw => {
            const full = await requestRecipeById(raw.recipe_id);
            return {
              ...full,
              recipe_img_url: full.recipe_img_url || full.image_url
            };
          })
        )
      )
      .then(setMyRecipes)
      .catch(err => {
        console.error("Error loading my recipes:", err);
        setErrorMsg("Failed to load your recipes.");
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  useEffect(() => {
    const newR = route.params?.newRecipe;
    if (!newR) return;

    (async () => {
      try {
        const full = await requestRecipeById(newR.recipe_id);
        const enhanced = {
          ...full,
          recipe_img_url: full.recipe_img_url || full.image_url
        };
        setMyRecipes(prev => [
          ...prev.filter(r => r.recipe_id !== enhanced.recipe_id),
          enhanced
        ]);
      } catch (err) {
        console.error("Failed to fetch new recipe:", err);
      } finally {
        navigation.setParams({ newRecipe: undefined });
      }
    })();
  }, [route.params?.newRecipe]);

  const handleDelete = async recipeId => {
    try {
      await deleteUserRecipe(userId, recipeId);
      setMyRecipes(prev => prev.filter(r => r.recipe_id !== recipeId));
      Alert.alert("Your recipe has been removed.");
    } catch (err) {
      console.error("Delete recipe error:", err);
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
    <SafeAreaView style={[styles.container, { flex: 1 }]}> 
      <ScrollView nestedScrollEnabled contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}>
        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <Text style={styles.sectionTitle}>Favourite recipes</Text>
        </View>

        {isLoading && favourites.length === 0 ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : favourites.length === 0 ? (
          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <Text text90>No favourites yet</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 16 }}
          >
            {favourites.map(recipe => (
              <TouchableOpacity
                key={recipe.recipe_id}
                activeOpacity={0.8}
                style={{ marginHorizontal: 8 }}
                onPress={() => navigation.navigate("RecipeDetail", { recipe: { recipe_id: recipe.recipe_id } })}
              >
                <RecipeCard recipe={recipe}>
                  <FavouriteButton
                    recipeId={recipe.recipe_id}
                    isFavourite={true}
                    onToggle={added => {
                      if (added) {
                      } else {
                        setFavourites(f => f.filter(r => r.recipe_id !== recipe.recipe_id));
                      }
                    }}
                  />
                </RecipeCard>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <View style={{ alignItems: "center", marginVertical: 16 }}>
          <Text style={styles.sectionTitle}>My recipes</Text>
        </View>

        {isLoading && myRecipes.length === 0 ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : errorMsg ? (
          <Text text90 red10>{errorMsg}</Text>
        ) : myRecipes.length === 0 ? (
          <Text text90>No recipes yet</Text>
        ) : (
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 16 }}
          >
            {myRecipes.map(recipe => (
              <TouchableOpacity
                key={recipe.recipe_id}
                activeOpacity={0.8}
                style={{ marginHorizontal: 8 }}
                onPress={() => navigation.navigate("RecipeDetail", { recipe: { recipe_id: recipe.recipe_id } })}
              >
                <RecipeCard recipe={recipe}>
                  <TouchableOpacity onPress={() => handleDelete(recipe.recipe_id)}>
                    <Icon name="delete" size={20} style={styles.deleteIcon} />
                  </TouchableOpacity>
                </RecipeCard>
              </TouchableOpacity>
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
        style={styles.actionButton2} 
        backgroundColor="red" 
        onPress={handleLogout} 
        />

      </ScrollView>
    </SafeAreaView>
  );
}
