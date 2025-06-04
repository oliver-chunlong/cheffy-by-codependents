import { useRef, useState } from "react";

import {
  SearchInput,
  Typography,
  Colors,
  Picker,
  Modal,
  Button,
  Text,
  View,
} from "react-native-ui-lib";

export default function SearchBar({
  setSearchQuery,
  setFilterBy,
  setCategory,
  setOrder,
}) {
  const searchInput = useRef(null);
  const [isModalVisible, setIsVisible] = useState(false);

  //temporary states for search input and filters
  const [tempFilter, setTempFilter] = useState("");
  const [tempCategory, setTempCategory] = useState("");
  const [tempOrder, setTempOrder] = useState("");

  const filterOptions = [
    { label: "Vegan", value: "js", labelStyle: Typography.text65 },
    { label: "Gluten-Free", value: "java", labelStyle: Typography.text65 },
    { label: "Vegetarian", value: "python", labelStyle: Typography.text65 },
    {
      label: "Dairy-Free",
      value: "c++",
      disabled: true,
      labelStyle: Typography.text65,
    },
    { label: "Nut-Free", value: "perl", labelStyle: Typography.text65 },
  ];

  const sortOptions = [
    { label: "Ascending", value: "js", labelStyle: Typography.text65 },
    { label: "Descending", value: "python", labelStyle: Typography.text65 },
  ];

  const categoryOptions = [
    { label: "Breakfast", value: "js", labelStyle: Typography.text65 },
    { label: "Lunch", value: "java", labelStyle: Typography.text65 },
    { label: "Dinner", value: "python", labelStyle: Typography.text65 },
    {
      label: "Dessert",
      value: "c++",
      disabled: true,
      labelStyle: Typography.text65,
    },
  ];

  // functionality to trigger re-render of RecipeList with search/filters, invoked by Search button
  const handleSearch = () => {
    setSearchQuery(tempQuery);
    setFilterBy(tempFilter);
    setCategory(tempCategory);
    setOrder(tempOrder);
    console.log("search button pressed", tempQuery, tempFilter, tempCategory);
    setTempQuery("");
    console.log("search button pressed", tempQuery, tempFilter, tempCategory);
    setShowFilters(false); // closes filter window
  };
  return (
    <View>
      <View row spread>
        <SearchInput
          style={{ minWidth: "50%" }}
          ref={searchInput}
          placeholder={"Search recipes..."}
          // onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          round
          onPress={() => {
            setIsVisible(true);
          }}
          iconSource={() => <Text>E</Text>}
        />
      </View>
      {/* Filter By Dropdown */}
      <Modal
        visible={isModalVisible}
        onBackgroundPress={() => setIsVisible(false)}
        overlayBackgroundColor="rgba(141, 141, 141, 0.34)"
      >
        <View useSafeArea>
          <Picker
            placeholder="Filter By"
            // value={tempFilter}
            useDialog
            // onChange={(item) => setFilterBy(item.value)}
            items={filterOptions}
          />
          <Picker
            placeholder="Category"
            // value={tempCategory}
            useDialog
            // onChange={(item) => setCategory?.(item.value)}
            items={categoryOptions}
          />
          <Picker
            placeholder="Order by"
            // value={"js"}
            useDialog
            // onChange={(item) => setCategory?.(item.value)}
            items={sortOptions}
          />
        </View>
      </Modal>
    </View>
  );
}
