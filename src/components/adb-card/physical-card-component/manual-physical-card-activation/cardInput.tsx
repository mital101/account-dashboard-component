import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import DangerIcon from "../../../../assets/danger-icon";

interface ICardInput {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  errorLabel?: string;
  error?: boolean;
  showCardImg?: boolean;
}

const CardInput: React.FC<ICardInput> = (props) => {
  const { label, onChangeText, value, errorLabel, error, showCardImg } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{label}</Text>
      <View style={styles.inputContainerStyle}>
        {showCardImg && (
          <View
            style={{
              backgroundColor: "#1b1b1b",
              paddingVertical: 8,
              paddingHorizontal: 2,
              borderRadius: 2,
            }}
          >
            <Image
              source={require("../../../../assets/visa.png")}
              style={{ height: 6, width: 20 }}
            />
          </View>
        )}
        <TextInput
          style={[styles.input, { marginLeft: showCardImg ? 10 : 0 }]}
          value={value}
          onChangeText={onChangeText}
          keyboardType={"number-pad"}
        />
      </View>
      {error && (
        <View style={styles.errorContainer}>
          <DangerIcon />
          <Text style={styles.errorText}>{errorLabel}</Text>
        </View>
      )}
    </View>
  );
};

export default CardInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontSize: 12,
    color: "#858585",
  },
  input: {
    marginTop: 5,
    width: "100%",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  errorText: {
    marginLeft: 10,
  },
  inputContainerStyle: {
    padding: Platform.OS === "ios" ? 6 : 3,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#C2C2C2",
  },
});
