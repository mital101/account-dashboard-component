import React, { useContext } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { BRoundedCloseIcon } from "../../../assets/rounded-close.icon";
import { ActivateVirtualCardStyle } from "../types";
import mergeStyle from "./styles";
export interface VirtualCardComponentProps {
  style?: ActivateVirtualCardStyle;
}

const VirtualCardComponent: React.FC<VirtualCardComponentProps> = (
  props: VirtualCardComponentProps
) => {
  const { style } = props;
  const styles: ActivateVirtualCardStyle = mergeStyle(style);
  const { i18n } = useContext(ThemeContext);
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.virtualCardTextStyle}>
        {i18n?.t("adb_card.lbl_activate_card") ??
          "Activate your virtual card now!"}
      </Text>
      <TouchableOpacity style={styles.virtualCardIconContainerStyle}>
        <BRoundedCloseIcon />
      </TouchableOpacity>
    </View>
  );
};

export default VirtualCardComponent;
