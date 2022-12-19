import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { BRoundedCloseIcon } from "../../../assets/rounded-close.icon";
import { WalletContext } from "../../../context/wallet-context";
import { ActivateVirtualCardStyle } from "../types";
import mergeStyle from "./styles";
export interface VirtualCardComponentProps {
  style?: ActivateVirtualCardStyle;
  onActivateVirtualCardPress?: () => void;
}

const VirtualCardComponent: React.FC<VirtualCardComponentProps> = (
  props: VirtualCardComponentProps
) => {
  const { style, onActivateVirtualCardPress } = props;
  const styles: ActivateVirtualCardStyle = mergeStyle(style);
  const { i18n } = useContext(ThemeContext);
  const { isVirtualCardActive } = useContext(WalletContext);
  return (
    <TouchableOpacity
      style={styles.containerStyle}
      onPress={onActivateVirtualCardPress}
    >
      <Text style={styles.virtualCardTextStyle}>
        {!isVirtualCardActive
          ? i18n?.t("adb_card.lbl_activate_card", { other: "now!" }) ??
            "Activate your virtual card now!"
          : i18n?.t("adb_card.lbl_acc_ready") ??
            "Your account is ready! Order your physical card today."}
      </Text>
      <TouchableOpacity style={styles.virtualCardIconContainerStyle}>
        <BRoundedCloseIcon />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default VirtualCardComponent;
