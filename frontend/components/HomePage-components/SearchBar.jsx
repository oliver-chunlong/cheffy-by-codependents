import { View, StyleSheet } from "react-native";
import TTSSample from "./components/TTSSample";
import SpeechRecogSample from "./components/SpeechRecogSample";

export default function SearchBar(setSearchQuery, setFilterBy, setCategory) {

    return (
        <View style={styles.searchBar}>
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search recipes..."
                onChange={(e) => setSearchQuery(e.target.value)}
                style={styles.searchInput}
            />
            {/* Filter By Dropdown */}
            <select
                onChange={(e) => setFilterBy(e.target.value)}
                style={styles.filterSelect}
            >
                <option value="">Filter By</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="dairy-free">Dairy-Free</option>
                <option value="nut-free">Nut-Free</option>
                <option value="pescatarian">Pescatarian</option>
            </select>
            {/* Category Dropdown */}
            <select
                onChange={(e) => setCategory(e.target.value)}
                style={styles.categorySelect}
            >
                <option value="">Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="dessert">Dessert</option>
            </select>
        </View>
    )
}