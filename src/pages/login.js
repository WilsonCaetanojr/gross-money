import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Permissions from "expo-permissions";
import * as Crypto from "expo-crypto";
import { Entypo } from "@expo/vector-icons";
import CustomAlert from "../components/customAlert";
import imageBack from "../../assets/back_login.png";
import logo from "../../assets/logo.png";
import { setUserCurrent } from "../store/ducks/user";
import api from "../service/api";
import { setValues } from "../store/ducks/stockExchange";

export default function Login({ navigation }) {
  const refEmail = useRef(null);
  const refSenha = useRef(null);
  const { userCurrent, users } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loadingState, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (userCurrent) {
      const user = users.find((u) => u.user === userCurrent);
      if (user) setName(user.name);
    }
  }, [users, userCurrent]);

  const getValues = async () => {
    try {
      const { data: high } = await api.get(
        "/finance/stock_price?key=525d2244&symbol=get-high"
      );
      const { data: low } = await api.get(
        "/finance/stock_price?key=525d2244&symbol=get-low"
      );

      if (high && low)
        dispatch(setValues({ high: high.results, low: low.results }));

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  confirmPermissions = async () => {
    setLoading(true);
    let permission = await Permissions.getAsync(Permissions.LOCATION);
    if (permission.status !== "granted") {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      if (status !== "granted") {
        setAlertMessage(
          "Não é possível entrar sem permitir o uso da localização. Entre nas configurações do celular e aceite a utilização da localização pelo aplicativo MaxiForest."
        );
        setLoading(false);
        return false;
      }
    }

    return true;
  };

  const authLogin = async () => {
    try {
      // return navigation.navigate("HomePage");

      if (!(await confirmPermissions())) return;

      const cryptoPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      const userStorage = users.find(
        (user) => user.name === name && user.cryptoPassword === cryptoPassword
      );

      if (!userStorage) {
        setLoading(false);
        return setAlertMessage("E-mail ou senha inválidos.");
      }

      // if (!getValues()) setAlertMessage("Falha ao acessar bolsa de valores.");

      dispatch(setUserCurrent(userStorage));

      setLoading(false);
      refEmail.current.clear();
      refSenha.current.clear();
      setName("");
      setPassword("");
      setHidePassword(true);
      return navigation.navigate("HomePage");
    } catch (error) {
      setLoading(false);
      console.log(error);
      return setAlertMessage("E-mail ou senha inválidos.");
    }
  };

  if (loadingState)
    return (
      <ActivityIndicator style={styles.loading} size="large" color="white" />
    );

  return (
    <ImageBackground source={imageBack} style={styles.backgroundImage}>
      <KeyboardAvoidingView>
        <View style={styles.containerLogo}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.containerForm}>
          <TextInput
            ref={refEmail}
            placeholder="Nome"
            placeholderTextColor="white"
            value={name}
            style={styles.textInputEmail}
            onChangeText={(nameChange) => setName(nameChange)}
          ></TextInput>
          <TouchableOpacity
            style={{
              width: "20%",
              height: "10%",
              resizeMode: "stretch",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "63%",
              marginTop: "4%",
            }}
            onPress={() => setHidePassword(!hidePassword)}
          >
            <Entypo
              name={hidePassword ? "eye-with-line" : "eye"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
          <TextInput
            ref={refSenha}
            placeholder="Senha"
            keyboardType="numeric"
            placeholderTextColor="white"
            secureTextEntry={hidePassword}
            value={password}
            style={styles.textInputPassword}
            onChangeText={(passwordChange) => setPassword(passwordChange)}
          ></TextInput>
          <View style={styles.columButton}>
            <View style={styles.itemButton}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  return navigation.navigate("Cadastro");
                }}
              >
                <Text style={styles.textButton}>Casastrar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.itemButton}>
              <TouchableOpacity style={styles.button} onPress={authLogin}>
                <Text style={styles.textButton}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CustomAlert
            show={alertMessage !== ""}
            message={alertMessage}
            color="#ea552b"
            onConfirmPressed={() => {
              setAlertMessage("");
            }}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.created}>Created by Wilson Caetano</Text>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  containerLogo: {
    height: "31%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },
  logo: {
    marginTop: "5%",
    width: "80%",
    height: "90%",
  },
  backgroundImage: {
    flex: 1,
  },
  button: {
    marginTop: "10%",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    height: 40,
    width: 100,
    backgroundColor: "#131D2C",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
  },
  textInputEmail: {
    color: "white",
    alignSelf: "stretch",
    paddingBottom: 10,
    marginLeft: 50,
    marginBottom: "3%",
    marginRight: 50,
    borderBottomColor: "white",
    borderBottomWidth: 3,
  },
  textInputPassword: {
    color: "white",
    alignSelf: "stretch",
    paddingBottom: 10,
    marginLeft: 50,
    marginBottom: "3%",
    marginRight: 50,
    borderBottomColor: "white",
    borderBottomWidth: 3,
  },
  containerForm: {
    alignItems: "center",
  },
  loading: {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
  },
  created: {
    color: "gray",
  },
  itemButton: {
    alignItems: "center",
    width: "40%",
  },
  columButton: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
});
