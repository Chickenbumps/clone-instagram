import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

function SearchPage(props) {
  const [users, setUsers] = useState([]);

  const onFetchUsers = (search) => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((response) => {
        let usersData = response.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(usersData);
      });
  };
  return (
    <View>
      <TextInput
        style={{ marginTop: 50, marginLeft: 30 }}
        placeholder="Type Here..."
        onChangeText={(search) => onFetchUsers(search)}
      />
      <FlatList
        style={{ marginTop: 10, marginLeft: 30 }}
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default SearchPage;
