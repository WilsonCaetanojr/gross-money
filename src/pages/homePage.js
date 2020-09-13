import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CustomCard from "../components/customCard";
import { View } from "native-base";
import { TouchableOpacity, Text } from "react-native";

export default function HomePage() {
  const { high, low } = useSelector(({ stockExchange }) => stockExchange);
  const [newHigh, setHigh] = useState(null);
  const [newLow, setLow] = useState(null);

  useEffect(() => {
    setHigh(high[Object.keys(high)[0]]);
    setLow(low[Object.keys(low)[0]]);
  }, [newHigh, newLow, high, low]);

  return (
    <View style={{ flex: 1, backgroundColor: "#ecececad", alignItems: "center" }}>
      <View
        style={{
          marginTop: "18%",
          width: "100%",
          height: "90%",
          alignItems: "center",
        }}
      >
        {newHigh && newHigh.name && (
          <>
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
          </>
        )}
      </View>
    </View>
  );
}
