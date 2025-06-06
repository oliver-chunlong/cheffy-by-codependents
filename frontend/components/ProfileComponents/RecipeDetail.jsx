import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View, Text, Button } from 'react-native-ui-lib';

export default function RecipeDetail({ recipe, onDelete, onAddToFavourites, onBack }) {

  return (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.content}>
      <Text text50 marginB-16>{recipe.recipe_name}</Text>
      <Text text80 marginB-8>Ingredients:</Text>
      <Text text90 marginB-16>
        {Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0 ? 
        recipe.ingredients.map(ing =>`${ing.quantity_numerical} ${ing.quantity_unit} ${ing.ingredient_name}`).join('\n')
        : "No ingredients provided."}
        </Text>
        
        <Text text90 marginB-16>
          {Array.isArray(recipe.instructions) && recipe.instructions.length > 0 ? recipe.instructions
          .sort((a, b) => a.step_number - b.step_number)
          .map(insert => `${insert.step_number}. ${insert.step_description}`)
          .join('\n')
          : "No steps provided."}
          </Text>

        <Button
        label="Delete"
        backgroundColor="red"
        fullWidth
        style={styles.button}
        onPress={() => onDelete(recipe.recipe_id)}
        accessibilityRole="button"
        />

        <Button
        label="Add to favourites"
        backgroundColor="yellow"
        fullWidth
        labelStyle={{ color: 'black' }}
        style={styles.button}
        onPress={() => onAddToFavourites(recipe.recipe_id)}
        accessibilityRole="button"
        />

        <Button
        label="Back"
        backgroundColor="blue"
        fullWidth
        labelStyle={{ color: 'black' }}
        style={styles.button}
        onPress={onBack}
        accessibilityRole="button"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  content: {
    padding: 16,
  },

  button: {
    borderRadius: 8,
    marginBottom: 12,
    color: 'black',
  }
});
