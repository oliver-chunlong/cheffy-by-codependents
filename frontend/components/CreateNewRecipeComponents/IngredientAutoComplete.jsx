import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function IngredientAutocomplete({ allIngredients, onAdd }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
  if (query.length > 0) {
    const filtered = allIngredients
      .map((name, index) => ({
        ingredient_id: index + 1, // temp ID
        ingredient_name: name
      }))
      .filter(item =>
        item.ingredient_name.toLowerCase().startsWith(query.toLowerCase())
      )
      .slice(0, 5);

    setSuggestions(filtered);
  } else {
    setSuggestions([]);
  }
}, [query, allIngredients]);
  const handleAdd = ingredient => {
    onAdd(ingredient); // send full object
    setQuery("");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleAdd(item)}>
      <Text>{item.ingredient_name}</Text>
    </TouchableOpacity>
  );

const showAddOption = () => {
  const exists = allIngredients
    .filter(i => typeof i === 'object' && i.ingredient_name)
    .map(i => i.ingredient_name.toLowerCase())
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
                <Text>{item.ingredient_name}</Text>
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
