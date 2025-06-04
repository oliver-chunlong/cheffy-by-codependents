import { StyleSheet, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  SearchInput,
  Typography,
  Colors,
  Card,
  Picker,
  Modal,
  Button,
  Image,
  Text,
  View,
  Timeline,
  ListItem,
} from "react-native-ui-lib";

const sample = {
  recipe: {
    recipe_id: 1,
    recipe_name: "Chana Masala",
    recipe_description: "Spiced chickpeas in a tomato-based curry",
    recipe_img_url: "https://example.jpg",
    created_by: 1,
    created_by_username: "Team Cheffy",
    ingredients: [
      {
        ingredient_id: 1,
        ingredient_name: "chickpeas",
        quantity_numerical: 250,
        quantity_unit: "grams",
        optional: false,
        dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
      },
      {
        ingredient_id: 2,
        ingredient_name: "onion",
        quantity_numerical: 1,
        quantity_unit: "piece",
        optional: false,
        dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
      },
      {
        ingredient_id: 3,
        ingredient_name: "garlic",
        quantity_numerical: 3,
        quantity_unit: "cloves",
        optional: false,
        dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
      },
      {
        ingredient_id: 5,
        ingredient_name: "tomato",
        quantity_numerical: 150,
        quantity_unit: "grams",
        optional: false,
        dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
      },
      {
        ingredient_id: 6,
        ingredient_name: "cumin",
        quantity_numerical: 1,
        quantity_unit: "teaspoon",
        optional: false,
        dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
      },
      {
        ingredient_id: 8,
        ingredient_name: "turmeric",
        quantity_numerical: 0.5,
        quantity_unit: "teaspoon",
        optional: false,
        dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
      },
      {
        ingredient_id: 9,
        ingredient_name: "olive oil",
        quantity_numerical: 2,
        quantity_unit: "tablespoons",
        optional: false,
        dietary_restrictions: ["vegetarian", "gluten-free", "dairy-free"],
      },
    ],
    instructions: [
      {
        step_number: 1,
        step_description: "Heat olive oil in a pan.",
        time_required: 2,
        timed_task: true,
      },
      {
        step_number: 2,
        step_description: "Add chopped onion and sauté until translucent.",
        time_required: 5,
        timed_task: true,
      },
      {
        step_number: 3,
        step_description:
          "Add minced garlic and grated ginger. Cook for 1 minute.",
        time_required: 1,
        timed_task: true,
      },
      {
        step_number: 4,
        step_description:
          "Stir in cumin, coriander and turmeric. Cook spices for 30 seconds.",
        time_required: 1,
        timed_task: true,
      },
      {
        step_number: 5,
        step_description: "Add chopped tomatoes and cook until soft.",
        time_required: 7,
        timed_task: true,
      },
      {
        step_number: 6,
        step_description: "Add chickpeas and simmer for 15–20 minutes.",
        time_required: 20,
        timed_task: true,
      },
      {
        step_number: 7,
        step_description:
          "Adjust salt and spices to taste. Serve hot with rice or naan.",
        time_required: null,
        timed_task: false,
      },
    ],
    is_vegetarian: true,
    is_vegan: false,
    is_gluten_free: true,
    is_dairy_free: true,
    is_nut_free: false,
  },
};

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

export default function RecipeDetail({ recipe = sample.recipe }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: recipe.recipe_img_url,
        }}
      />
      <Text>{recipe.recipe_name}</Text>
      <Text>By {recipe.created_by_username}</Text>
      <Text>{recipe.recipe_description}</Text>
      <View row>
        <Button
          onPress={() => navigation.getParent()?.navigate("Shopping List")}
        >
          <Text>Add to Shopping List</Text>
        </Button>
        <Button
          onPress={() => navigation.getParent()?.navigate("Cooking Mode")}
        >
          <Text>Cooking Mode</Text>
        </Button>
      </View>
      <FlatList
        scrollEnabled={false}
        data={recipe.ingredients}
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
      {recipe.instructions.map((instruction) => (
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
