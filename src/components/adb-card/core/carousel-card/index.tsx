import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { ArrowRightIcon } from "../../../../assets/arrow-right.icon";
import useMergeStyles, { CarouselCardStyles } from "./styles";

export interface CarouselCardProps {
  style?: CarouselCardStyles;
  title: string;
  subTitle: string;
  buttonLabel: string;
  onPress?: () => void;
}

const CarouselCard: React.FC<CarouselCardProps> = (props) => {
  const { style, title, subTitle, buttonLabel, onPress } = props;
  const styles: CarouselCardStyles = useMergeStyles(style);
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <Text style={styles.subTitleStyle}>{subTitle}</Text>

      <TouchableOpacity style={styles.buttonContainerStyle} onPress={onPress}>
        <Text style={styles.buttonLabelStyle}>{buttonLabel}</Text>
        <View style={{ width: 10, height: 10, marginLeft: 15 }}>
          <ArrowRightIcon color="#fff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CarouselCard;
