import React, { useContext, useEffect, useState } from "react";
import { ScrollView, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ShoppingListContext } from "../context/ShoppingListContext";
import { Colors, Card, Button, Image, Text, View, Timeline, ListItem } from "react-native-ui-lib";
import { requestRecipeById, requestFavouriteRecipes, postRecipeToFavourites, removeRecipeFromFavourites } from "../utils/axios";
import Toast from "react-native-toast-message";
import Loading from "../components/Loading";
import Stepper from "../components/Stepper";
import FavouriteButton from "../components/FavouriteButton";
import { UserContext } from "../context/UserContext";
import { styles } from "../styles/styles";

function Step({ instruction }) {
  const timelineColor = "#f6c47b";
  
  return (

  <Timeline
  topLine={
    instruction.step_number > 1 ? { state: Timeline.states.CURRENT, color: timelineColor } : undefined
    }
    bottomLine={{ state: Timeline.states.CURRENT, color: timelineColor }}
    point={{
      label: instruction.step_number,
      labelStyle: { color: timelineColor },
    }}
    pointColor={timelineColor}
    stateColor={timelineColor}
    >
      <Card style={styles.instructionCard}>
        <Text>{instruction.step_description}</Text>
        {instruction.time_required > 0 && (
          <Text style={styles.instructionTime}>
            {instruction.time_required} mins
          </Text>
        )}
      </Card>
    </Timeline>
  );
}

export default function RecipeDetail({
  route: {
    params: { recipe },
  },
}) {
  const navigation = useNavigation();
  const { user, login } = useContext(UserContext);
  const { setShoppingList } = useContext(ShoppingListContext);

  const [recipeState, setRecipeState] = useState(recipe);
  const [ingredientQuantity, setIngredientQuantity] = useState(1);
  const [isFav, setIsFav] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const countableIngredients = ["onion", "lime", "tortilla", "chilli pepper"];

  useEffect(() => {
    setIsLoading(true);
    requestRecipeById(recipe.recipe_id)
      .then(response => {
        const full = response.recipe || response;
        setRecipeState(full);
      })
      .catch(err => console.error("Failed to load recipe:", err))
      .finally(() => setIsLoading(false));
  }, [recipe]);

  useEffect(() => {
    if (!user) {
      setIsFav(false);
      return;
    }
    requestFavouriteRecipes(user.id)
      .then(res => {
        const arr = Array.isArray(res) ? res : res.recipes || res.favourites || [];
        const favIds = arr.map(r => r.recipe_id);
        setIsFav(favIds.includes(recipe.recipe_id));
      })
      .catch(() => {
      });
  }, [user, recipe.recipe_id]);

  const toggleFavourite = async () => {
    if (!user) {
      const u = await login("default", "123");
      if (!u) {
        Toast.show({
          type: "error",
          text1: "Please log in to favourite",
          position: "bottom",
        });
        return;
      }
    }
    
    const next = !isFav;
    const apiCall = next
      ? postRecipeToFavourites(user.id, recipe.recipe_id)
      : removeRecipeFromFavourites(user.id, recipe.recipe_id);

    apiCall
      .then(() => {
        setIsFav(next);
        Toast.show({
          type: "success",
          text1: next ? "Added to favourites" : "Removed from favourites",
          position: "bottom",
        });
      })
      .catch(() => {
        Toast.show({
          type: "error",
          text1: "Couldn't update favourites",
          position: "bottom",
        });
      });
  };

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.innerContentContainer}>
        <View style={styles.topButtonsRow}>
          <Button
            disabled={isLoading}
            onPress={() => navigation.getParent() ?.navigate("Cooking Mode", { recipe: recipeState })}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Cooking Mode</Text>
          </Button>
        </View>

        <Text style={styles.recipeName}>{recipeState.recipe_name}</Text>
        <Text style={styles.recipeDescription}>
          {recipeState.recipe_description}
        </Text>
        <Text style={styles.createdBy}>
          By {recipeState.created_by_username}
        </Text>

        <Image
          source={{ uri: recipeState.recipe_img_url }}
          style={styles.recipeImage}
        />

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {isLoading ? (
          <Loading />
        ) : recipeState.ingredients?.length > 0 ? (
          <FlatList
          scrollEnabled={false}
          keyExtractor={(item, index) => {
            return (item.iq_id != null ? item.iq_id : index).toString();
          }}
         data={recipeState.ingredients}
            renderItem={({ item }) => (
              <ListItem.Part
                activeBackgroundColor={Colors.grey60}
                activeOpacity={0.3}
              >
                <Text>{`${item.quantity_numerical}${
                  item.quantity_unit ? " " + item.quantity_unit : ""
                } ${
                  item.quantity_numerical > 1 &&
                  countableIngredients.includes(item.ingredient_name)
                    ? item.ingredient_name + "s"
                    : item.ingredient_name
                }`}</Text>
              </ListItem.Part>
            )}
            style={styles.ingredientsListSpacing}
          />
        ) : (
          <Text>No ingredients to show.</Text>
        )}

        <View row style={styles.shoppingListContainer}>
          <Stepper
            value={ingredientQuantity}
            onValueChange={setIngredientQuantity}
            min={1}
            max={1000}
          />
          <Button
            style={styles.shoppingAddButton}
            disabled={isLoading}
            onPress={() => {
              try {
                setShoppingList(prev => {
                  const newItems = Array(ingredientQuantity).fill(recipeState);
                  return prev ? [...prev, ...newItems] : newItems;
                });
                Toast.show({
                  type: "success",
                  text1: "Ingredients added to shopping list",
                  position: "bottom",
                });
              } catch {
                Toast.show({
                  type: "error",
                  text1: "Oh no! Something went wrong!",
                  text2: "Please try again later.",
                  position: "bottom",
                });
              }
            }}
          >
            <Text style={styles.buttonText}>Add to Shopping List</Text>
          </Button>

          <FavouriteButton
            recipeId={recipe.recipe_id}
            isFavourite={isFav}
            onToggle={toggleFavourite}
            style={styles.favouriteButtonDetail}
          />
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        <View style={styles.timelineContainer}>
          {isLoading ? (
            <Loading />
          ) : recipeState.instructions?.length > 0 ? (
            recipeState.instructions.map(instruction => (
              <Step
                key={instruction.step_number}
                instruction={instruction}
              />
            ))
          ) : (
            <Text>No instructions to show.</Text>
          )}
        </View>
        <View style={{ height: 10 }} />
      </View>
    </ScrollView>
  );
}
