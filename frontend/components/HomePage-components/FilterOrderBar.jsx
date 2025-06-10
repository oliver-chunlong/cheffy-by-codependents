import { View, Text, Picker } from "react-native-ui-lib";
import { ScrollView } from "react-native";
// import { Picker } from "@react-native-picker/picker";
import { styles } from "../../styles/styles";

const filters = [
  { label: "Vegan", key: "is_vegan" },
  { label: "Vegetarian", key: "is_vegetarian" },
  { label: "Dairy-Free", key: "is_dairy_free" },
  { label: "Gluten-Free", key: "is_gluten_free" },
  { label: "Nut-Free", key: "is_nut_free" },
];

const sortItems =  [
        { value: "name_asc", label: 'A-Z' },
        { value: "name_desc", label: 'Z-A' },
        { value: "time_asc", label: 'Quickest → Longest' },
        { value: "time_desc", label: 'Longest → Quickest' },
      ];

function FilterOrderBar({ activeFilters, setActiveFilters, order, setOrder }) {
  const toggleFilter = key => {
    setActiveFilters(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.filterBar}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {filters.map(f => (
                <Text
                    key={f.key}
                    style={[
                    styles.filterText,
                    activeFilters[f.key] && styles.activeFilterText,
                    ]}
                    onPress={() => toggleFilter(f.key)}
                >
                    {f.label}
                </Text>
                ))}
  <View style={styles.orderPickerWrapper}>
    <Picker
      selectedValue={order}
      onValueChange={val => setOrder(val)}
      style={styles.orderPicker}
     placeholder={'↓↑'}
    //  label={'Sort'}
     items={sortItems}
    >
    </Picker>
  </View>
</ScrollView>

    </View>
  );
}
export default FilterOrderBar;
