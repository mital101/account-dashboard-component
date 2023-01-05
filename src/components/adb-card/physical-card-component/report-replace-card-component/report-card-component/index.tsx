import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button, ThemeContext } from "react-native-theme-component";
import useMergeStyles, { ADBReportCardComponentStyles } from "./styles";

export interface ReportCardComponentProps {
  style?: ADBReportCardComponentStyles;
  onPressContinue: (val: string) => void;
}

export enum ReportIssueType {
  LOST_OR_STOLEN = "Lost or stolen",
  DAMAGED = "Damaged",
}

const data = [
  {
    id: "rd-1",
    title: ReportIssueType.LOST_OR_STOLEN,
    selected: true,
  },
  {
    id: "rd-2",
    title: ReportIssueType.DAMAGED,
    selected: false,
  },
];

const ReportCardComponent = (props: ReportCardComponentProps) => {
  const { style, onPressContinue } = props;
  const { i18n } = useContext(ThemeContext);
  const styles: ADBReportCardComponentStyles = useMergeStyles(style);
  const [radioData, setRadioData] = useState(data);
  const [selectedValue, setSelectedValue] = useState<string>(
    ReportIssueType.LOST_OR_STOLEN
  );
  const handlePress = (index: number) => {
    const arr = [...radioData];
    arr.forEach((_, i) => {
      arr[i].selected = false;
    });
    arr[index].selected = true;
    setSelectedValue(arr[index].title);
    setRadioData(arr);
  };
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>Report and replace card</Text>
      <Text style={styles.subTitleStyle}>Tell us your reason:</Text>
      <View style={styles.radioButtonContainerStyle}>
        {radioData.map((item, i) => {
          return (
            <View style={innerStyles.radioButtonContainer}>
              <TouchableOpacity
                style={innerStyles.radioBtnOuterCircle}
                onPress={() => handlePress(i)}
              >
                {item.selected && (
                  <View style={innerStyles.radioBtnInnerCircle} />
                )}
              </TouchableOpacity>
              <View style={innerStyles.radioBtnTextContainer}>
                <Text style={innerStyles.radioBtnTitle}>{item.title}</Text>
              </View>
            </View>
          );
        })}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.copyContainer}>
          <Text style={styles.copyContainerText}>
            {selectedValue === ReportIssueType.LOST_OR_STOLEN
              ? "Your card will be blocked and cancelled immediately."
              : "Your card will remain active until your new card is activated."}
          </Text>
        </View>
        <Button
          style={{
            primaryContainerStyle: {
              borderRadius: 100,
              height: 56,
            },
            primaryLabelStyle: {
              color: "#FFFFFF",
            },
          }}
          bgColor="#1b1b1b"
          variant="primary"
          label={i18n?.t("adb_card.btn_continue") ?? "Go to Home"}
          onPress={() => onPressContinue(selectedValue)}
        />
      </View>
    </View>
  );
};

export default ReportCardComponent;
const innerStyles = StyleSheet.create({
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginVertical: 8,
  },
  radioBtnOuterCircle: {
    height: 24,
    width: 24,
    borderWidth: 2,
    borderRadius: 24,
    padding: 2,
  },
  radioBtnInnerCircle: {
    height: "100%",
    width: "100%",
    backgroundColor: "#1b1b1b",
    borderRadius: 24,
  },
  radioBtnTextContainer: {
    marginLeft: 10,
  },
  radioBtnTitle: {
    color: "#1b1b1b",
  },
  copyContainer: {
    backgroundColor: "#dddddd",
    width: "100%",
    borderRadius: 3,
    padding: 16,
    marginVertical: 16,
  },
  copyContainerText: {
    fontSize: 12,
    color: "#1b1b1b",
  },
});
