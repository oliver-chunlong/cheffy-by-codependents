import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function IngredientAutocomplete({ allIngredients, onAdd }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      const filtered = allIngredients
        .filter(item =>
          item.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, allIngredients]);

  const handleAdd = name => {
    onAdd(name);
    setQuery("");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={() => handleAdd(item)}>
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search ingredients"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={item => item}
          renderItem={renderItem}
          style={styles.suggestionsList}
          keyboardShouldPersistTaps="handled"
        />
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
    backgroundColor: '#fff',
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
});
