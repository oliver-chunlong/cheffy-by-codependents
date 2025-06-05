import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { GridList, Spacings } from "react-native-ui-lib";
import SearchBar from "./SearchBar";
import { requestRecipes } from "../../utils/axios";

export default function RecipeList({ searchQuery, filterBy, category }) {
  //changes to filtering logic required

  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    requestRecipes().then((recipes) => {
      setAllRecipes(recipes);
      // useEffect(() => {
      //   /*Function to get recipes from the database*/
      //   /*UtilFunctionHere*/ .then((recipes) => {
      //     setAllRecipes(recipes);
      //     setFilteredRecipes(recipes);
      //   });
      // }, []);
    });
  }, []);

  return (
    <GridList
      ListHeaderComponent={() => <SearchBar />}
      data={allRecipes}
      renderItem={({ item }) => <RecipeCard recipe={item} />}
      // numColumns={2}
      maxItemWidth={140}
      itemSpacing={Spacings.s3}
      listPadding={Spacings.s5}
      // keepItemSize
    />
  );
}
