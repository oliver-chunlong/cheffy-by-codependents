import React, { useContext, useState, useEffect } from "react";
import {
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Text, Button, Modal } from "react-native-ui-lib";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../context/UserContext";
import LoginForm from "../components/ProfileComponents/LoginForm";
import RecipeCard from "../components/HomePage-components/RecipeCard";
import FavouriteButton from "../components/FavouriteButton";
import {
  requestUserRecipes,
  requestFavouriteRecipes,
  requestRecipeById,
  deleteUserRecipe,
} from "../utils/axios";
import { styles } from "../styles/styles";

const normalizeRecipeImage = (recipe) => {
  if (!recipe || typeof recipe !== "object") return null;
  return {
    ...recipe,
    recipe_img_url: recipe.recipe_img_url || recipe.image_url,
  };
};

export default function Profile({ navigation, route }) {
  const { user, error, userError, logout } = useContext(UserContext);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);

  const userId = user?.id || null;

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setErrorMsg("");

    const loadFavorites = async () => {
      try {
        const favorites = await requestFavouriteRecipes(userId);
        console.log("Favourites response in Profile:", favorites);

        if (!favorites || !favorites.length) {
          console.log("No favorites found, setting empty array");
          setFavourites([]);
          return;
        }

        console.log("Starting to fetch recipes for favorites:", favorites);
        const recipePromises = favorites.map((fav) => {
          console.log("Fetching recipe for favorite ID:", fav.recipe_id);
          return requestRecipeById(fav.recipe_id)
            .then((recipe) => {
              if (!recipe) {
                console.error(
                  `No recipe data returned for ID ${fav.recipe_id}`
                );
                return null;
              }
              console.log("Successfully fetched recipe:", {
                id: recipe.recipe_id,
                name: recipe.recipe_name,
              });
              return normalizeRecipeImage(recipe);
            })
            .catch((err) => {
              console.error(`Failed to fetch recipe ${fav.recipe_id}:`, err);
              return null;
            });
        });

        const favRecipes = await Promise.all(recipePromises);
        console.log("All recipes fetched:", favRecipes);
        const validRecipes = favRecipes.filter(Boolean);
        console.log("Valid recipes to display:", validRecipes);
        setFavourites(validRecipes);
      } catch (err) {
        console.error("Error loading favourites:", err);
        setErrorMsg("Failed to load favourite recipes.");
        setFavourites([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [userId]);

  useEffect(() => {
    if (route.params?.newRecipe) {
      setMyRecipes((prev) => [
        ...prev,
        normalizeRecipeImage(route.params.newRecipe),
      ]);
      navigation.setParams({ newRecipe: undefined });
    }
  }, [route.params?.newRecipe]);

  useEffect(() => {
    if (!userId) return;
    setIsLoading(true);
    setErrorMsg("");

    requestUserRecipes(userId)
      .then((res) => {
        const arr = res || [];
        setMyRecipes(arr.map(normalizeRecipeImage).filter(Boolean));
      })
      .catch((err) => {
        console.error("Error loading my recipes:", err.message);
        setErrorMsg("Failed to load your recipes.");
      })
      .finally(() => setIsLoading(false));
  }, [userId]);

  const handleDelete = async (recipeId) => {
    try {
      await deleteUserRecipe(userId, recipeId);
      setMyRecipes((prev) => prev.filter((r) => r.recipe_id !== recipeId));
      setFavourites((prev) => prev.filter((r) => r.recipe_id !== recipeId));
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
        {userError && (
          <Text text80 red10 marginT-10>
            {userError}
          </Text>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center", marginVertical: 5 }}>
          <Text style={styles.sectionTitle}>Favourite recipes</Text>
        </View>
        {isLoading && favourites.length === 0 ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : errorMsg ? (
          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <Text text90 red10>
              {errorMsg}
            </Text>
          </View>
        ) : favourites.length === 0 ? (
          <View style={{ alignItems: "center", marginVertical: 16 }}>
            <Text text90>No favourites yet</Text>
          </View>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16,
            }}
          >
            {favourites.map((recipe) => (
              <View key={recipe.recipe_id} style={styles.horizontalItem}>
                <RecipeCard recipe={recipe}>
                  <FavouriteButton
                    recipe_id={recipe.recipe_id}
                    onToggle={async () => {
                      try {
                        console.log("Refreshing favorites after toggle");
                        const updatedFavourites = await requestFavouriteRecipes(
                          user.id
                        );
                        console.log(
                          "Updated favorites response:",
                          updatedFavourites
                        );

                        if (!updatedFavourites || !updatedFavourites.length) {
                          console.log(
                            "No favorites after toggle, setting empty array"
                          );
                          setFavourites([]);
                          return;
                        }

                        const recipePromises = updatedFavourites.map((fav) => {
                          console.log("Fetching recipe for favorite:", fav);
                          return requestRecipeById(fav.recipe_id)
                            .then((recipe) => {
                              if (!recipe) {
                                console.error(
                                  `No recipe data returned for ID ${fav.recipe_id}`
                                );
                                return null;
                              }
                              console.log(
                                "Recipe fetched successfully:",
                                recipe
                              );
                              return normalizeRecipeImage(recipe);
                            })
                            .catch((err) => {
                              console.error(
                                `Failed to fetch recipe ${fav.recipe_id}:`,
                                err
                              );
                              return null;
                            });
                        });

                        const recipes = await Promise.all(recipePromises);
                        console.log(
                          "All recipes fetched after toggle:",
                          recipes
                        );
                        const validRecipes = recipes.filter(Boolean);
                        console.log(
                          "Valid recipes to display after toggle:",
                          validRecipes
                        );
                        setFavourites(validRecipes);
                      } catch (err) {
                        console.error(
                          "Failed to refresh favourites after toggle:",
                          err
                        );
                        setErrorMsg("Failed to refresh favourites.");
                      }
                    }}
                  />
                </RecipeCard>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={{ alignItems: "center", marginVertical: 5 }}>
          <Text style={styles.sectionTitle}>My recipes</Text>
        </View>

        {isLoading && myRecipes.length === 0 ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ) : errorMsg ? (
          <Text text90 red10>
            {errorMsg}
          </Text>
        ) : myRecipes.length === 0 ? (
          <Text text90>No recipes yet</Text>
        ) : (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: 16,
            }}
          >
            {myRecipes.map((recipe) => (
              <View key={recipe.recipe_id} style={styles.horizontalItem}>
                <RecipeCard recipe={recipe}>
                  <View>
                    <TouchableOpacity
                      onPress={() => {
                        setRecipeToDelete(recipe.recipe_id);
                        setShowConfirmModal(true);
                      }}
                    >
                      <Icon name="delete" size={20} style={styles.deleteIcon} />
                    </TouchableOpacity>
                  </View>
                </RecipeCard>
              </View>
            ))}
            <Modal
              transparent
              animationType="fade"
              visible={showConfirmModal}
              onRequestClose={() => setShowConfirmModal(false)}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.5)",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: 300,
                    backgroundColor: "white",
                    padding: 20,
                    borderRadius: 10,
                    elevation: 5,
                  }}
                >
                  <Text style={styles.deleteText}>
                    Are you sure you want to delete the recipe?
                  </Text>
                  <View
                    style={{ flexDirection: "row", justifyContent: "flex-end" }}
                  >
                    <Button
                      label="Cancel"
                      onPress={() => setShowConfirmModal(false)}
                      style={styles.shoppingListCancelButton}
                    />
                    <Button
                      label="Delete"
                      onPress={() => {
                        handleDelete(recipeToDelete);
                        setShowConfirmModal(false);
                        setRecipeToDelete(null);
                      }}
                      style={styles.shoppingListClearButton}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          </ScrollView>
        )}
        <Button
          label="Create new recipe"
          style={styles.actionButton}
          onPress={() => navigation.navigate("CreateNewRecipe")}
        />
        <Button
          label="Log out"
          style={styles.actionButton2}
          onPress={handleLogout}
          backgroundColor="red"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
