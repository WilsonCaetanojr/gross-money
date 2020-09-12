import * as React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {FontAwesome5, Octicons, AntDesign } from "@expo/vector-icons";
import HomePage from "../pages/homePage";
import Account from "../pages/account"
import Favorites from "../pages/favorites"

function ContaComponent(navigation) {
  return <Account navigation={navigation}></Account>;
}


const Tab = createBottomTabNavigator();

export default function BottomNav({ navigation }) {
  return (
    <Tab.Navigator
      style={styles.navBar}
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "#00214D",
        tabStyle: styles.navBar
      }}
      tabStyle={styles.navBar}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Alta/Baixa") {
            return (
                <Octicons name="graph" size={30}   color={focused ? "white" : "#00214D"} />
            );
          }
           else if (route.name === "Favoritos") {
            return (
                <AntDesign name="star" size={30}   color={focused ? "white" : "#00214D"} />
            );
          } 
          else if (route.name === "Conta") {
            return (
              <FontAwesome5
                name="user-alt"
                size={30}
                color={focused ? "white" : "#00214D"}
              />
            );
          }
        }
      })}
    >
      <Tab.Screen name="Alta/Baixa" component={HomePage} navigation={navigation} />
      <Tab.Screen name="Favoritos" component={Favorites} />
      <Tab.Screen name="Conta" component={ContaComponent} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "black"
  }
});
