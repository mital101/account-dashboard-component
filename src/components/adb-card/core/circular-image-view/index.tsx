import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageIcon from "../../../../assets/image-icon";
import useMergeStyles, { CircularImageViewStyles } from "./styles";
export interface ICircularImageView {
  style?: CircularImageViewStyles;
  label?: string;
  icon?: React.ReactElement;
  onClick?: () => void;
}
const CircularImageView: React.FC<ICircularImageView> = (
  props: ICircularImageView
) => {
  const { style, icon, label, onClick } = props;
  const styles: CircularImageViewStyles = useMergeStyles(style);
  return (
    <TouchableOpacity style={styles.containerStyle} onPress={onClick}>
      <View style={styles.iconContainerStyle}>{icon ?? <ImageIcon />}</View>
      {label && <Text style={styles.labelStyle}>{props.label ?? ""}</Text>}
    </TouchableOpacity>
  );
};

export default CircularImageView;

const styles = StyleSheet.create({});
