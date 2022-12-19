import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BottomSheet, Button } from "react-native-theme-component";
import { BRoundedCloseIcon } from "../../../../assets/rounded-close.icon";

export interface DeliverInfoSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onPressSettings: () => void;
}

const DeliverInfoSheet: React.FC<DeliverInfoSheetProps> = (props) => {
  const { isVisible, onClose, onPressSettings } = props;
  return (
    <BottomSheet
      style={{
        containerStyle: {
          padding: 24,
          height: (Dimensions.get("screen").height * 50) / 100,
        },
      }}
      isVisible={isVisible}
    >
      <View style={{height: (Dimensions.get("screen").height * 50) / 100 - 100,}}>
      <TouchableOpacity style={styles.crossContainer} onPress={onClose}>
        <BRoundedCloseIcon height={32} width={32} />
      </TouchableOpacity>
      <Text style={styles.title}>Changing your mailing address</Text>
      <Text style={styles.desc}>
        If you wish to change your mailing address, please change it via the
        Customer Settings page.
      </Text> 
      </View>
      <Button
                style={{
                  primaryContainerStyle: {
                    borderRadius: 100,
                    height: 56,
                  },
                  primaryLabelStyle: {
                    color: "#ffffff",
                  },
                }}
                bgColor="#1b1b1b"
                variant="primary"
                label={"Go to Settings"}
                onPress={onPressSettings}
                />
               
    </BottomSheet>
  );
};

export default DeliverInfoSheet;

const styles = StyleSheet.create({
  crossContainer: {
    height: 32,
    width: 32,
    backgroundColor: "#dddddd",
    alignSelf: "flex-end",
    borderRadius: 100,
    marginBottom: 24,
  },
  title: {
    fontWeight: "600",
    fontSize: 24,
    width: "90%",
    color: "#1b1b1b",
  },
  desc: {
    fontSize: 14,
    lineHeight: 20,
    width: "90%",
    marginTop: 8,
    color: "#1b1b1b",
  },
});
