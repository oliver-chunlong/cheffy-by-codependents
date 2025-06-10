import { useState, useContext } from 'react';
import { View, Text, TextField, Button } from 'react-native-ui-lib';
import { UserContext } from '../../context/UserContext';

export default function LoginForm() {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('test user');
  const [password, setPassword] = useState('123');

  const handleSubmit = () => {
    login( username, password );
  };

  return (
    <View style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 20,
            marginBottom: 24,
            padding: 20,
            width: '90%',
            maxWidth: 400,
            minHeight: 300,
          }} >
      <Text text50 margin-20 center>Sign In</Text>

      <TextField
        floatingPlaceholder
        placeholder="Username:"
        onChangeText={setUsername}
        value={username}
        marginB-16
        style={{ borderColor: "black", borderWidth: 1}}
      />

      <TextField
        floatingPlaceholder
        placeholder="Password:"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        marginB-24
        style={{ borderColor: "black", borderWidth: 1}}
      />

      <Button
        label="Log In"
        onPress={handleSubmit}
        fullWidth
        style={{ borderRadius: 8 }}
      />
    </View>
  );
}
