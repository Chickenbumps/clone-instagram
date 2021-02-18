import { USER_DATA_CHANGE, USER_POSTS_STATE_CHANGE } from "../type/type";
import * as firebase from "firebase";

export function getUser() {
  let request = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .get()
    .then((response) => {
      console.log("getUser", response.data());
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
