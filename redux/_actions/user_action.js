import {
  USER_DATA_CHANGE,
  USER_POSTS_STATE_CHANGE,
  USER_FOLLOWING_STATE_CHANGE,
  USERS_DATA_CHANGE,
  USERS_FOLLOWING_STATE_CHANGE,
  USERS_POSTS_STATE_CHANGE,
} from "../type/type";
import * as firebase from "firebase";

export function getUser() {
  let request = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((response) => {
      // console.log("getUser", response.data());
      return response.data();
    });

  return {
    type: USER_DATA_CHANGE,
    payload: request,
  };
}

export function getUserPosts() {
  let request = firebase
    .firestore()
    .collection("posts")
    .doc(firebase.auth().currentUser.uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((response) => {
      let post = response.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data };
      });
      return post;
    });
  return {
    type: USER_POSTS_STATE_CHANGE,
    payload: request,
  };
}

export function getUserFollowing() {
  const request = firebase
    .firestore()
    .collection("following")
    .doc(firebase.auth().currentUser.uid)
    .collection("userFollowing")
    .get()
    .then((snapshot) => {
      // console.log("snapshot", snapshot.docs);
      let following = snapshot.docs.map((doc) => {
        const id = doc.id;
        return id;
      });
      return following;
    });
  return {
    type: USER_FOLLOWING_STATE_CHANGE,
    payload: request,
  };
}

export function getUsersData(uid, getPosts) {
  const request = firebase
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      console.log("snapshot", snapshot.data());
      if (snapshot.exists) {
        let user = snapshot.data();
        user.uid = snapshot.id;
        return user;
      } else {
        console.log("does not exist.");
      }
    });
  return {
    type: USERS_DATA_CHANGE,
    payload: request,
  };
}

export function getUsersFollowingPosts(uid, users) {
  console.log("uid", uid);
  const request = firebase
    .firestore()
    .collection("posts")
    .doc(uid)
    .collection("userPosts")
    .orderBy("creation", "asc")
    .get()
    .then((snapshot) => {
      // console.log("snapshot", snapshot.query.Ff.path.segments[1]);
      const uid = snapshot.query.Ff.path.segments[1];
      // console.log("uid!!!", uid);
      const user = users.find((el) => el.uid === uid);
      // console.log("user!!!", user);
      let posts = snapshot.docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        return { id, ...data, user };
      });
      console.log("getUsersFollowingPosts-posts", posts);
      return posts;
    });
  return {
    type: USERS_POSTS_STATE_CHANGE,
    payload: request,
  };
}
