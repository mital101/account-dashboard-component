import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { BalanceStyle } from "../types";
import mergeStyles from "./styles";
export type BalanceComponentProps = {
  balance: number | string;
  style?: BalanceStyle;
};

const BalanceComponent: React.FC<BalanceComponentProps> = (
  props: BalanceComponentProps
) => {
  const { style, balance } = props;
  const { colors, i18n } = useContext(ThemeContext);
  const styles: BalanceStyle = mergeStyles(style);
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.accountBalanceText}>
        {i18n?.t("adb_card.acc_balance") ?? "Account Balance"}
      </Text>
      <Text style={styles.accountBalance}>RM {Number(balance).toFixed(2)}</Text>
    </View>
  );
};

export default BalanceComponent;
