import React, { useState, useContext, useEffect } from 'react';
import { ScrollView, StyleSheet, SafeAreaView, View, Alert, TouchableOpacity } from 'react-native';
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
  const [steps, setSteps] = useState([{ step_number: 1, step_description: "", time_required: 0 }]);
  const [error, setError] = useState("");
  const [allIngredients, setAllIngredients] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    console.log("Fetching all ingredients...");
    getAllIngredients()
      .then(ingredients => {
        console.log("Received ingredients:", ingredients);
        console.log("First ingredient structure:", ingredients[0]);
        console.log("Sample ingredients:", ingredients.slice(0, 3));
        setAllIngredients(ingredients);
      })
      .catch(err => console.error("Failed to load ingredients:", err));
  }, []);

const addIngredient = ingredientObj => {
  console.log("Raw ingredient object received:", ingredientObj);
  
  if (!ingredientObj) {
    console.warn("No ingredient object provided");
    return;
  }

  if (!ingredientObj.ingredient_id && !ingredientObj.ingredient_name) {
    console.warn("Invalid ingredient attempted - missing both ID and name:", ingredientObj);
    return;
  }

  if (!ingredientObj.ingredient_id) {
    console.log("Ingredient missing ID, checking if it's a valid ingredient name:", ingredientObj.ingredient_name);
    
    const foundIngredient = allIngredients.find(ing => 
      (ing.ingredient_name || ing) === ingredientObj.ingredient_name
    );
    
    if (foundIngredient) {
      console.log("Found matching ingredient with ID:", foundIngredient);
      ingredientObj = foundIngredient;
    } else {
      console.log("Creating new ingredient with temporary ID");
      ingredientObj = {
        ...ingredientObj,
        ingredient_id: Date.now()
      };
    }
  }

  console.log("Final ingredient object to add:", ingredientObj);
  setSelectedIngredients(prev => [...prev, ingredientObj]);
};

 const removeIngredient = idOrName =>
  setSelectedIngredients(prev =>
    prev.filter(i =>
       i.ingredient_id !== idOrName && i.ingredient_name !== idOrName
     )
   );

   const updateStep = (index, field, value) => {
    setSteps(prev =>
      prev.map((s, i) =>
        i === index ? { ...s, [field]: value } : s
      )
    );
  };

  const addStep = () => {
    setSteps(prev => [
      ...prev,
      { step_number: prev.length + 1, step_description: '', time_required: 0 }
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
      return setError("Image URL required.");
    }

    if (!description.trim()) {
      return setError("Description required.");
    }

    if (!selectedIngredients.length) {
      return setError("Add at least one ingredient.");
    }

    setError("");

    console.log("Selected ingredients for validation:", selectedIngredients);

    const validIngredients = selectedIngredients.filter(i => {
      const isValid = !!(i.ingredient_id || i.ingredient_name);
      console.log(`Ingredient validation - ${i.ingredient_name}: ID=${i.ingredient_id}, Valid=${isValid}`);
      return isValid;
    });

    console.log("Valid ingredients after filtering:", validIngredients);

    if (validIngredients.length === 0) {
      return setError("Add at least one valid ingredient.");
    }

    const ingredientsPayload = validIngredients.map(i => {
      console.log(`Processing ingredient for payload: ${i.ingredient_name}, ID: ${i.ingredient_id}`);
      
      if (!i.ingredient_id) {
        console.log(`Ingredient ${i.ingredient_name} missing ID, searching in allIngredients...`);
        console.log("Available ingredients:", allIngredients.map(ing => ing.ingredient_name || ing));
        
        const foundIngredient = allIngredients.find(ing => {
          const ingName = ing.ingredient_name || ing;
          const match = ingName.toLowerCase() === i.ingredient_name.toLowerCase();
          console.log(`Comparing "${ingName}" with "${i.ingredient_name}": ${match}`);
          return match;
        });
        
        if (foundIngredient && foundIngredient.ingredient_id) {
          console.log(`Found matching ingredient with ID for ${i.ingredient_name}:`, foundIngredient);
          return {
            ingredient_id: foundIngredient.ingredient_id,
            quantity_numerical: 1,
            quantity_unit: i.quantity_unit ?? ""
          };
        } else {
          console.warn(`No ID found for ingredient: ${i.ingredient_name}`);
          console.log("foundIngredient:", foundIngredient);
          return {
            ingredient_name: i.ingredient_name,
            quantity_numerical: 1,
            quantity_unit: i.quantity_unit ?? ""
          };
        }
      }
      
      return {
        ingredient_id: i.ingredient_id,
        quantity_numerical: 1,
        quantity_unit: i.quantity_unit ?? ""
      };
    });

    const instructionsPayload = steps.map(s => ({
      step_number: s.step_number,
      step_description: s.step_description.trim(),
      time_required: s.time_required
    }));

    const payload = {
      recipe_name: recipeName.trim(),
      recipe_img_url: imageUrl.trim(),
      recipe_description: description.trim(),
      ingredients: ingredientsPayload,
      instructions: instructionsPayload
    };

    try {
      console.log("=== RECIPE CREATION PAYLOAD ===");
      console.log("Selected ingredients before processing:", selectedIngredients);
      console.log("Valid ingredients after filtering:", validIngredients);
      console.log("Ingredients payload for backend:", ingredientsPayload);
      console.log("Full payload being sent:", payload);
      console.log("=== END PAYLOAD DEBUG ===");
      
      const savedRecipe = await postNewRecipe(userId, payload);

      if (!savedRecipe) {
        throw new Error("Recipe creation failed with no response.");
      }

      console.log("=== RECIPE CREATION RESPONSE ===");
      console.log("Saved recipe response:", savedRecipe);
      console.log("=== END RESPONSE DEBUG ===");

      const completeRecipe = {
        ...savedRecipe,
        ingredients: ingredientsPayload.map(ing => ({
          ingredient_id: ing.ingredient_id,
          ingredient_name: ing.ingredient_name || allIngredients.find(ai => ai.ingredient_id === ing.ingredient_id)?.ingredient_name,
          quantity_numerical: ing.quantity_numerical,
          quantity_unit: ing.quantity_unit,
          dietary_restrictions: []
        })),
        instructions: instructionsPayload,
        created_by_username: user?.username || "You"
      };

      console.log("Complete recipe object:", completeRecipe);

      Alert.alert("Success", `"${savedRecipe.recipe_name}" saved successfully.`);
      navigation.navigate("Profile", { newRecipe: completeRecipe });
    } catch (err) {
      console.error("Error saving recipe:", err);
      const serverMsg = err.response?.data?.msg || err.message;
      setError(serverMsg || "Failed to save recipe. Please try again.");
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
              <View key={`step-${s.step_number}`} style={localStyles.stepRow}>
                <Text style={localStyles.stepLabel}>Step {s.step_number}</Text>
                <TextField
                  placeholder={`Describe step ${s.step_number}`}
                  value={s.step_description}
                  onChangeText={text => updateStep(index, 'step_description', text)}
                  multiline
                  style={localStyles.stepInput}
                  fieldStyle={localStyles.field}
                />
                <View style={localStyles.timeRow}>
                  <Text style={localStyles.timeLabel}>Time (minutes):</Text>
                  <TextField
                    placeholder="0"
                    value={s.time_required.toString()}
                    onChangeText={text => updateStep(index, 'time_required', parseInt(text) || 0)}
                    keyboardType="numeric"
                    style={localStyles.timeInput}
                    fieldStyle={localStyles.field}
                  />
                  {s.time_required > 0 && (
                    <Text style={localStyles.timePreview}>
                      Timer: {s.time_required} min{s.time_required !== 1 ? 's' : ''}
                    </Text>
                  )}
                </View>
                {steps.length > 1 && (
                  <Button
                    label="Remove"
                    link
                    onPress={() => removeStep(index)}
                    style={localStyles.removeButton}
                  />
                )}
              </View>
            ))}
            <TouchableOpacity style={localStyles.addStepButton} onPress={addStep}>
              <Text style={localStyles.addStepText}>+ Add Step</Text>
            </TouchableOpacity>
          </View>
        </Card>

        <TouchableOpacity 
          style={localStyles.saveButton}
          onPress={onSavePress}
        >
          <Text style={localStyles.buttonText}>Save Recipe</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={localStyles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={localStyles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: '#f8f9fa' 
  },

  contentContainer: { 
    paddingBottom: 40 
  },

  card: { 
    padding: 24, 
    borderRadius: 20, 
    backgroundColor: '#ffffff', 
    marginBottom: 32, 
    shadowColor: '#000', 
    shadowOpacity: 0.08, 
    shadowOffset: { width: 0, height: 4 }, 
    shadowRadius: 12, 
    elevation: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0'
  },

  input: { 
    marginVertical: 24,
    fontSize: 16
  },

  field: { 
    backgroundColor: '#f8f9fa', 
    borderRadius: 12, 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderWidth: 1.5, 
    borderColor: '#e9ecef',
    fontSize: 16,
    marginBottom: 8
  },

  textArea: { 
    minHeight: 100,
    marginVertical: 24,
    fontSize: 16
  },

  previewImage: { width: '100%', 
    height: 200, 
    borderRadius: 12, 
    marginVertical: 12 
  },

  section: { 
    marginVertical: 24,
    paddingVertical: 12
  },

  sectionTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    marginBottom: 16, 
    color: '#2c3e50',
    letterSpacing: 0.5
  },

  chipContainer: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginTop: 12,
    gap: 8
  },

  chip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#e8f4fd', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 20, 
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#bee5eb'
  },

  chipText: { 
    marginRight: 8, 
    color: '#1e6091',
    fontWeight: '500',
    fontSize: 14
  },

  chipRemove: { 
    fontWeight: 'bold', 
    color: '#dc3545',
    fontSize: 16,
    paddingLeft: 4
  },

  stepRow: { 
    backgroundColor: '#f8f9fa', 
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#e9ecef',
    shadowColor: '#000',
    shadowOpacity: 0.03,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2
  },

  stepLabel: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 12, 
    color: '#495057'
  },

  stepInput: { 
    marginBottom: 12,
    fontSize: 16
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff3cd',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffeaa7'
  },

  timeLabel: {
    marginRight: 12,
    fontWeight: '600',
    color: '#856404',
    fontSize: 14
  },

  timeInput: {
    marginLeft: 8,
    marginRight: 12,
    width: 80,
    textAlign: 'center'
  },

  timePreview: {
    marginLeft: 12,
    color: '#856404',
    fontStyle: 'italic',
    fontWeight: '500'
  },

  removeButton: { 
    marginTop: 12,
    alignSelf: 'flex-end'
  },

  addButton: { 
    marginTop: 8,
    alignSelf: 'center',
    paddingVertical: 12
  },

  addStepButton: {
    backgroundColor: '#f6c47b',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },

  addStepText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },

  error: { 
    backgroundColor: '#f8d7da', 
    color: '#721c24', 
    padding: 16, 
    borderRadius: 12, 
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#f5c6cb'
  },

  saveButton: {
    backgroundColor: '#f6c47b',
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4
  },

  cancelButton: {
    backgroundColor: '#f6c47b',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2
  },

  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  }
});