import { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { requestRecipes } from "../../utils/axios";
import  {styles}  from "../../styles/styles";
import Loading from "../Loading";
import RecipeCard from './RecipeCard';
import { BlurView } from 'expo-blur';

const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const itemMargin = 8;
const itemWidth = (screenWidth - itemMargin * (numColumns + 1)) / numColumns;

export default function RecipeList({ recipes }) {
  const navigation = useNavigation();

  const renderItem = ({ item }) => <RecipeCard 
    recipe={item} 
    cardWidth={itemWidth}
    cardMargin={itemMargin}
    />;

  if (!recipes || recipes.length === 0) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={recipes}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.recipe_id ? item.recipe_id.toString() : index.toString()
        }
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      />
      <BlurView
        intensity={40}
        tint="light"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
        }}
      />
    </View>
  );
}
