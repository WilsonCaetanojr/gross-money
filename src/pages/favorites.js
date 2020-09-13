import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CardFavorites from "../components/cardFavorites";
import { useSelector } from "react-redux";

const Favorites = () => {
  const favorites = useSelector(({ stockExchange }) => stockExchange.favorites);
  const userCurrent = useSelector(({ user }) => user.userCurrent);

  return (
    <View style={styles.container}>
      {favorites[userCurrent.name] && favorites[userCurrent.name].length > 0 ? (
        <>
          <Text style={styles.title}>Ações Favoritas</Text>
          <View style={styles.card}>
            {favorites[userCurrent.name].map((fav, index) => (
              <CardFavorites
                name={fav.name}
                symbol={fav.symbol}
                key={index}
              ></CardFavorites>
            ))}
          </View>
        </>
      ) : (
        <View style={{ marginTop: "50%" }}>
          <Text style={styles.title}>Não há ações favoritas</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    color: "#00214D",
    marginBottom: "5%",
    marginTop: "19%",
  },
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
  card: { width: "90%" },
});

export default Favorites;
