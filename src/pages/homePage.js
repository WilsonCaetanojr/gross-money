import React, { useState } from "react";
import { useSelector } from "react-redux";
import CustomCard from "../components/customCard";
import { View } from "native-base";

export default function HomePage() {
  const { high, low } = useSelector(({ stockExchange }) => stockExchange);
  const [newHigh, setHigh] = useState(high[Object.keys(high)[0]]);
  const [newLow, setLow] = useState(low[Object.keys(low)[0]]);

  return (
    <View style={{ flex: 1, backgroundColor: "#00214D", alignItems: "center" }}>
      <View
        style={{
          marginTop: "18%",
          width: "100%",
          height: "90%",
          alignItems: "center",
        }}
      >
        <CustomCard
          name={newHigh.name}
          price={newHigh.price}
          high={true}
          symbol={newHigh.symbol}
          currency={newHigh.currency}
          region={newHigh.region}
          changePercent={newHigh.change_percent}
          updatedAt={newHigh.updated_at}
        ></CustomCard>
        <CustomCard
          name={newLow.name}
          price={newLow.price}
          symbol={newLow.symbol}
          currency={newLow.currency}
          region={newLow.region}
          changePercent={newLow.change_percent}
          updatedAt={newLow.updated_at}
        ></CustomCard>
      </View>
    </View>
  );
}
