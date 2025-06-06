import { StyleSheet, FlatList } from "react-native";
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
import { useEffect, useState } from "react";
import { requestRecipeById } from "../utils/axios";
import Toast from "react-native-toast-message";
import Loading from "../components/Loading";
import Stepper from "../components/Stepper";
import FavouriteButton from "../components/FavouriteButton";

function Step({ instruction }) {
  return (
    <Timeline
      topLine={
        instruction.step_number > 1
          ? { state: Timeline.states.CURRENT }
          : undefined
      }
      bottomLine={{ state: Timeline.states.CURRENT }}
      point={{ label: instruction.step_number }}
    >
      <Card>
        <Text>{instruction.step_description}</Text>
        <Text>{instruction.time_required} mins</Text>
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
    <View style={styles.container}>
      <Image
        source={{
          uri: recipeState.recipe_img_url,
        }}
      />
      <h1>{recipeState.recipe_name}</h1>
      <Text>{recipeState.recipe_description}</Text>
      <Text>
        <i>By {recipeState.created_by_username}</i>
      </Text>
      {recipeState.ingredients && recipeState.ingredients.length > 0 ? (
        <FlatList
          scrollEnabled={false}
          data={recipeState.ingredients}
          keyExtractor={(item) => item.ingredient_id}
          renderItem={({ item, index }) => (
            <ListItem.Part
              activeBackgroundColor={Colors.grey60}
              activeOpacity={0.3}
              onPress={() => console.log(`pressed on order #${id + 1}`)}
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
        />
      ) : (
        <Loading />
      )}

      <View row>
        <Stepper
          value={ingredientQuantity}
          onValueChange={setIngredientQuantity}
          min={1}
          max={1000}
        />
        <Button
          disabled={isLoading}
          onPress={() => {
            try {
              setShoppingList((prev) => {
                const newIngredients =
                  Array(ingredientQuantity).fill(recipeState);
                return prev ? [...prev, ...newIngredients] : newIngredients;
              });

              Toast.show({
                type: "success",
                text1: "Ingredients added to shopping list!",
                position: "bottom",
                visibilityTime: 3000,
              });
            } catch (error) {
              Toast.show({
                type: "error",
                text1: "Oh no! Something went wrong!",
                text2: "Please try again later.",
                position: "bottom",
                visibilityTime: 3000,
              });
            }
          }}
        >
          <Text>Add to Shopping List</Text>
        </Button>

        <Button
          disabled={isLoading}
          onPress={() =>
            navigation
              .getParent()
              ?.navigate("Cooking Mode", { recipe: recipeState })
          }
        >
          <Text>Cooking Mode</Text>
        </Button>
        <FavouriteButton recipe_id={recipe.recipe_id} />
      </View>

      {recipeState.instructions && recipeState.instructions.length > 0 ? (
        recipeState.instructions?.map((instruction) => (
          <Step key={instruction.step_number} instruction={instruction} />
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
