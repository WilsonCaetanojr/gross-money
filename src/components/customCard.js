import React from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
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

export default class CustomCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      favorite: false,
      update: this.props.updatedAt,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container
        style={{ height: 100, width: "95%", backgroundColor: "#00214D" }}
      >
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={this.props.high ? logoHigh : logoLow} />
              <Body>
                <Text>{this.props.high ? "Alta" : "Baixa"}</Text>
                <Text note>{this.props.symbol}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody style={{ marginLeft: 10 }}>
            {this.props.high ? (
              <Text style={{ color: "green" }}>
                Percentual de alta: {this.props.changePercent}
              </Text>
            ) : (
              <Text style={{ color: "red" }}>
                Percentual de baixa: {this.props.changePercent}
              </Text>
            )}
          </CardItem>
          <CardItem cardBody style={{ marginLeft: 10 }}>
            <Text>
              Preço: {this.props.price} {this.props.currency}
            </Text>
          </CardItem>
          <CardItem cardBody style={{ marginLeft: 10 }}>
            <Text>Nome: {this.props.name}</Text>
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
                onPress={() =>
                  this.setState({ favorite: !this.state.favorite })
                }
              >
                {this.state.favorite ? (
                  <AntDesign name="star" size={30} color="black" />
                ) : (
                  <AntDesign name="staro" size={30} color="black" />
                )}
                <Text>
                  {this.state.favorite
                    ? "Remover dos Favoritos"
                    : "Adicionar aos favoritos"}
                </Text>
              </Button>
            </Left>
            <Right>
              <Text style={{ marginLeft: 50 }}>{this.state.update}</Text>
            </Right>
          </CardItem>
        </Card>
      </Container>
    );
  }
}
