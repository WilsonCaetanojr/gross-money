import React from "react";
import { StatusBar, StyleSheet, Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./src/pages/login";
import Cadastro from "./src/pages/cadastro";
import BottomNav from "./src/components/bottomNavigation";
import { persistor, store } from "./src/store/store";
import header from "./assets/header.png";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor="black" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" headerMode="screen">
            <Stack.Screen
              name="HomePage"
              options={{
                title: "",
                headerBackTitle: null,
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
                headerTransparent: true,
                headerBackground: () => (
                  <Image source={header} style={styles.header} />
                ),
              }}
              component={BottomNav}
            ></Stack.Screen>
            <Stack.Screen
              name="Login"
              headerMode="none"
              component={Login}
              options={{
                title: "",
                headerStyle: {
                  height: 0,
                  backgroundColor: "white",
                },
              }}
            />
            <Stack.Screen
              name="Cadastro"
              headerMode="none"
              component={Cadastro}
              options={{
                title: "",
                headerStyle: {
                  height: 45,
                  backgroundColor: "white",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  header: {
    height: "100%",
    width: "100%",
  },
});
