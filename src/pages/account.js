import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { Avatar } from "react-native-elements";

const Account = ({ navigation }) => {
  const userCurrent = useSelector(({ user }) => user.userCurrent);

  return (
    <View style={styles.container}>
      {userCurrent && userCurrent.name ? (
        <>
          <View style={{ marginTop: "19%" }}>
            <Avatar
              titleStyle={{ color: "white" }}
              containerStyle={{ backgroundColor: "black" }}
              avatarStyle={{
                borderColor: "#00214D",
                borderWidth: 3,
                backgroundColor: "#ffffff00",
              }}
              size="xlarge"
              rounded
              title={userCurrent.name.substring(0, 1)}
              activeOpacity={0.7}
            />
          </View>
          <Text style={styles.nameUser}>{userCurrent.name}</Text>
        </>
      ) : (
        <Text style={styles.title}>Usuário não encontrado</Text>
      )}
      <TouchableOpacity
        style={styles.buttomSair}
        onPress={() =>
          Alert.alert(
            "Aviso",
            "Tem certeza que deseja sair?",
            [
              { text: "Não", onPress: () => {}, style: "cancel" },
              {
                text: "Sim",
                onPress: () => {
                  navigation.navigation.navigate("Login");
                },
              },
            ],
            { cancelable: false }
          )
        }
      >
        <Text style={styles.textButtom}>Sair</Text>
      </TouchableOpacity>
      <Text style={styles.versao}>Versão 1.0.0</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
  },
  nameUser: { fontSize: 20, marginTop: "5%", color: "black" },
  textButtom: {
    fontSize: 20,
    fontWeight: "700",
    color: "#7b7b7b",
  },
  buttomSair: {
    width: 200,
    marginTop: "20%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 5,
    borderTopColor: "transparent",
    borderRightWidth: 0,
    borderLeftColor: "transparent",
    borderLeftWidth: 0,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 20,
    height: 60,
  },
  versao: {
    fontSize: 20,
    marginTop: "28%",
    color: "gray",
  },
  title: {
    fontSize: 25,
    color: "#00214D",
    marginBottom: "5%",
    marginTop: "40%",
  },
});

export default Account;
