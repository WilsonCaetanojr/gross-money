import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CardFavorites from "../components/cardFavorites";
import { useSelector } from "react-redux";

const Favorites = () => {
  const favorites = useSelector(({ stockExchange }) => stockExchange.favorites);
  const userCurrent = useSelector(({ user }) => user.userCurrent);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ações Favoritas</Text>
      <View style={styles.card}>
        {favorites[userCurrent.name].map((fav) => (
          <CardFavorites name={fav.name} symbol={fav.symbol}></CardFavorites>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: 25, color: "#00214D", marginBottom: "5%" },
  container: { flex: 1, backgroundColor: "white", alignItems: "center" },
  card: { width: "90%" },
});

export default Favorites;
