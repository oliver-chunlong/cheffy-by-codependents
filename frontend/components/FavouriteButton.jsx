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
    }

    onToggle(!isFavourite);
  };

  return (
    <View style={styles.favouriteContainer}>
      <Button
        style={styles.favouriteButton}
        onPress={handlePress}
        iconSource={isFavourite ? HeartClicked : Heart}
        iconStyle={{ width: 30, height: 30, tintColor: undefined }}
        backgroundColor="transparent"
      />
    </View>
  );
}
