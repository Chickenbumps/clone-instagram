import React, { useState, useEffect } from "react";
import { Button, FlatList, Text, View, StyleSheet, Image } from "react-native";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUserPosts,
  getUserFollowing,
} from "../../redux/_actions/user_action";

function ProfilePage(props) {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState("");
  const [follows, setFollows] = useState([]);
  const [following, setFollowing] = useState(false);
  useEffect(() => {
    const { user, userPosts } = props.route.params;

    dispatch(getUserFollowing()).then((response) =>
      setFollows(response.payload)
    );
    // console.log(props.route.params.uid, firebase.auth().currentUser.uid);
    if (props.route.params.uid === firebase.auth().currentUser.uid) {
      setUserPosts(userPosts);
      setUser(user);
    } else {
      firebase
        .firestore()
        .collection("users")
        .doc(props.route.params.uid)
        .get()
        .then((response) => {
          if (response.exists) {
            setUser(response.data());
          } else {
            console.log("does not exist.");
          }
        });
      firebase
        .firestore()
        .collection("posts")
        .doc(props.route.params.uid)
        .collection("userPosts")
        .orderBy("creation", "asc")
        .get()
        .then((response) => {
          let posts = response.docs.map((doc) => {
            const data = doc.data();
            const id = doc.id;
            return { id, ...data };
          });
          setUserPosts(posts);
        });
    }

    if (follows && follows.indexOf(props.route.params.uid) > -1) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [props.route.params.uid, follows]);
  const onFollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .set({});
    setFollowing(true);
  };

  const onUnfollow = () => {
    firebase
      .firestore()
      .collection("following")
      .doc(firebase.auth().currentUser.uid)
      .collection("userFollowing")
      .doc(props.route.params.uid)
      .delete();
    setFollowing(false);
  };
  const onLogout = () => {
    firebase.auth().signOut();
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
        {props.route.params.uid !== firebase.auth().currentUser.uid ? (
          <View>
            {following ? (
              <Button title="Following" onPress={onUnfollow} />
            ) : (
              <Button title="Follow" onPress={onFollow} />
            )}
          </View>
        ) : (
          <Button title="Logout" onPress={onLogout} />
        )}
      </View>

      <View style={styles.containerGallery}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Image style={styles.image} source={{ uri: item.downloadURL }} />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
});

export default ProfilePage;
