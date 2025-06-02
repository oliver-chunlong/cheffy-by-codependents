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
}) {
  const searchInput = useRef(null);
  const [isModalVisible, setIsVisible] = useState(false);

  const options = [
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
            // floatingPlaceholder
            // value={"js"}
            useDialog
            // enableModalBlur={false}
            onChange={(item) => setCategory?.(item.value)}
            // topBarProps={{ title: "Languages" }}
            // showSearch
            // searchPlaceholder={"Search a restriction"}
            // searchStyle={{
            //   color: Colors.blue30,
            //   placeholderTextColor: Colors.grey50,
            // }}
            // onSearchChange={value => console.warn('value', value)}
            items={options}
          />
          <Picker
            placeholder="Filter By"
            // floatingPlaceholder
            // value={"js"}
            useDialog
            // enableModalBlur={false}
            onChange={(item) => setCategory?.(item.value)}
            // topBarProps={{ title: "Languages" }}
            // showSearch
            // searchPlaceholder={"Search a restriction"}
            // searchStyle={{
            //   color: Colors.blue30,
            //   placeholderTextColor: Colors.grey50,
            // }}
            // onSearchChange={value => console.warn('value', value)}
            items={options}
          />
        </View>
      </Modal>
    </View>
  );
}
