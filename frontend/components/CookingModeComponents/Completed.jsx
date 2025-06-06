import { Button, Text, View } from "react-native-ui-lib";
import { useNavigation } from "@react-navigation/native";
import FavouriteButton from "../FavouriteButton";
import { styles } from "../../styles/styles";

export default function Completed() {
  const navigation = useNavigation();
  return (
    <View style={styles.cookingModeContainer}>
      <Text style={styles.cookingModeText}>Recipe complete! - Enjoy your meal!</Text>
      <Text style={styles.cookingModeText}>Want to save this recipe for later?</Text>
      <FavouriteButton style={styles.cookingModeButton}/>
      <Button
        onPress={() => navigation.navigate("Home")}
        style={styles.cookingModeButton}
        >
           <Text style={styles.cookingModeButtonText}>Return to Homepage</Text>
        </Button>
    
    </View>
  );
}
