import React, { useEffect, useState } from "react";
import { KeyboardType, Text, TextInput, View } from "react-native";
import useMergeStyle, { EditableInputStyles } from "./styles";

export interface EditableInputProps {
  label: string;
  // onChange: (value:string) => void;
  value: string | number;
  style?: EditableInputStyles;
  keyboardType?: KeyboardType;
  onSave: (value: string) => Promise<void>;
  valuePrefix?: string;
  errorLabel?:string;
  error?:any
}

const EditableInput: React.FC<EditableInputProps> = (props) => {
  const { style, keyboardType, onSave, value, label, valuePrefix, error, errorLabel } = props;
  const [isEdit, setEdit] = useState<boolean>(false);
  const [changedValue, setValue] = useState<string>(value.toString());
  const styles: EditableInputStyles = useMergeStyle(style);

  useEffect(() => {
    setValue(value.toString());
  }, [value]);

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 5 }}
      >
        <Text style={styles.valueStyle}>{valuePrefix ?? null}</Text>
        <View style={{ width: "100%" }}>
          {isEdit ? (
            <View
              style={[
                styles.inputContainerStyle,
                {
                  width: valuePrefix ? "88%" : "100%",
                  marginLeft: valuePrefix ? 10 : 0,
                },
              ]}
            >
              <TextInput
                value={changedValue}
                onChangeText={(e) => setValue(e)}
                style={styles.inputStyle}
                keyboardType={keyboardType}
              />
              <Text
                style={{ fontWeight: "600", color: "#000" }}
                onPress={() => {
                  onSave(changedValue).then(() => setEdit(false));
                }}
              >
                Save
              </Text>
            </View>
          ) : (
            <View
              style={[
                styles.valueContainer,
                {
                  width: valuePrefix ? "88%" : "100%",
                  marginLeft: valuePrefix ? 10 : 0,
                },
              ]}
            >
              <Text style={styles.valueStyle}>{value}</Text>
              <Text
                style={{ fontWeight: "600", color: "#000" }}
                onPress={() => setEdit(true)}
              >
                Edit
              </Text>
            </View>
          )}
        </View>
      </View>
     {error &&  <Text style={styles.errorLabel}>{errorLabel}</Text>}
    </View>
  );
};

export default React.memo(EditableInput);
