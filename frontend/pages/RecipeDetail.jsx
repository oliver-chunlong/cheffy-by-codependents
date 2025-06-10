import { StyleSheet, FlatList, ScrollView } from "react-native";
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
      pointColor="#fc9f5d"
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
            style={styles.ingredientsListSpacing}
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
                  text1: "Ingredients added to shopping list",
                  position: "bottom",
                });
              } catch (error) {
                Toast.show({
                  type: "error",
                  text1: "Oh no! Something went wrong!",
                  text2: "Please try again later.",
                  position: "bottom",
                });
              }
            }}
            style={styles.addToShoppingListButton}
          >
            <Text style={styles.buttonText}>Add to Shopping List</Text>
          </Button>
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipeState.instructions && recipeState.instructions.length > 0 ? (
          recipeState.instructions?.map((instruction) => (
            <Step key={instruction.step_number} instruction={instruction} />
          ))
        ) : (
          <Text>No instructions available.</Text>
        )}
      </View>
    </ScrollView>
  );
}

// STYLES

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  topButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    paddingTop: 10,
  },
  button: {
    backgroundColor: "#fc9f5d",
    marginLeft: 10,
    marginRight: 10,
  },
  recipeImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 0,
  },
  recipeName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  recipeDescription: {
    fontSize: 16,
    color: Colors.grey20,
    marginBottom: 3,
    textAlign: "center",
  },
  createdBy: {
    fontSize: 14,
    color: Colors.grey30,
    marginBottom: 20,
    textAlign: "center",
  },
  ingredientsListSpacing: {
    marginBottom: 10,
  },
  shoppingListSection: {
    marginBottom: 20,
    justifyContent: "center",
  },
  addToShoppingListButton: {
    backgroundColor: "#fc9f5d",
    marginLeft: 15,
  },
  buttonText: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  ingredientsList: {
    marginBottom: 20,
  },
  ingredientText: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  instructionCard: {
    backgroundColor: '',
    padding: 5,
    borderRadius: 8,
    marginBottom: 10,
  },
  instructionTime: {
    fontSize: 14,
    color: Colors.grey30,
    marginTop: 5,
  },
});

// FILE

// import { StyleSheet, FlatList } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import { useContext } from "react";
// import { ShoppingListContext } from "../context/ShoppingListContext";
// import {
//   Colors,
//   Card,
//   Button,
//   Image,
//   Text,
//   View,
//   Timeline,
//   ListItem,
// } from "react-native-ui-lib";
// import { useEffect, useState } from "react";
// import { requestRecipeById } from "../utils/axios";
// import Toast from "react-native-toast-message";
// import Loading from "../components/Loading";
// import Stepper from "../components/Stepper";
// import FavouriteButton from "../components/FavouriteButton";

// function Step({ instruction }) {
//   return (
//     <Timeline
//       topLine={
//         instruction.step_number > 1
//           ? { state: Timeline.states.CURRENT }
//           : undefined
//       }
//       bottomLine={{ state: Timeline.states.CURRENT }}
//       point={{ label: instruction.step_number }}
//     >
//       <Card>
//         <Text>{instruction.step_description}</Text>
//         <Text>{instruction.time_required} mins</Text>
//       </Card>
//     </Timeline>
//   );
// }

// export default function RecipeDetail({
//   route: {
//     params: { recipe },
//   },
// }) {
//   const navigation = useNavigation();

//   const [recipeState, setRecipeState] = useState(recipe);
//   const { setShoppingList } = useContext(ShoppingListContext);
//   const [ingredientQuantity, setIngredientQuantity] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const countableIngredients = ["onion", "lime", "tortilla", "chilli pepper"];

//   useEffect(() => {
//     setIsLoading(true);
//     requestRecipeById(recipe.recipe_id).then((recipe) => {
//       setRecipeState(recipe);
//       setIsLoading(false);
//     });
//   }, [recipe]);

//   return (
//     <View style={styles.container}>
//       <Image
//         source={{
//           uri: recipeState.recipe_img_url,
//         }}
//       />
//       <Text>{recipeState.recipe_name}</Text>
//       <Text>{recipeState.recipe_description}</Text>
//       <Text>By {recipeState.created_by_username}</Text>
//       {recipeState.ingredients && recipeState.ingredients.length > 0 ? (
//         <FlatList
//           scrollEnabled={false}
//           data={recipeState.ingredients}
//           keyExtractor={(item) => item.ingredient_id}
//           renderItem={({ item, index }) => (
//             <ListItem.Part
//               activeBackgroundColor={Colors.grey60}
//               activeOpacity={0.3}
//               onPress={() => console.log(`pressed on order #${id + 1}`)}
//             >
//               <Text>{`${item.quantity_numerical}${
//                 item.quantity_unit ? " " + item.quantity_unit : ""
//               } ${
//                 item.quantity_numerical > 1 &&
//                 countableIngredients.includes(item.ingredient_name)
//                   ? item.ingredient_name + "s"
//                   : item.ingredient_name
//               }`}</Text>
//             </ListItem.Part>
//           )}
//         />
//       ) : (
//         <Loading />
//       )}

//       <View row>
//         <Stepper
//           value={ingredientQuantity}
//           onValueChange={setIngredientQuantity}
//           min={1}
//           max={1000}
//         />
//         <Button
//           disabled={isLoading}
//           onPress={() => {
//             try {
//               setShoppingList((prev) => {
//                 const newIngredients =
//                   Array(ingredientQuantity).fill(recipeState);
//                 return prev ? [...prev, ...newIngredients] : newIngredients;
//               });

//               Toast.show({
//                 type: "success",
//                 text1: "Ingredients added to shopping list",
//                 position: "bottom",
//               });
//             } catch (error) {
//               Toast.show({
//                 type: "error",
//                 text1: "Oh no! Something went wrong!",
//                 text2: "Please try again later.",
//                 position: "bottom",
//               });
//             }
//           }}
//         >
//           <Text>Add to Shopping List</Text>
//         </Button>
//         <Button
//           disabled={isLoading}
//           onPress={() =>
//             navigation
//               .getParent()
//               ?.navigate("Cooking Mode", { recipe: recipeState })
//           }
//         >
//           <Text>Cooking Mode</Text>
//         </Button>
//         <FavouriteButton recipe_id={recipe.recipe_id} />
//       </View>

//       {recipeState.instructions && recipeState.instructions.length > 0 ? (
//         recipeState.instructions?.map((instruction) => (
//           <Step key={instruction.step_number} instruction={instruction} />
//         ))
//       ) : (
//         <Loading />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     backgroundColor: "#ecf0f1",
//     padding: 8,
//   },
// });
