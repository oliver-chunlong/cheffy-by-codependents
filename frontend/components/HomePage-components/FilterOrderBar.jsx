import React, { useState } from "react";
import { ScrollView, Dimensions, TouchableOpacity, Modal } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { styles } from "../../styles/styles";

const filters = [
  { label: "Vegan", key: "is_vegan" },
  { label: "Vegetarian", key: "is_vegetarian" },
  { label: "Dairy-Free", key: "is_dairy_free" },
  { label: "Gluten-Free", key: "is_gluten_free" },
  { label: "Nut-Free", key: "is_nut_free" },
];

const sortItems = [
  { value: "name_asc", label: "A-Z" },
  { value: "name_desc", label: "Z-A" },
  { value: "time_asc", label: "Quickest recipes" },
  { value: "time_desc", label: "Longest recipes" },
];

function FilterOrderBar({ activeFilters, setActiveFilters, order, setOrder }) {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  const toggleFilter = (key) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSortChange = (value) => {
    setOrder(value);
    setIsSortDropdownOpen(false);
  };

  const currentSortLabel =
    sortItems.find((item) => item.value === order)?.label || "Sort By";

  return (
    <View style={styles.filterBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 0,
          paddingBottom: 5,
          paddingLeft: 2,
          paddingRight: 15,
        }}
      >
        <View style={styles.orderPickerWrapper}>
          <TouchableOpacity
            style={styles.orderPicker}
            onPress={() => setIsSortDropdownOpen(true)}
          >
            <Text style={styles.sortButtonText}>{currentSortLabel}</Text>
            <Text style={styles.dropdownArrow}>↓</Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={isSortDropdownOpen}
            onRequestClose={() => setIsSortDropdownOpen(false)}
          >
            <TouchableOpacity
              style={styles.modalOverlay}
              activeOpacity={1}
              onPress={() => setIsSortDropdownOpen(false)}
            >
              <View style={styles.dropdownContent}>
                {sortItems.map((item) => (
                  <TouchableOpacity
                    key={item.value}
                    style={[
                      styles.dropdownItem,
                      order === item.value && styles.activeDropdownItem,
                    ]}
                    onPress={() => handleSortChange(item.value)}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        order === item.value && styles.activeDropdownItemText,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </View>

        {filters.map((f) => (
          <View
            key={f.key}
            style={[
              styles.textWrapper,
              activeFilters[f.key] && styles.activeTextWrapper,
            ]}
          >
            <Text
              style={[styles.filterText]}
              onPress={() => toggleFilter(f.key)}
            >
              {f.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default FilterOrderBar;
