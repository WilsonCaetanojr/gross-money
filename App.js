import React from "react";
import { StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Login from "./src/pages/login";
import Cadastro from "./src/pages/cadastro";
import HomePage from "./src/pages/homePage";
import { persistor, store } from "./src/store/store";

const styleHeaderLogin = {
  title: "",
  headerStyle: {
    height: 0,
    backgroundColor: "white",
  },
};

const styleHeaderGeneric = {
  title: "",
  headerStyle: {
    height: 30,
    backgroundColor: "white",
  },
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar backgroundColor="white" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" headerMode="screen">
            <Stack.Screen
              name="Login"
              headerMode="none"
              component={Login}
              options={styleHeaderLogin}
            />
            <Stack.Screen
              name="Cadastro"
              headerMode="none"
              component={Cadastro}
              options={styleHeaderGeneric}
            />
            <Stack.Screen
              name="HomePage"
              headerMode="none"
              component={HomePage}
              options={styleHeaderGeneric}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
