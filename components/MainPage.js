import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  getUser,
  getUserPosts,
  getUserFollowing,
  getUsersData,
  getUsersFollowingPosts,
} from "../redux/_actions/user_action";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import * as firebase from "firebase";

import FeedPage from "./main/FeedPage";
import ProfilePage from "./main/ProfilePage";
import AddPage from "./main/AddPage";
import SearchPage from "./main/SearchPage";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
const Tab = createMaterialBottomTabNavigator();

function MainPage() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ email: "", name: "" });
  const [userPosts, setUserPosts] = useState([]);
  const [follows, setFollows] = useState([]);
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    console.log("users", users);
    dispatch(getUser()).then((response) => {
      setUser(response.payload);
      // console.log("user", response.payload);
    });
    dispatch(getUserPosts()).then((response) => {
      setUserPosts(response.payload);
      // console.log("userPosts", response.payload);
    });
    dispatch(getUserFollowing()).then((response) => {
      console.log("getUserFollowing", response.payload);
      setFollows(response.payload);
    });

    for (let i = 0; i < follows.length; i++) {
      console.log("follows:i", follows[i]);
      const found = false;
      if (users.length > 0) {
        found = users.some((el) => el.uid === follows[i]);
        console.log("found", found);
      }
      if (!found) {
        dispatch(getUsersData(follows[i], true));
      }
      dispatch(getUsersFollowingPosts(follows[i], users));
    }
    console.log("follows", follows);
  }, [firebase.auth().currentUser.uid]);

  const EmptyPage = () => {
    return null;
  };

  return (
    <Tab.Navigator initialRouteName="Feed" labeled={false}>
      <Tab.Screen
        name="Feed"
        component={FeedPage}
        // listeners={({ navigation }) => ({
        //   tabPress: (e) => {
        //     e.preventDefault();
        //     navigation.navigate("Feed", {});
        //   },
        // })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="MainAdd"
        component={EmptyPage}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Add");
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Profile", {
              uid: firebase.auth().currentUser.uid,
              user,
              userPosts,
            });
          },
        })}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainPage;
