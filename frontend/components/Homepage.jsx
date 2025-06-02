import { View, ScrollView, StyleSheet } from "react-native";
import React, {useState} from "react";
import TTSSample from "./components/TTSSample";
import SpeechRecogSample from "./components/SpeechRecogSample";
import NavBar from "./components/NavBar";
import RecipeList from "./HomePage-components/RecipeList";
import SearchBar from "./HomePage-components/SearchBar";
import Header from "./HomePage-components/Header";

export default function Homepage() {

    const [searchQuery, setSearchQuery] = useState()
    const [filterBy, setFilterBy] = useState()
    const [category, setCategory] = useState()
    
    return (
        <View>
            <Header /*Header Content Here - logo, "Recipes", Profile Button*/ />
            <SearchBar setSearchQuery={setSearchQuery} setFilterBy={setFilterBy} setCategroy={setCategory} /*SearchBar content - Search, FilterBy, and Category*/ />
            <ScrollView /*Scroll View houses RecipeList to allow scrollable contnet within section*/>
                <RecipeList searchQuery={searchQuery} filterBy={filterBy} category={category} /*RecipeList calls RecipeCards */ />
            </ScrollView>
            <NavBar />
        </View>
    )
}