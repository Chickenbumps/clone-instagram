import React from "react";
import { View, Text, StyleSheet, Image, FlatList, Button } from "react-native";
import firebase from "firebase";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersData,
  getUsersFollowingPosts,
} from "../../redux/_actions/user_action";

function FeedPage(props) {
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const users = useSelector((store) => store.users);
  useEffect(() => {
    if (
      users.usersFollowingLoaded === user.following.length &&
      user.following.length !== 0
    ) {
      users.feed.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPosts(users.feed);
    }
    console.log(posts);
  }, [users.usersFollowingLoaded, users.feed]);
  return (
    <View style={styles.container}>
      <View style={styles.containerGallery}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.containerImage}>
              <Text style={styles.container}>{item.user.name}</Text>
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
export default FeedPage;
