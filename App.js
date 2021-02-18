import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./components/auth/LandingPage/LandingPage";
import RegisterPage from "./components/auth/RegisterPage/RegisterPage";
import LoginPage from "./components/auth/LoginPage/LoginPage";
import MainPage from "./components/MainPage";
import AddPage from "./components/main/AddPage";
import SavePage from "./components/main/SavePage";
import * as firebase from "firebase";
import { fbconfig } from "./config/key";

import rootReducer from "./redux/_reducers/index";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";
import promiseMiddleware from "redux-promise";
const store = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = fbconfig;

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const Stack = createStackNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);
  return loaded ? (
    loggedIn ? (
      <Provider store={store(rootReducer, composeWithDevTools())}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Add" component={AddPage} />
            <Stack.Screen name="Save" component={SavePage} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    ) : (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LandingPage">
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Register" component={RegisterPage} />
          <Stack.Screen name="Login" component={LoginPage} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  ) : (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>Loading...</Text>
    </View>
  );
}
