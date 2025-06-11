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
      <Card style={{ padding: 5 }}>
        <Text ref={anchorRef}>{instruction.step_description}</Text>
        {instruction.time_required > 0 && (
          <Text>{instruction.time_required} mins</Text>
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
    setIsLoading(true);
    requestRecipeById(recipe.recipe_id).then((recipe) => {
      setRecipeState(recipe);
      setIsLoading(false);
    });
  }, [recipe]);

  return (
    <ScrollView style={styles.scrollViewContainer}>
      <View style={styles.innerContentContainer}>
        <View style={styles.topButtonsRow}>
          <Button
            disabled={isLoading}
            onPress={() =>
              navigation
                .getParent()
                ?.navigate("Cooking Mode", { recipe: recipeState })
            }
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Cooking Mode</Text>
          </Button>
          <FavouriteButton recipe_id={recipe.recipe_id} style={styles.button} />
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

        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipeState.ingredients && recipeState.ingredients.length > 0 ? (
          <FlatList
            scrollEnabled={false}
            data={recipeState.ingredients}
            keyExtractor={(item) => item.ingredient_id.toString()}
            renderItem={({ item, index }) => (
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
          <Loading />
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});
