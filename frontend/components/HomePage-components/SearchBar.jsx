import { useState } from "react";
import { View, TextInput, Image } from "react-native";
import  {styles}  from "../../styles/styles";

export default function SearchBar({ recipes, setFilteredRecipes }) {
  const [query, setQuery] = useState("");

  const handleSearch = (text) => {
    setQuery(text);
    const lower = text.toLowerCase();
    const filtered = recipes.filter((recipe) =>
      recipe.recipe_name.toLowerCase().includes(lower) ||
      recipe.recipe_description.toLowerCase().includes(lower)
    );
    console.log("Filtered recipes:", filtered);
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