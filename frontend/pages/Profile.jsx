import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { View, Text, Button, TouchableOpacity } from 'react-native-ui-lib';
import { UserContext } from '../context/UserContext';
import LoginForm from '../components/ProfileComponents/LoginForm';
import RecipeForm from '../components/ProfileComponents/RecipeForm';
import RecipeDetail from '../components/ProfileComponents/RecipeDetail';
import { requestUserRecipes, requestFavouriteRecipes, deleteUserRecipe, postRecipeToFavourites, postNewRecipe, requestRecipeById, updateUserRecipe } from '../utils/axios';

export default function Profile() {
  const { user, error: userError } = useContext(UserContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isAdding, setIsAdding] = useState(false); 
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const userId = user?.id || null;

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setErrorMsg("");

    requestFavouriteRecipes(userId)
      .then(favRecipes => {
        setFavourites(favRecipes || []);
      })
      .catch(err => {
        console.error("Error loading favourites:", err.message);
        setErrorMsg("Failed to load favourite recipes.");
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

const handleLoadRecipes = async () => {
  if (!userId) return;
  setIsLoading(true);
  setErrorMsg("");

  try {
    const loaded = await requestUserRecipes(userId);
    setMyRecipes(loaded || []);
  } catch (err) {
    console.error("Error loading my recipes:", err.message);
    setErrorMsg("Failed to load recipes.");
  } finally {
    setIsLoading(false);
  }};

const handleCreateRecipe = async (recipeObject) => {
  if (!userId) return;
  setIsLoading(true);
  setErrorMsg("");

  try {
    const newRecipe = await postNewRecipe(userId, recipeObject);

    if (newRecipe && newRecipe.recipe_id) {
      setMyRecipes(prev => [...prev, newRecipe]);
      setIsAdding(false);
    } else {
      setErrorMsg("Could not create recipe.");
    }
  } catch (err) {
    console.error("Error creating recipe:", err.message);
    const serverMsg = err.response?.data?.message;
    setErrorMsg(serverMsg || "Failed to create recipe.");
  } finally {
    setIsLoading(false);
  }
};

const handleDeleteRecipe = async (recipeId) => {
  if (!userId) return;
  setIsLoading(true);
  setErrorMsg("");
  
  try {
    await deleteUserRecipe(userId, recipeId);
      setMyRecipes(prev => prev.filter(r => r.recipe_id !== recipeId));
      setFavourites(prev => prev.filter(r => r.recipe_id !== recipeId));
      setSelectedRecipe(null);
    } catch (err) {
      console.error("Error deleting recipe:", err.message);
      setErrorMsg("Failed to delete recipe.");
    } finally {
      setIsLoading(false);
    }
  };
  
const handleAddToFavourites = async (recipeId) => {
  if (!userId) return;
  setIsLoading(true);
  setErrorMsg("");
  
  try {
    await postRecipeToFavourites(userId, recipeId);
    const full = await requestRecipeById(recipeId);

    setFavourites(prev => {
      if (prev.find(r => r.recipe_id === recipeId)) return prev;
      return [...prev, full];
    });

    setSelectedRecipe(null);
  } catch (err) {
    setErrorMsg("Failed to add to favourites.");
  } finally {
    setIsLoading(false);
  }
}

const fetchRecipeAndShowDetail = async (recipeId) => {
  setIsLoading(true);
  setErrorMsg("");
  try {
    const fullRecipe = await requestRecipeById(recipeId);
    setSelectedRecipe(fullRecipe);
  } catch (err) {
    console.error("Error fetching recipe details:", err.message);
    setErrorMsg("Could not load recipe details.");
  } finally {
    setIsLoading(false);
  }
};

if (!user) {
  return (
  <View flex backgroundColor="white" centerV centerH>
    <LoginForm />
    {userError ? <Text text80 red10 marginT-10>{userError}</Text> : null}
  </View>
    );
  }

  if (isAdding) {
    return (
    <RecipeForm
    onSave={handleCreateRecipe}
    onCancel={() => setIsAdding(false)}
    />
  )};
  
  if (selectedRecipe) {
    return (
    <RecipeDetail
    recipe={selectedRecipe}
    onDelete={handleDeleteRecipe}
    onAddToFavourites={handleAddToFavourites}
    onBack={() => setSelectedRecipe(null)}
    />
  )};

  return (
  <View style={styles.container}>
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
      <View style={styles.card}>
        <Text text80 marginB-12>Favourite recipes</Text>
        
        {isLoading && favourites.length === 0 ? (
          <ActivityIndicator size="large" style={styles.loadingIndicator} />
          ) : favourites.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text text90>No favourites yet</Text>
          </View>
          ) : (
            favourites.map(recipe => (
            <TouchableOpacity
            key={recipe.recipe_id}
            style={styles.recipeCard}
            onPress={() => setSelectedRecipe(recipe)}
            accessibilityRole="button"
            >
              <Text text90>{recipe.recipe_name}</Text>
            </TouchableOpacity>
            ))
          )}
        </View>
    
        <View style={styles.card}>
          <Text text80 marginB-12>My recipes</Text>

          <View style={styles.buttonRow}>
            <Button
            label="Load Cheffy Recipes"
            backgroundColor="blue"
            style={styles.button}
            onPress={handleLoadRecipes}
            accessibilityRole="button"
            />
            <Button
            label="Create New Recipe"
            backgroundColor="green"
            style={styles.button}
            onPress={() => setIsAdding(true)}
            accessibilityRole="button"
            />
          </View>

          {isLoading && myRecipes.length === 0 ? (
            <ActivityIndicator size="large" style={styles.loadingIndicator} />
          ) : errorMsg !== "" ? (
            <Text text90 red10>{errorMsg}</Text>
          ) : myRecipes.length === 0 ? (
            <Text text90>No recipes yet</Text>
          ) : (
            myRecipes.map(recipe => (
              <TouchableOpacity
                key={recipe.recipe_id}
                style={styles.recipeCard}
                onPress={() => fetchRecipeAndShowDetail(recipe.recipe_id)}
                accessibilityRole="button"
              >
                <Text text90>{recipe.recipe_name}</Text>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 80 },

  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 12,
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },

  emptyBox: {
    height: 150,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  button: {
    flex: 0.48,
    borderRadius: 12,
  },

  loadingIndicator: {
    marginTop: 24,
    marginBottom: 24,
  },

  recipeCard: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
});
