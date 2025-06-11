import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Alert } from 'react-native';
import { TextField, Text, Button, Card } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { styles as shared} from '../styles/styles';
import { postNewRecipe, getAllIngredients } from '../utils/axios';
import { UserContext } from '../context/UserContext';
import IngredientAutocomplete from '../components/CreateNewRecipeComponents/IngredientAutoComplete';

const Chip = ({ label, onRemove }) => (
  <View style={localStyles.chip}>
    <Text>{label}</Text>
    <Text onPress={() => onRemove(label)} style={localStyles.chipRemove}></Text>
  </View>
);

export default function CreateNewRecipe() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const userId = user?.id;

  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    getAllIngredients()
      .then(setAllIngredients)
      .catch(err => console.error("Failed to load ingredients:", err));
  }, []);

  const addIngredient = name => setSelectedIngredients(prev => [...prev, name]);
  const removeIngredient = name => setSelectedIngredients(prev => prev.filter(i => i !== name));

  const onSavePress = async () => {
    if (!userId) {
      return setError("You must be logged in.");
    }

    if (!recipeName.trim()) {
      return setError("Name required.");
    }

    if (!description.trim()) {
      return setError("Description required.");
    }

    if (!imageUrl.trim()) {
      return setError("Image URL required.");
    }

    if (!selectedIngredients.length) {
      return setError("Add at least one ingredient.");
    }

    if (!steps.trim()) {
      return setError("Steps required.");
    }

    setError("");

    const payload = {
      recipe_name: recipeName.trim(),
      recipe_img_url: imageUrl.trim(),
      recipe_description: description.trim(),
      ingredients: selectedIngredients,
      steps: steps.split('\n').map(l => l.trim()),
    };

    try {
      const saved = await postNewRecipe(userId, payload);
      Alert.alert(`"${saved.recipe_name}" saved.`);
      navigation.navigate("Profile", { newRecipe: saved });
    } catch {
      setError("Failed to save.");
    }
  };

  return (
    <SafeAreaView style={shared.screen}>
      <ScrollView
        style={localStyles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
        keyboardShouldPersistTaps="handled"
      >
        {!!error && <Text style={localStyles.error}>{error}</Text>}

        <Card style={localStyles.card}>
          <TextField
          placeholder="Recipe name"
          value={recipeName}
          onChangeText={setRecipeName}
          style={localStyles.input}
          />
          <TextField
          placeholder="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          style={localStyles.input}
          />
          <TextField
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={localStyles.textArea}
          />

          <View style={localStyles.section}>
            <Text>Ingredients</Text>
            <IngredientAutocomplete
            allIngredients={allIngredients}
            onAdd={addIngredient}
            />
            <View style={localStyles.chipContainer}>
              {selectedIngredients.map(i => (
                <Chip key={i} label={i} onRemove={removeIngredient} />
              ))}
            </View>
          </View>

          <TextField
          placeholder="Steps (one per line)"
          value={steps}
          onChangeText={setSteps}
          multiline
          style={localStyles.textArea}
          />
        </Card>

        <Button style={shared.createRecipeButton}
        label="Save" 
        fullWidth onPress={onSavePress} 
        />

        <Button style={shared.createRecipeButton}
        label="Cancel"
        fullWidth
        backgroundColor={shared.lightGrey}
        labelStyle={{ color: 'black' }}
        onPress={() => navigation.goBack()}
        />
        
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 16 
  },

  card: { 
    marginBottom: 20, 
    padding: 16, 
    borderRadius: 12, 
  },

  input: { 
    borderWidth: 1, 
    borderColor: shared.borderGrey, 
    borderRadius: 8, 
    padding: 12, 
    marginVertical: 8 
  },

  textArea: { 
    minHeight: 100, 
    textAlignVertical: 'top', 
    marginVertical: 8, 
    borderWidth: 1, 
    borderColor: shared.borderGrey, 
    borderRadius: 8, 
    padding: 12 
  },

  section: { 
    marginVertical: 8 
  },

  chipContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginTop: 8 
  },

  chip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 16, 
    margin: 4 
  },

  chipRemove: { 
    marginLeft: 4, 
    fontWeight: 'bold' 
  },

  error: { color: 'red', textAlign: 'center', marginBottom: 12 }
});
