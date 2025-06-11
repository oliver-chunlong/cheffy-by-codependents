import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Alert } from 'react-native';
import { TextField, Text, Button, Card } from 'react-native-ui-lib';
import { useNavigation } from '@react-navigation/native';
import { styles as shared} from '../styles/styles';
import { postNewRecipe, getAllIngredients } from '../utils/axios';
import { UserContext } from '../context/UserContext';
import IngredientAutocomplete from '../components/CreateNewRecipeComponents/IngredientAutoComplete';

const Chip = ({ ingredient, onRemove }) => (
   <View style={localStyles.chip}>
     <Text style={localStyles.chipText}> {ingredient.ingredient_name}</Text>
     <Text
       onPress={() => onRemove(ingredient.ingredient_id ?? ingredient.ingredient_name)}
       style={localStyles.chipRemove}
     >
       ✕
     </Text>
   </View>
   );

export default function CreateNewRecipe() {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const userId = user?.id;

  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [steps, setSteps] = useState([{ step_number: 1, step_description: "" }]);
  const [error, setError] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    getAllIngredients()
      .then(setAllIngredients)
      .catch(err => console.error("Failed to load ingredients:", err));
  }, []);

const addIngredient = ingredientObj =>
  setSelectedIngredients(prev => {
    const exists = prev.some(i =>
      i.ingredient_name === ingredientObj.ingredient_name
    );
    if (exists) return prev;
    return [...prev, ingredientObj];
  });

 const removeIngredient = idOrName =>
  setSelectedIngredients(prev =>
    prev.filter(i =>
       i.ingredient_id !== idOrName && i.ingredient_name !== idOrName
     )
   );

   const updateStep = (index, text) => {
    setSteps(prev =>
      prev.map((s, i) =>
        i === index ? { ...s, step_description: text } : s
      )
    );
  };

  const addStep = () => {
    setSteps(prev => [
      ...prev,
      { step_number: prev.length + 1, step_description: '' }
    ]);
  };

  const removeStep = index => {
    setSteps(prev => {
      const next = prev.filter((_, i) => i !== index);
      return next.map((s, i) => ({ ...s, step_number: i + 1 }));
    });
  };

  const onSavePress = async () => {
    if (!userId) {
      return setError("You must be logged in.");
    }

    if (!recipeName.trim()) {
      return setError("Name required.");
    }

    if (!imageUrl.trim()) {
        return setError('Image URL required.')
    }

    if (!description.trim()) {
      return setError("Description required.");
    }

    if (!selectedIngredients.length) {
      return setError("Add at least one ingredient.");
    }

    setError("");
    
    const ingredientsPayload = selectedIngredients.map(i => ({
      ingredient_id: i.ingredient_id, 
      quantity_numerical: 1,
      quantity_unit: null
    }));

const instructionsPayload = steps.map(s => ({
      step_number: s.step_number,
      step_description: s.step_description.trim(),
      time_required: 0
    }));

   const payload = {
     recipe_name: recipeName.trim(),
     recipe_img_url: imageUrl.trim(),
     recipe_description: description.trim(),
     ingredients: ingredientsPayload,
     instructions: instructionsPayload
   };

try {
   const response = await postNewRecipe(userId, payload);
   const savedRecipe = response.recipe || response;
    Alert.alert(`"${savedRecipe.recipe_name}" saved.`);
    navigation.navigate("Profile", { newRecipe: savedRecipe });
  } 
  catch (err) {
    console.error("Error saving recipe:", err.response?.data || err.message);
    const serverMsg = err.response?.data?.message;
    setError(serverMsg || `Save failed: ${err.message}`);
  }
};

  return (
    <SafeAreaView style={shared.screen}>
      <ScrollView
      style={localStyles.container}
      contentContainerStyle={localStyles.contentContainer}
      keyboardShouldPersistTaps="handled"
      >
        {!!error && <Text style={localStyles.error}>{error}</Text>}

        <Card style={localStyles.card}>
          <TextField
          placeholder="Recipe name"
          value={recipeName}
          onChangeText={setRecipeName}
          style={localStyles.input}
          fieldStyle={localStyles.field}
          />
          <TextField
          placeholder="Image URL"
          value={imageUrl}
          onChangeText={setImageUrl}
          style={localStyles.input}
          fieldStyle={localStyles.field}
          />
          <TextField
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={localStyles.textArea}
          fieldStyle={localStyles.field}
          />

          <View style={localStyles.section}>
            <Text style={localStyles.sectionTitle}>Ingredients</Text>
            <IngredientAutocomplete
            allIngredients={allIngredients}
            onAdd={addIngredient}
            />
            <View style={localStyles.chipContainer}>
              {selectedIngredients.map(i => (
                <Chip
                key={i.ingredient_id ?? i.ingredient_name}
                ingredient={i}
                onRemove={removeIngredient}
                />
                ))}
            </View>
          </View>
          
          <View style={localStyles.section}>
            <Text style={localStyles.sectionTitle}>Steps</Text>

            {steps.map((s, index) => (
              <View key={index} style={localStyles.stepRow}>
                <Text style={localStyles.stepLabel}>Step {s.step_number}</Text>
                <TextField
                  placeholder={`Describe step ${s.step_number}`}
                  value={s.step_description}
                  onChangeText={text => updateStep(index, text)}
                  multiline
                  style={localStyles.stepInput}
                  fieldStyle={localStyles.field}
                />
                {steps.length > 1 && (
                  <Button label="Remove" link onPress={() => removeStep(index)} style={localStyles.removeButton} />
                )}
              </View>
            ))}
            <Button label="+ Add step" link onPress={addStep} style={localStyles.addButton} />
          </View>
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
  container: { flex: 1, 
    padding: 16, 
    backgroundColor: '#f2f2f2' 
  },

  contentContainer: { 
    paddingBottom: 32 
  },

  card: { 
    padding: 20, 
    borderRadius: 16, 
    backgroundColor: '#fff', 
    marginBottom: 20, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 8, 
    elevation: 3 },

  input: { 
    marginVertical: 8 
  },

  field: { 
    backgroundColor: '#fafafa', 
    borderRadius: 8, 
    addingHorizontal: 12, 
    paddingVertical: 8, 
    borderWidth: 1, 
    borderColor: '#ddd' 
  },

  textArea: { 
    minHeight: 80,
    marginVertical: 8 
  },

  previewImage: { width: '100%', 
    height: 200, 
    borderRadius: 12, 
    marginVertical: 12 
  },

  section: { 
    marginVertical: 12 
  },

  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 8, 
    color: '#333' 
  },

  chipContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginTop: 8 
  },

  chip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#e0e0e0', 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 16, 
    margin: 4 
  },
  chipText: { 
    marginRight: 6, 
    color: '#555' 
  },

  chipRemove: { 
    fontWeight: 'bold', 
    color: '#888' 
  },

  stepRow: { 
    backgroundColor: '#fafafa', 
    padding: 12, 
    borderRadius: 8, 
    marginBottom: 12, 
    borderWidth: 1, 
    borderColor: '#ececec' 
  },

  stepLabel: { 
    fontWeight: '500', 
    marginBottom: 6, 
    color: '#444' 
  },
  stepInput: { 
    minHeight: 60, 
    marginBottom: 4 
  },
  removeButton: { 
    alignSelf: 'flex-end', 
    marginTop: 4 
  },

  addButton: { 
    alignSelf: 'flex-start', 
    marginTop: 8 
  },

  error: { color: '#d32f2f',
     textAlign: 'center',
      marginBottom: 12 
    },
  cancelButton: { 
    backgroundColor: '#e0e0e0',
    marginTop: 12 },

  cancelLabel: { 
    color: '#333' 
  }
});
