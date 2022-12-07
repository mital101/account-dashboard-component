import React from "react";
import { SafeAreaView, View } from "react-native";
import ProfileHeader from "./profile-header";
import useMergeStyles from "./styles";
import { ADBCardComponentPropType } from "./types";
import WalletItemComponent from "./wallet-item-component";

const ADBCardComponent: React.FC<ADBCardComponentPropType> = (props) => {
  const { style, balanceCardStyle, activateVirtualCardStyle } = props;
  const styles = useMergeStyles(style);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#ffffff", paddingTop: 20 }}
    >
      <View style={styles.containerStyle}>
        <ProfileHeader
          BalanceStyles={balanceCardStyle}
          ActivateCardStyles={activateVirtualCardStyle}
        />
        <WalletItemComponent />
      </View>
    </SafeAreaView>
  );
};

export default ADBCardComponent;
