import React, { useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Crypto from "expo-crypto";
import { Entypo } from "@expo/vector-icons";
import CustomAlert from "../components/customAlert";
import logo from "../../assets/cadastro.png";
import { addUser } from "../store/ducks/user";

export default function Login({ navigation }) {
  const refEmail = useRef(null);
  const refPasswordConfirm = useRef(null);
  const refPassword = useRef(null);
  const { users: allUsers } = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [loadingState, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const authLogin = async () => {
    try {
      // if(passwordChange.substr(passwordChange.length - 1,1) === "1" ) return console.log("numbrrr")

      const userStorage = allUsers.findIndex(
        (user) => user.name.toLowerCase() === name.toLowerCase()
      );

      if (userStorage !== -1) {
        setLoading(false);
        return setAlertMessage(
          "Já existe um usuário com este nome cadastrado."
        );
      }

      if (
        (!name || name === "",
        !password ||
          password === "" ||
          !passwordConfirm ||
          passwordConfirm === "")
      )
        return setAlertMessage(
          "Todos os campos são de preenchimento obrigatório."
        );

      if (name.length < 5)
        return setAlertMessage("O nome deve ter no mínimo 5 caracteres.");

      if (password && password.length < 5)
        return setAlertMessage("A senha deve ter no mínimo 5 caracteres.");

      if (password !== passwordConfirm)
        return setAlertMessage("As senhas não coincidem.");

      const cryptoPassword = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password
      );

      dispatch(addUser({ name, cryptoPassword }));
      setLoading(false);
      refEmail.current.clear();
      refPassword.current.clear();
      refPasswordConfirm.current.clear();
      setName("");
      setPassword("");
      setHidePassword(true);
      return navigation.navigate("Login");
    } catch (error) {
      setLoading(false);
      console.log(error);
      return setAlertMessage("Falha ao realizar cadastro.");
    }
  };

  if (loadingState)
    return (
      <ActivityIndicator style={styles.loading} size="large" color="black" />
    );

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.title}>Bem Vindo(a)!</Text>
      </View>
      <View style={styles.containerForm}>
        <TextInput
          ref={refEmail}
          placeholder="Nome"
          placeholderTextColor="black"
          value={name}
          style={styles.textInputEmail}
          onChangeText={(name) => setName(name)}
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
            color="black"
          />
        </TouchableOpacity>
        <TextInput
          ref={refPassword}
          keyboardType="numeric"
          placeholder="Senha"
          placeholderTextColor="black"
          secureTextEntry={hidePassword}
          value={password}
          style={styles.textInputPassword}
          onChangeText={(passwordChange) => setPassword(passwordChange)}
        ></TextInput>
        <TextInput
          ref={refPasswordConfirm}
          placeholder="Repita Senha"
          keyboardType="numeric"
          placeholderTextColor="black"
          secureTextEntry={hidePassword}
          value={passwordConfirm}
          style={styles.textInputPassword}
          onChangeText={(passwordChange) => setPasswordConfirm(passwordChange)}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={authLogin}>
          <Text style={styles.textButton}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
        show={alertMessage !== ""}
        message={alertMessage}
        color="#ea552b"
        onConfirmPressed={() => {
          setAlertMessage("");
        }}
      />

      <View style={styles.containerLogo}>
        <Image source={logo} style={styles.logo} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    marginTop: "5%",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: "10%",
  },
  containerLogo: {
    height: "31%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10%",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    height: 40,
    width: 100,
    backgroundColor: "#00D173",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "black",
  },
  textInputEmail: {
    color: "black",
    alignSelf: "stretch",
    paddingBottom: 10,
    marginLeft: 50,
    marginBottom: "3%",
    marginRight: 50,
    borderBottomColor: "black",
    borderBottomWidth: 3,
  },
  textInputPassword: {
    color: "black",
    alignSelf: "stretch",
    paddingBottom: 10,
    marginLeft: 50,
    marginBottom: "8%",
    marginRight: 50,
    borderBottomColor: "black",
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
});
