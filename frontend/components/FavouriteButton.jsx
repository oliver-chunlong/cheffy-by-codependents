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
import { styles } from "../styles/styles.js";

export default function FavouriteButton({ recipe_id, onToggle }) {
  const { user, login } = useContext(UserContext);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (!user) return;

    requestFavouriteRecipes(user.id)
      .then((res) => {
        const arr = Array.isArray(res) ? res : res.favourites || [];
        const favourites = arr.map((recipe) => recipe.recipe_id);
        if (favourites.includes(recipe_id)) {
          setIsClicked(true);
        }
      })
      .catch((err) => {
        console.error("Failed to load favourites:", err);
      });
  }, [user, recipe_id]);

  const handleToggle = async (localUser = user) => {
    if (!localUser) {
      Toast.show({
        type: "error",
        position: "bottom",
        props: { text1: "Please log in to favourite", icon: Heart },
      });
      return;
    }

    const newClickedState = !isClicked;
    setIsClicked(newClickedState);

    try {
      if (newClickedState) {
        const res = await postRecipeToFavourites(localUser.id, recipe_id);
        console.log("Favourite added:", res);
      } else {
        const res = await removeRecipeFromFavourites(localUser.id, recipe_id);
        console.log("Favourite removed:", res);
      }

      Toast.show({
        type: "customToast",
        position: "bottom",
        props: {
          text1: newClickedState
            ? "Added to favourites"
            : "Removed from favourites",
          icon: newClickedState ? HeartClicked : Heart,
        },
      });

      if (onToggle) onToggle(newClickedState);
    } catch (error) {
      console.error("Error updating favourite:", error);
      setIsClicked(!newClickedState);
      Toast.show({
        type: "customToast",
        position: "bottom",
        props: {
          text1: "Oh no! Something went wrong!",
          text2: "Please try again later.",
        },
      });
    }
  };

  const onPress = async () => {
    if (!user) {
      const u = await login("default", "123");
      if (u) {
        handleToggle(u);
      } else {
        Toast.show({
          type: "error",
          position: "bottom",
          props: {
            text1: "Please log in to favourite",
            icon: Heart,
          },
        });
      }
    } else {
      handleToggle();
    }
  };

  return (
    <View style={styles.favouriteContainer}>
      <Button
        style={styles.favouriteButton}
        onPress={onPress}
        iconSource={isClicked ? HeartClicked : Heart}
        iconStyle={{ width: 30, height: 30, tintColor: undefined }}
        backgroundColor="transparent"
      />
    </View>
  );
}
