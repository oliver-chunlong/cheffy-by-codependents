import { View, StyleSheet, TextInput, TouchableOpacity, Modal, Text } from "react-native";
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function SearchBar({
  setSearchQuery,
  setFilterBy,
  setCategory,
  setOrder
}) {
    const [showFilters, setShowFilters] = useState(false);

    //temporary states for search input and filters
    const [tempQuery, setTempQuery] = useState("");
    const [tempFilter, setTempFilter] = useState("");
    const [tempCategory, setTempCategory] = useState("");
    const [tempOrder, setTempOrder] = useState("");

    // functionality to trigger re-render of RecipeList with search/filters, invoked by Search button
    const handleSearch = () => {
    setSearchQuery(tempQuery);
    setFilterBy(tempFilter);
    setCategory(tempCategory);
    setOrder(tempOrder);
    setTempQuery("");
    setShowFilters(false); // closes filter window
  };
  return (
    <View /*container for whole section*/ >
      <View>
      {/* Search Input */}
      <TextInput
        type="text"
        placeholder="Search recipes..."
        onChangeText={setTempQuery}
        // style={styles.searchInput}
        />
        <TouchableOpacity onPress={() => setShowFilters(!showFilters) }>
            <Ionicons name="filter" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearch}>
            <Text>Search</Text>
        </TouchableOpacity>
    </View>

    
      {/* Filter By Dropdown */}
      {showFilters && (
      <View /*overlay styling to be added*/>
        <View /*content styling to be added*/>
      <Picker
        selectedValue={tempFilter}
        onValueChange={(value) => setTempFilter(value)}
        // style={styles.filterSelect}
        >
        <Picker.Item label="Filter By" value="" />
        <Picker.Item label="Vegan" value="is_vegan" />
        <Picker.Item label="Gluten-Free" value="is_gluten-free" />
        <Picker.Item label="Vegetarian" value="is_vegetarian" />
        <Picker.Item label="Dairy-Free" value="is_dairy-free" />
        <Picker.Item label="Nut-Free" value="is_nut-free" />
        <Picker.Item label="Pescatarian" value="is_pescatarian" />
      </Picker>
      {/* Category Dropdown */}
      <Picker
        selectedValue={tempCategory}
        onValueChange={(value) => setTempCategory(value)}
        // style={styles.categorySelect}
        >
        <Picker.Item label="Category" value="" />
        <Picker.Item label="Breakfast" value="breakfast" />
        <Picker.Item label="Lunch" value="lunch" />
        <Picker.Item label="Dinner" value="dinner" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>
      <Picker
        selectedValue={tempOrder}
        onValueChange={(value) => setTempOrder(value)}>
            <Picker.Item label="Order By" value="asc" />
            <Picker.Item label="Ascending" value="asc" />
            <Picker.Item label="Descending" value="desc" />
        </Picker>
            </View>
        </View>
        )}
  </View>
  );
}
