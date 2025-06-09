import React, { useState } from "react";
import { View, TextInput, Image } from "react-native";
import { styles } from "../../styles/styles";

export default function SearchBar({ allRecipes, setFilteredRecipes, activeFilters }) {
  const [query, setQuery] = useState("");

  const handleSearch = (text) => {
    console.log("Search text:", text);
    setQuery(text);
    const lower = text.toLowerCase();

    if (!Array.isArray(allRecipes)) {
      console.warn("allRecipes is not an array:", allRecipes);
      setFilteredRecipes([]);
      return;
    }
    console.log("allRecipes length:", allRecipes.length);

    let filtered = allRecipes.filter(recipe => {
      const nameMatch = recipe.recipe_name?.toLowerCase().includes(lower);
      const descMatch = recipe.recipe_description?.toLowerCase().includes(lower);
      return nameMatch || descMatch;
    });
    console.log("Filtered by text count:", filtered.length);

    if (!activeFilters || typeof activeFilters !== "object") {
      console.warn("activeFilters missing or not an object:", activeFilters);
    } else {
      Object.entries(activeFilters).forEach(([key, isActive]) => {
        if (isActive) {
          filtered = filtered.filter(recipe => recipe[key] === true);
          console.log(`Filtered by ${key} active, count now:`, filtered.length);
        }
      });
    }

    setFilteredRecipes(filtered);
  };

  return (
    <View style={styles.searchWrapper}>
      <Image
        source={require("../../assets/searchIcon.png")}
        style={styles.searchIconImage}
      />
      <TextInput
        // placeholder="Search"
        placeholderTextColor="#999"
        style={styles.searchInput}
        value={query}
        onChangeText={handleSearch}
      />
    </View>
  );
}
