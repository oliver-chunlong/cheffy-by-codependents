import { Text, View } from "react-native";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import LoginForm from "../components/ProfileComponents/LoginForm";

export default function Profile() {
  const { user, login, error } = useContext(UserContext);

  return (
    <View>
      <Text>Profile</Text>
      {user ? <Text>logged in as {user.username}</Text> : <LoginForm />}
    </View>
  );
}
