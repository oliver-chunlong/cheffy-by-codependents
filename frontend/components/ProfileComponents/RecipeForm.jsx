import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch } from 'react-native';
import { View, TextField, TextArea, Text, Button } from 'react-native-ui-lib';

export default function RecipeForm({ onSave, onCancel }) {
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isDairyFree, setIsDairyFree] = useState(false);
  const [isNutFree, setIsNutFree] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [Error, setError] = useState("");

  const onSavePress = () => {
    if (recipeName.trim() === "") {
      setError("Please give your recipe a name.");
      return;
    }
    if (description.trim() === "") {
      setError("Please provide a description.");
      return;
    }
    if (imageUrl.trim() === "") {
      setError("Please provide an image URL.");
      return;
    }
    
    const recipeObject = {
      recipe_name: recipeName.trim(),
      recipe_description: description.trim(),
      recipe_img_url: imageUrl.trim(),
      is_vegetarian: isVegetarian,
      is_vegan: isVegan,
      is_gluten_free: isGlutenFree,
      is_dairy_free: isDairyFree,
      is_nut_free: isNutFree
    };

    setError("");
    onSave(recipeObject);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Error !== "" && <Text style={styles.errorText}>{Error}</Text>}

      <TextField
      value={recipeName}
      onChangeText={setRecipeName}
      placeholder="Recipe name"
      style={styles.input}
      />

      <TextArea
      value={description}
      onChangeText={setDescription}
      placeholder="Description"
      style={styles.textArea}
      multiline
      />

      <TextField
      value={imageUrl}
      onChangeText={setImageUrl}
      placeholder="Image URL"
      style={styles.input}
      />

      <View style={styles.toggle}>
        <Text>Vegetarian</Text>
        <Switch value={isVegetarian} onValueChange={setIsVegetarian} />
      </View>
      <View style={styles.toggle}>
        <Text>Vegan</Text>
        <Switch value={isVegan} onValueChange={setIsVegan} />
      </View>
      <View style={styles.toggle}>
        <Text>Gluten-free</Text>
        <Switch value={isGlutenFree} onValueChange={setIsGlutenFree} />
      </View>
      <View style={styles.toggle}>
        <Text>Dairy-free</Text>
        <Switch value={isDairyFree} onValueChange={setIsDairyFree} />
      </View>
      <View style={styles.toggle}>
        <Text>Nut-free</Text>
        <Switch value={isNutFree} onValueChange={setIsNutFree} />
      </View>

      <TextArea
      value={ingredients}
      onChangeText={setIngredients}
      placeholder="Ingredients"
      style={styles.textArea}
      multiline
      />

      <TextArea
      value={steps}
      onChangeText={setSteps}
      placeholder="Steps"
      style={styles.textArea}
      multiline
      />

      <Button
      label="Save"
      backgroundColor="blue"
      fullWidth
      style={styles.saveButton}
      onPress={onSavePress}
      accessibilityRole="button"
      />

      <Button
      label="Cancel"
      backgroundColor="red"
      fullWidth
      labelStyle={{ color: 'black' }}
      style={styles.cancelButton}
      onPress={onCancel}
      accessibilityRole="button"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },

  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'centre',
  },
  
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 48
  },

  textArea: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    height: 120,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  toggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'centre',
    marginBottom: 12,
  },

  saveButton: {
    borderRadius: 8,
    marginBottom: 12,
  },

  cancelButton: {
    borderRadius: 8,
    marginBottom: 24,
  }
});
