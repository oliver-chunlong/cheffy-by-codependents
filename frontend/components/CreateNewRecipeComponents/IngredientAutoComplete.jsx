import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function IngredientAutocomplete({ allIngredients, onAdd }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  
  // const ingredientIdMap = {
  //   'chickpeas': 1,
  //   'onion': 2,
  //   'garlic': 3,
  //   'ginger': 4,
  //   'tomato': 5,
  //   'cumin': 6,
  //   'coriander': 7,
  //   'turmeric': 8,
  //   'olive oil': 9,
  //   'basmati rice': 10,
  //   'mozzarella': 11,
  //   'pepperoni': 12,
  //   'basil': 13,
  //   'pasta': 14,
  //   'milk': 15,
  //   'butter': 16,
  //   'cheddar': 17,
  //   'tortilla': 18,
  //   'black beans': 19,
  //   'avocado': 20,
  //   'lime': 21,
  //   'soy sauce': 22,
  //   'tofu': 23,
  //   'broccoli': 24,
  //   'carrot': 25,
  //   'gluten-free flour': 26,
  //   'coconut milk': 27,
  //   'chilli pepper': 28
  // };

  useEffect(() => {
    console.log("All ingredients received:", allIngredients?.length || 0);
    if (allIngredients?.length > 0) {
      console.log("Sample ingredients:", allIngredients.slice(0, 3));
    }
  }, [allIngredients]);

  useEffect(() => {
    if (query.length > 0) {
      // Filter ingredients that match the query and add correct IDs
      const filtered = allIngredients
        .filter(ingredient => {
          const name = ingredient.ingredient_name || ingredient;
          return name.toLowerCase().startsWith(query.toLowerCase());
        })
        .map(ingredient => {
          const name = ingredient.ingredient_name || ingredient;
          const correctId = ingredientIdMap[name.toLowerCase()] || ingredientIdMap[name];
          return {
            ingredient_id: correctId,
            ingredient_name: name
          };
        })
        .filter(item => item.ingredient_id) // Only include items with valid IDs
        .slice(0, 5);

      console.log("Filtered suggestions:", filtered.map(item => 
        `${item.ingredient_name} (ID: ${item.ingredient_id})`
      ));

      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, allIngredients]);

  const handleAdd = ingredient => {
    console.log("Adding ingredient:", ingredient);
    onAdd(ingredient); // send full object
    setQuery("");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleAdd(item)}>
      <Text>{item.ingredient_name} (ID: {item.ingredient_id})</Text>
    </TouchableOpacity>
  );

  const showAddOption = () => {
    const exists = allIngredients
      .map(i => (i.ingredient_name || i).toLowerCase())
      .includes(query.toLowerCase());

    return query.length > 0 && !exists;
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search or add ingredients"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {(suggestions.length > 0 || showAddOption()) && (
        <View style={styles.suggestionsList}>
          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={item => String(item.ingredient_id)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestionItem}
                  onPress={() => handleAdd(item)}
                >
                  <Text>{item.ingredient_name} (ID: {item.ingredient_id})</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          )}
          {showAddOption() && (
            <TouchableOpacity
              style={styles.addItem}
              onPress={() =>
                handleAdd({
                  ingredient_id: Date.now(),
                  ingredient_name: query
                })
              }
            >
              <Text style={styles.addText}>Add "{query}"</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  suggestionsList: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    maxHeight: 150,
    marginTop: 4,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  addItem: {
    padding: 12,
    alignItems: 'center',
  },
  addText: {
    fontStyle: 'italic',
  },
});