import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import mergeStyle from "../card-info-component/styles";
import Button from "../core/button";
import { VirtualCardInfoProps, VirtualCardInfoStyle } from "../types";
import VirtualCard from "./components/virtual-card";

const VirtualCardInfo: React.FC<VirtualCardInfoProps> = (
  props: VirtualCardInfoProps
) => {
  const { style, onActivateNowPress } = props;
  const styles: VirtualCardInfoStyle = mergeStyle(style);
  const { i18n } = useContext(ThemeContext);
  return (
    <View style={styles.containerStyle}>
      <View style={styles.titleContainerStyle}>
        <Text style={styles.titleStyle}>Activate your virtual card</Text>
        <Text style={styles.subTitleStyle}>
          Activate yours now and enjoy the banking experience.
        </Text>
        <VirtualCard cardHolderName="{Nur Aeolanda Binti Mahmud}" />
        <Text style={{ alignSelf: "center", color: "#1b1b1b" }}>
          {"{ADB} VISA Debit Card"}
        </Text>
      </View>
      <View style={{ bottom: 10 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#dddddd",
            width: "100%",
            borderRadius: 3,
            padding: 16,
            marginBottom: 16,
          }}
        >
          <Text style={{ color: "#1b1b1b" }}>Copy</Text>
        </TouchableOpacity>
        <Button label="Activate Now" onPress={onActivateNowPress} />
      </View>
    </View>
  );
};

export default VirtualCardInfo;
