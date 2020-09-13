import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
} from "native-base";
import logoLow from "../../assets/logo_low.png";
import logoHigh from "../../assets/logo_high.png";
import { addFavorites, removeFavorites } from "../store/ducks/stockExchange";

const CustomCard = ({
  updatedAt,
  high,
  symbol,
  changePercent,
  currency,
  price,
  name,
}) => {
  const userCurrent = useSelector(({ user }) => user.userCurrent);
  const favoritesStorage = useSelector(
    ({ stockExchange }) => stockExchange.favorites
  );
  const [favorite, setFavorite] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFont = async () => {
      await Font.loadAsync({
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
        ...Ionicons.font,
      });
      setIsReady(true);
    };
    getFont();
  }, []);

  useEffect(() => {
    const findFavorite = favoritesStorage[userCurrent.name].find(
      (fav) => fav.symbol === symbol
    );
    if (findFavorite) return setFavorite(true);

    setFavorite(false);
  }, [favoritesStorage, userCurrent, symbol]);

  const updateFavorite = () => {
    if (!favorite) {
      dispatch(addFavorites(userCurrent.name, { name, symbol }));
    } else {
      dispatch(removeFavorites(userCurrent.name, symbol));
    }
  };

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Container
      style={{ height: 100, width: "95%", backgroundColor: "#ecececad" }}
    >
      <Card>
        <CardItem>
          <Left>
            <Thumbnail source={high ? logoHigh : logoLow} />
            <Body>
              <Text>{high ? "Alta" : "Baixa"}</Text>
              <Text note>{symbol}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody style={{ marginLeft: 10 }}>
          {high ? (
            <Text style={{ color: "green" }}>
              Percentual de alta: {changePercent}
            </Text>
          ) : (
            <Text style={{ color: "red" }}>
              Percentual de baixa: {changePercent}
            </Text>
          )}
        </CardItem>
        <CardItem cardBody style={{ marginLeft: 10 }}>
          <Text>
            Preço: {price} {currency}
          </Text>
        </CardItem>
        <CardItem cardBody style={{ marginLeft: 10 }}>
          <Text>Nome: {name}</Text>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent onPress={() => updateFavorite()}>
              {favorite ? (
                <AntDesign name="star" size={30} color="black" />
              ) : (
                <AntDesign name="staro" size={30} color="black" />
              )}
              <Text>
                {favorite ? "Remover dos Favoritos" : "Adicionar aos favoritos"}
              </Text>
            </Button>
          </Left>
          <Right>
            <Text style={{ marginLeft: 50 }}>{updatedAt}</Text>
          </Right>
        </CardItem>
      </Card>
    </Container>
  );
};

export default CustomCard;
