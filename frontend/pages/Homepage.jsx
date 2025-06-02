import { View, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import TTSSample from "../components/TTSSample";
import SpeechRecogSample from "../components/SpeechRecogSample";
import RecipeList from "../components/HomePage-components/RecipeList";
import SearchBar from "../components/HomePage-components/SearchBar";

export default function Homepage() {
  const [searchQuery, setSearchQuery] = useState();
  const [filterBy, setFilterBy] = useState();
  const [category, setCategory] = useState();

  return (
    <View>
      <SearchBar
        setSearchQuery={setSearchQuery}
        setFilterBy={setFilterBy}
        setCategory={
          setCategory
        } /*SearchBar content - Search, FilterBy, and Category*/
      />
      <ScrollView /*Scroll View houses RecipeList to allow scrollable contnet within section*/
      >
        <RecipeList
          searchQuery={searchQuery}
          filterBy={filterBy}
          category={category} /*RecipeList calls RecipeCards */
        />
      </ScrollView>
    </View>
  );
}
