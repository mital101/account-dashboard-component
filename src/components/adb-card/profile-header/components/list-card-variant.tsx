import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import CircularImageView from "../../core/circular-image-view";

export interface IListCardVariant {
  title: string;
  subTitle: string;
}

const ListCardVariant: React.FC<IListCardVariant> = (
  props: IListCardVariant
) => {
  const { title = "", subTitle = "" } = props;
  return (
    <View style={styles.container}>
      <CircularImageView />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subTitle}</Text>
      </View>
    </View>
  );
};

export default ListCardVariant;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    // borderColor: colors.primary,
    borderRadius: 24,
    height: (Dimensions.get("screen").height / 100) * 20,
    paddingHorizontal: 20,
    marginRight: 16,
  },
  textContainer: {
    marginLeft: 16,
  },
  title: {
    // fontFamily: fonts.semiBold,
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 5,
  },
  subTitle: {
    // ...palette.label,
    width: "70%",
  },
});
