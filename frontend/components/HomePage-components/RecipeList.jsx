import { View, StyleSheet } from "react-native";
import TTSSample from "./components/TTSSample";
import SpeechRecogSample from "./components/SpeechRecogSample";
import RecipeCard from "./components/RecipeCard";


export default function RecipeList() {
    /*Function to get recipes from the database*/
    .then((recipes) => {
        recipes.map((recipe) => {
            return (
                <RecipeCard key={recipe.id} recipe={recipe}/>
            )
        })
    })

}