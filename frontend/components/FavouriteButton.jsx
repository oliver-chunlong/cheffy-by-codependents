import { Button, View } from "react-native-ui-lib";
import {
  postRecipeToFavourites,
  requestFavouriteRecipes,
  removeRecipeFromFavourites,
} from "../utils/axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import Heart from "../assets/Heart.png";
import HeartClicked from "../assets/HeartClicked.png";
import Toast from "react-native-toast-message";

export default function FavouriteButton({ recipe_id, onToggle }) {
  const { user } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!user) return;

    requestFavouriteRecipes(user.id)
    .then((res) => {
       const arr = Array.isArray(res) ? res : res.recipes || [];
      const favourites = arr.map((recipe) => recipe.recipe_id);
      if (favourites.includes(recipe_id)) {
        setIsClicked(true);
      }
    })
    .catch(() => {
  })
  }, [user, recipe_id]);

  const handleToggle = () => {
    if (!user) {
      Toast.show({
        type: "error",
        text1: "Please log in to favourite",
      });
      return;
    }
    const newClickedState = !isClicked;
    setIsClicked(newClickedState);

    const action = newClickedState
      ? postRecipeToFavourites(user.id, recipe_id)
      : removeRecipeFromFavourites(user.id, recipe_id);

    action
      .then(() => {
        Toast.show({
          type: "success",
          text1: newClickedState
            ? "Added to favourites"
            : "Removed from favourites",
          position: "bottom",
        });
         if (onToggle) onToggle(newClickedState);
      })
      .catch(() => {
        setIsClicked(!newClickedState);
        Toast.show({
          type: "error",
          text1: "Oh no! Something went wrong!",
          text2: "Please try again later.",
          position: "bottom",
        });
      });
  };

  return (
    <View>
      <Button
        title="Add to favourites"
        onPress={handleToggle}
        iconSource={isClicked ? HeartClicked : Heart}
        iconStyle={{ width: 30, height: 30, tintColor: undefined }}
        backgroundColor="transparent"
      />
    </View>
  );
}
