import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import { GridList, Spacings } from "react-native-ui-lib";
import SearchBar from "./SearchBar";
import { requestRecipes } from "../../utils/axios";

export default function RecipeList({ searchQuery, filterBy, category }) {
  //changes to filtering logic required

  const [allRecipes, setAllRecipes] = useState(
    [1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => ({
      id: index,
      recipe_name: "Pasta",
      recipe_description: "Good",
      recipe_img_url:
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2016%2F04%2F15%2F09%2F10%2Fpasta-1330541_960_720.jpg&f=1&nofb=1&ipt=9bf6aeddefd9e7c4737bd557fe3ea88371137a67224cdd7df784e6a0dd6814e4",
    }))
  );

  useEffect(() => {
    // requestRecipes.then((recipes) => {
    //   setAllRecipes(recipes);
    // });
    // useEffect(() => {
    //   /*Function to get recipes from the database*/
    //   /*UtilFunctionHere*/ .then((recipes) => {
    //     setAllRecipes(recipes);
    //     setFilteredRecipes(recipes);
    //   });
    // }, []);
  });

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
