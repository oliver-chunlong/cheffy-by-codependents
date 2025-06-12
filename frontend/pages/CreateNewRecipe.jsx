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
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4
  },

  timeLabel: {
    marginRight: 8,
    fontWeight: '500',
    color: '#444'
  },

  timeInput: {
    marginLeft: 8,
    marginRight: 8,
    width: 80
  },

  timePreview: {
    marginLeft: 8,
    color: '#888'
  }
});