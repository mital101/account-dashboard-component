import React, { useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  BottomSheet,
  Button,
  ThemeContext,
} from "react-native-theme-component";
import ImageIcon from "../../../../assets/image-icon";
import { BRoundedCloseIcon } from "../../../../assets/rounded-close.icon";
import useMergeStyles, { LockCardSheetStyles, SCREEN_HEIGHT } from "./styles";

export interface ILockCardSheet {
  isVisible: boolean;
  style?: LockCardSheetStyles;
  onClose: () => void;
  onLockCard: () => void;
}
export interface ILockCardItemStyle {
  item: {
    id: string;
    title: string;
    description: string;
  };
}
const SettingsItemStyle = (props: ILockCardItemStyle) => {
  const { item } = props;
  return (
    <View style={innerStyles.itemContainer}>
      <View style={innerStyles.titleContainer}>
        <ImageIcon color={"#1b1b1b"} width={22} height={22} />
        <View style={{ marginHorizontal: 12 }}>
          <Text style={innerStyles.titleStyle}>{item.title}</Text>
          <Text style={innerStyles.descStyle}>{item.description}</Text>
        </View>
      </View>
    </View>
  );
};

const LockCardBottomSheet = (props: ILockCardSheet) => {
  const { isVisible, style, onClose, onLockCard } = props;
  const styles: LockCardSheetStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);
  const [lockCardData] = useState([
    {
      id: "ld-1",
      title: i18n?.t("lock_card.what_blocked_title"),
      description: i18n?.t("lock_card.what_blocked_desc"),
    },
    {
      id: "ld-2",
      title: i18n?.t("lock_card.what_works_title"),
      description: i18n?.t("lock_card.what_works_desc"),
    },
    {
      id: "ld-3",
      title: i18n?.t("lock_card.lost_stolen_title"),
      description: i18n?.t("lock_card.lost_stolen_desc"),
    },
  ]);
  return (
    <BottomSheet
      style={{
        containerStyle: styles.containerStyle,
      }}
      isVisible={isVisible}
    >
      <View
        style={{
          width: "100%",
          height: (SCREEN_HEIGHT * (SCREEN_HEIGHT > 700 ? 70 : 80)) / 100 - 55,
        }}
      >
        <TouchableOpacity style={styles.crossContainer} onPress={onClose}>
          <BRoundedCloseIcon height={32} width={32} />
        </TouchableOpacity>
        <Text style={styles.titleStyle}>{i18n?.t("lock_card.title")}</Text>
        <Text style={styles.subtitleStyle}>
          {i18n?.t("lock_card.subtitle")}
        </Text>
        <FlatList
          data={lockCardData}
          contentContainerStyle={styles.listContainerStyle}
          renderItem={({ item }) => <SettingsItemStyle item={item} />}
          ItemSeparatorComponent={() => (
            <View
              style={{
                width: "100%",
                borderWidth: 0.7,
                borderColor: "#DDDDDD",
              }}
            />
          )}
          bounces={false}
        />
      </View>
      <Button
        style={{
          primaryContainerStyle: {
            borderRadius: 100,
            height: 56,
            position: "absolute",
            bottom: 0,
            width: "100%",
          },
        }}
        bgColor="#1b1b1b"
        variant="primary"
        label={i18n?.t("lock_card.btn_lock_card")}
        onPress={onLockCard}
      />
    </BottomSheet>
  );
};

export default LockCardBottomSheet;

const innerStyles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 14,
    color: "#1b1b1b",
    fontWeight: "500",
  },
  descStyle: {
    fontSize: 12,
    color: "#1b1b1b",
    marginRight: 25,
  },
});
