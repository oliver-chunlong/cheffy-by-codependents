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

  useEffect(() => {
    requestRecipeById(recipe.recipe_id).then((recipe) => {
      setRecipeState(recipe);
    });
  }, [recipe]);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: recipeState.recipe_img_url,
        }}
      />
      <Text>{recipeState.recipe_name}</Text>
      <Text>By {recipeState.created_by_username}</Text>
      <Text>{recipeState.recipe_description}</Text>
      <View row>
        <Button
          onPress={() => {
            setShoppingList((prev) => {
              if (prev) {
                return [...prev, recipeState];
              }
              return [recipeState];
            });
          }}
        >
          <Text>Add to Shopping List</Text>
        </Button>
        <Button
          onPress={() =>
            navigation
              .getParent()
              ?.navigate("Cooking Mode", { recipe: recipeState })
          }
        >
          <Text>Cooking Mode</Text>
        </Button>
      </View>
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
            <Text>{item.ingredient_name}</Text>
            <Text>{item.quantity_numerical}</Text>
            <Text>{item.quantity_unit}</Text>
          </ListItem.Part>
        )}
      />
      {recipeState.instructions?.map((instruction) => (
        <Step key={instruction.step_number} instruction={instruction} />
      ))}
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
