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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return;
    }

    const checkFavorite = async () => {
      try {
        setIsLoading(true);
        const favorites = await requestFavouriteRecipes(user.id);
        console.log("Checking if recipe is favorited:", {
          recipe_id,
          favorites,
        });

        const isFavorited = Array.isArray(favorites)
          ? favorites.some((fav) => fav.recipe_id === recipe_id)
          : favorites?.favourites?.some((fav) => fav.recipe_id === recipe_id) ||
            false;

        console.log("Is recipe favorited:", isFavorited);
        setIsClicked(isFavorited);
      } catch (err) {
        console.error("Failed to load favourites:", err);
        setIsClicked(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkFavorite();
  }, [user, recipe_id]);

  const handleToggle = async (localUser) => {
    if (!localUser) {
      Toast.show({
        type: "customToast",
        position: "bottom",
        props: { text1: "Please log in to favourite", icon: Heart },
      });
      return;
    }

    try {
      setIsLoading(true);
      const newClickedState = !isClicked;

      if (newClickedState) {
        await postRecipeToFavourites(localUser.id, recipe_id);
        console.log("Favourite added successfully");
      } else {
        await removeRecipeFromFavourites(localUser.id, recipe_id);
        console.log("Favourite removed successfully");
      }

      setIsClicked(newClickedState);

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

      if (onToggle) {
        console.log("Calling onToggle callback");
        onToggle();
      }
    } catch (error) {
      console.error("Error updating favourite:", error);
      Toast.show({
        type: "customToast",
        position: "bottom",
        props: {
          text1: "Oh no! Something went wrong!",
          text2: "Please try again later.",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onPress = async () => {
    if (!user) {
      const u = await login("default", "123");
      if (u) {
        handleToggle(u);
      } else {
        Toast.show({
          type: "customToast",
          position: "bottom",
          props: {
            text1: "Please log in to favourite",
            icon: Heart,
          },
        });
      }
    } else {
      handleToggle(user);
    }
  };

  return (
    <View style={styles.favouriteContainer}>
      <Button
        style={styles.favouriteButton}
        onPress={onPress}
        disabled={isLoading}
        iconSource={isClicked ? HeartClicked : Heart}
        iconStyle={{ width: 30, height: 30, tintColor: undefined }}
        backgroundColor="transparent"
      />
    </View>
  );
}
