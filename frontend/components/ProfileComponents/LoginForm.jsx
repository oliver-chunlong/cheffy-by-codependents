import React, { useState, useContext } from 'react';
import { View, Text, TextField, Button } from 'react-native-ui-lib';
import { UserContext } from '../../context/UserContext';

export default function LoginForm() {
  const { login } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login( username, password );
  };

  return (
    <View padding-page flex centerV>
      <Text text50 margin-20 center>Sign In</Text>

      <TextField
        floatingPlaceholder
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        marginB-16
      />

      <TextField
        floatingPlaceholder
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        marginB-24
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
