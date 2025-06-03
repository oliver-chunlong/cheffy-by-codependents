import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Completed() {
  const navigation = useNavigation();
  const handleAddFavourite = () => {
    //need to post recipe to user
  };
  return (
    <View>
      <Text>Recipe complete! - Enjoy your meal!</Text>
      <Text>Want to save this recipe for later?</Text>
      <Button title="add to favourites" onPress={handleAddFavourite} />
      <Button
        title="return to homepage"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
