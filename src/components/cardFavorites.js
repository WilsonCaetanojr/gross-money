import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { removeFavorites } from "../store/ducks/stockExchange";

const CardFavorites = ({ symbol, name }) => {
  const userCurrent = useSelector(({ user }) => user.userCurrent);
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(
      removeFavorites({ userName: userCurrent.name, dataAction: { symbol, name } })
    );
  };

  return (
    <View
      style={{
        borderRadius: 8,
        backgroundColor: "#00214D",
        height: "auto",
        width: "100%",
        paddingLeft: 10,
        marginBottom: "5%",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={{ fontSize: 25, color: "white" }}>{symbol}</Text>
        <View style={{ alignItems: "flex-end", width: "70%" }}>
          <MaterialCommunityIcons
            name="delete-circle"
            size={50}
            color="white"
            style={{ marginLeft: 40, marginTop: 10 }}
            onPress={() => removeItem()}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 25,
          marginTop: -20,
          paddingBottom: 5,
          color: "white",
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default CardFavorites;
