import React from "react";
import { Text, View } from "react-native";
import CircularImageView from "../../core/circular-image-view";
import { WalletItemStyle } from "../../types";
import mergeStyle from "./styles";
export interface IListCardVariant {
  title: string;
  subTitle: string;
  style?: WalletItemStyle;
}

const ListCardVariant: React.FC<IListCardVariant> = (
  props: IListCardVariant
) => {
  const { title = "", subTitle = "", style } = props;
  const styles: WalletItemStyle = mergeStyle(style);
  return (
    <View style={styles.containerStyle}>
      <CircularImageView />
      <View style={styles.rightContainerStyle}>
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.subTitleStyle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default ListCardVariant;
