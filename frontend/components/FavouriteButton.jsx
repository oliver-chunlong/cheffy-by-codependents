import React, { useContext } from 'react';
import { View } from 'react-native-ui-lib';
import { Button } from 'react-native-ui-lib';
import Heart from '../assets/Heart.png';
import HeartClicked from '../assets/HeartClicked.png';
import Toast from 'react-native-toast-message';
import { UserContext } from '../context/UserContext';
import { styles } from '../styles/styles';

export default function FavouriteButton ({recipeId, isFavourite, onToggle}) {
  const { user, login } = useContext(UserContext);

  const handlePress = async () => {
    if (!user) {

      const u = await login('default', '123');
      if (!u) {
        Toast.show({
          type: 'error',
          text1: 'Please log in to favourite',
          position: 'bottom'
        });
        return;
      }

    })
    .catch(() => {
  })
  }, [user, recipe_id]);

  const handleToggle = (localUser = user) => {
    if (!localUser) {
      Toast.show({
        type: "error",
        position: "bottom",
        props: { text1: "Please log in to favourite", icon: Heart },
      });
      return;

//     }


//     onToggle(!isFavourite);
// =======
//     const action = newClickedState
//       ? postRecipeToFavourites(localUser.id, recipe_id)
//       : removeRecipeFromFavourites(localUser.id, recipe_id);

//     action
//       .then(() => {
//         Toast.show({
//           type: "customToast",
//           position: "bottom",
//           props: {
//             text1: newClickedState
//               ? "Added to favourites"
//               : "Removed from favourites",

//             icon: newClickedState ? HeartClicked : Heart,
//           },
//         });
//          if (onToggle) onToggle(newClickedState);
//       })
//       .catch(() => {
//         setIsClicked(!newClickedState);
//         Toast.show({
//           type: "customToast",
//           position: "bottom",
//           props: {
//             text1: "Oh no! Something went wrong!",
//             text2: "Please try again later.",
//           },
//         });
//       });

//   };

  return (
    <View style={styles.favouriteContainer}>
      <Button
        style={styles.favouriteButton}

        onPress={handlePress}
        iconSource={isFavourite ? HeartClicked : Heart}
        iconStyle={{ width: 30, height: 30, tintColor: undefined }}
        backgroundColor="transparent"
      />

//         title="Add to favourites"
//         onPress={async () => {
//           if (!user) {
//             const u = await login("default", "123");
//             if (u) {
//               handleToggle(u);
//             } else {
//               Toast.show({
//                 type: "error",
//                 position: "bottom",
//                 props: {
//                   text1: "Please log in to favourite",
//                   icon: Heart,
//                 },
//               });
//             }
//           } else {
//             handleToggle();
//           }
//         }}
//         iconSource={isClicked ? HeartClicked : Heart}
//         iconStyle={{ width: 30, height: 30, tintColor: undefined }}
//         backgroundColor="transparent"
      ></Button>

    </View>
  );
}
