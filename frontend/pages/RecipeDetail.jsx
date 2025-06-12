import { ScrollView, FlatList, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ShoppingListContext } from "../context/ShoppingListContext";
import {
  Colors,
  Card,
  Button,
  Image,
  Text,
  View,
  Timeline,
  ListItem,
} from "react-native-ui-lib";
import { useEffect, useState, useRef } from "react";
import { requestRecipeById } from "../utils/axios";
import Toast from "react-native-toast-message";
import Loading from "../components/Loading";
import Stepper from "../components/Stepper";
import FavouriteButton from "../components/FavouriteButton";
import { styles } from "../styles/styles";
import AddToList from "../assets/AddToList.webp";

function Step({ instruction, lastStep }) {
  const color = "#fc9f5d";
  const anchorRef = useRef();

  return (
    <Timeline
      topLine={
        instruction.step_number > 1
          ? {
              state: Timeline.states.CURRENT,
              type: Timeline.lineTypes.DASHED,
              color,
            }
          : undefined
      }
      bottomLine={
        instruction.step_number !== lastStep
          ? {
              state: Timeline.states.CURRENT,
              type: Timeline.lineTypes.DASHED,
              color,
            }
          : undefined
      }
      point={{ label: instruction.step_number, color, anchorRef }}
    >
      <Card style={{ padding: 10 }}>
        <Text ref={anchorRef} style={{ marginBottom: 8 }}>
          {instruction.step_description}
        </Text>
        
        {instruction.time_required > 0 && (
          <Text style={{ fontSize: 14, color: '#666', marginTop: 8 }}>
            Duration: {instruction.time_required} minute{instruction.time_required !== 1 ? 's' : ''}
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

  const [recipeState, setRecipeState] = useState(recipe);
  const { setShoppingList } = useContext(ShoppingListContext);
  const [ingredientQuantity, setIngredientQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const countableIngredients = ["onion", "lime", "tortilla", "chilli pepper"];

  useEffect(() => {
    console.log("=== RECIPE DETAIL DEBUG ===");
    console.log("RecipeDetail: Starting with recipe:", recipe);
    console.log("Recipe ID:", recipe.recipe_id);
    console.log("Recipe source (likely Profile if has ingredients/instructions):", {
      hasIngredients: !!recipe.ingredients,
      hasInstructions: !!recipe.instructions,
      ingredientsLength: recipe.ingredients?.length,
      instructionsLength: recipe.instructions?.length
    });
    console.log("=== END RECIPE DETAIL DEBUG ===");
    
    // Check if recipe already has complete data (ingredients and instructions)
    const hasCompleteData = recipe.ingredients && recipe.instructions && 
                           recipe.ingredients.length >= 0 && recipe.instructions.length >= 0;
    
    if (hasCompleteData) {
      console.log("RecipeDetail: Recipe has complete data, using directly");
      setRecipeState(recipe);
      setIsLoading(false);
      return;
    }
    
    console.log("RecipeDetail: Recipe incomplete, fetching from server for ID:", recipe.recipe_id);
    setIsLoading(true);
    requestRecipeById(recipe.recipe_id).then((fetchedRecipe) => {
      console.log("RecipeDetail: Fetched recipe data:", fetchedRecipe);
      console.log("RecipeDetail: Ingredients:", fetchedRecipe.ingredients);
      console.log("RecipeDetail: Instructions:", fetchedRecipe.instructions);
      setRecipeState(fetchedRecipe);
      setIsLoading(false);
    }).catch(err => {
      console.error("RecipeDetail: Error fetching recipe:", err);
      setIsLoading(false);
    });
  }, [recipe]);

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.innerContentContainer}>
        <View style={styles.topButtonsRow}>
          <Button
            disabled={isLoading}
            onPress={() => {
              console.log("=== STARTING COOKING MODE ===");
              console.log("Recipe state:", recipeState);
              console.log("Recipe instructions:", recipeState.instructions);
              console.log("Instructions with time:", recipeState.instructions?.filter(inst => inst.time_required > 0));
              console.log("=== END COOKING MODE DEBUG ===");
              navigation.navigate("Cooking Mode", { recipe: recipeState });
            }}
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
          source={{
            uri: recipeState.recipe_img_url,
          }}
          style={styles.recipeImage}
        />

        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>Ingredients</Text>
        </View>

        {(() => {
          console.log("RecipeDetail: Checking ingredients condition");
          console.log("RecipeDetail: recipeState.ingredients:", recipeState.ingredients);
          console.log("RecipeDetail: ingredients length:", recipeState.ingredients?.length);
          console.log("RecipeDetail: ingredients exists:", !!recipeState.ingredients);
          
          if (recipeState.ingredients && recipeState.ingredients.length > 0) {
            console.log("RecipeDetail: Rendering ingredients list");
            return (
              <FlatList
                scrollEnabled={false}
                data={recipeState.ingredients}
                keyExtractor={(item, index) => {
                  console.log("RecipeDetail: Ingredient item for key:", item);
                  return item.ingredient_id ? item.ingredient_id.toString() : `ingredient-${index}`;
                }}
                renderItem={({ item, index }) => {
                  console.log("RecipeDetail: Rendering ingredient:", item);
                  return (
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
                  );
                }}
                style={[
                  styles.ingredientsListSpacing,
                  { marginTop: 0, paddingTop: 5 },
                ]}
              />
            );
          } else {
            console.log("RecipeDetail: Showing loading for ingredients");
            return <Loading />;
          }
        })()}

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
                setShoppingList((prev) => {
                  const newIngredients =
                    Array(ingredientQuantity).fill(recipeState);
                  return prev ? [...prev, ...newIngredients] : newIngredients;
                });
                Toast.show({
                  type: "customToast",
                  position: "bottom",
                  props: {
                    text1: "Ingredients added to shopping list",
                    icon: AddToList,
                  },
                });
              } catch (error) {
                Toast.show({
                  type: "customToast",
                  position: "bottom",
                  props: {
                    text1: "Oh no! Something went wrong!",
                    text2: "Please try again later.",
                  },
                });
              }
            }}
          >
            <Text style={styles.buttonText}>Add to Shopping List</Text>
          </Button>
          <FavouriteButton 
            recipe_id={recipeState.recipe_id} 
            style={styles.button}
            onToggle={() => {
              console.log("FavouriteButton toggled for recipe:", recipeState.recipe_id);
            }}
          />
        </View>

        {recipeState.instructions && recipeState.instructions.length > 0 ? (
          recipeState.instructions?.map((instruction) => (
            <Step
              key={instruction.step_number}
              lastStep={recipeState.instructions.at(-1).step_number}
              instruction={instruction}
            />
          ))
        ) : (
          <Loading />
        )}
      </View>
    </ScrollView>
  );
}
