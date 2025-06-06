import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FavouriteButton from "../FavouriteButton";

export default function Completed() {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Recipe complete! - Enjoy your meal!</Text>
      <Text>Want to save this recipe for later?</Text>
      <FavouriteButton />
      <Button
        title="return to homepage"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
}
