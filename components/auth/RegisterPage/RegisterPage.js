import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import * as firebase from "firebase";
function RegisterPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    name: "",
  });
  const { email, password, name } = input;

  const onSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then((response) => {
        firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .set({
            name,
            email,
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View>
      <TextInput
        placeholder="name"
        onChange={(e) => setInput({ ...input, name: e.nativeEvent.text })}
      />
      <TextInput
        placeholder="email"
        onChange={(e) => setInput({ ...input, email: e.nativeEvent.text })}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChange={(e) => setInput({ ...input, password: e.nativeEvent.text })}
      />
      <Button title="Sign Up" onPress={onSignUp} />
    </View>
  );
}

export default RegisterPage;
