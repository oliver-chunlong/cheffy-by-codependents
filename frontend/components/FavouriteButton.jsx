import { Button, View, Text } from "react-native-ui-lib";
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

export default function FavouriteButton({ recipe_id }) {
  const { user, login } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!user) return;

    requestFavouriteRecipes(user.id).then((res) => {
      const favourites = res.map((recipe) => recipe.recipe_id);
      if (favourites.includes(recipe_id)) {
        setIsClicked(true);
      }
    });
  }, [user, recipe_id]);

  const handleToggle = (localUser = user) => {
    if (!localUser) {
      Toast.show({
        type: "error",
        text1: "Please log in to favourite",
      });
      return;
    }
    const newClickedState = !isClicked;
    setIsClicked(newClickedState);

    const action = newClickedState
      ? postRecipeToFavourites(localUser.id, recipe_id)
      : removeRecipeFromFavourites(localUser.id, recipe_id);

    action
      .then(() => {
        Toast.show({
          type: "success",
          text1: newClickedState
            ? "Added to favourites"
            : "Removed from favourites",
          position: "bottom",
        });
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
        onPress={async () => {
          if (!user) {
            const u = await login("default", "123");
            handleToggle(u);
          } else {
            handleToggle();
          }
        }}
        iconSource={isClicked ? HeartClicked : Heart}
        iconStyle={{ width: 30, height: 30, tintColor: undefined }}
        backgroundColor="transparent"
      >
        {!user && <Text>Log in and add to favourite</Text>}
      </Button>
    </View>
  );
}
