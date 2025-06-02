import { View, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import TTSSample from "../TTSSample";
import SpeechRecogSample from "../SpeechRecogSample";

export default function SearchBar({
  setSearchQuery,
  setFilterBy,
  setCategory,
}) {
  return (
    <View>
      {/* Search Input */}
      <TextInput
        type="text"
        placeholder="Search recipes..."
        onChange={(e) => setSearchQuery(e.target.value)}
        // style={styles.searchInput}
      />
      {/* Filter By Dropdown */}
      <Picker
        onChange={(e) => setFilterBy(e.target.value)}
        // style={styles.filterSelect}
      >
        <Picker.Item label="Filter By" value="" />
        <Picker.Item label="Vegan" value="vegan" />
        <Picker.Item label="Gluten-Free" value="gluten-free" />
        <Picker.Item label="Vegetarian" value="vegetarian" />
        <Picker.Item label="Dairy-Free" value="dairy-free" />
        <Picker.Item label="Nut-Free" value="nut-free" />
        <Picker.Item label="Pescatarian" value="pescatarian" />
      </Picker>
      {/* Category Dropdown */}
      <Picker
        onChange={(e) => setCategory(e.target.value)}
        // style={styles.categorySelect}
      >
        <Picker.Item label="Category" value="" />
        <Picker.Item label="Breakfast" value="breakfast" />
        <Picker.Item label="Lunch" value="lunch" />
        <Picker.Item label="Dinner" value="dinner" />
        <Picker.Item label="Dessert" value="dessert" />
      </Picker>
    </View>
  );
}
