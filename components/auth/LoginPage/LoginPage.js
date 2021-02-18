import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import * as firebase from "firebase";
function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const { email, password } = input;

  const onSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="email"
        onChange={(e) => setInput({ ...input, email: e.nativeEvent.text })}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChange={(e) => setInput({ ...input, password: e.nativeEvent.text })}
      />
      <Button title="Sign In" onPress={onSignIn} />
    </View>
  );
}

export default LoginPage;
