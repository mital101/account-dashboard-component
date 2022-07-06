import { defaultsDeep } from "lodash";
import { StyleSheet,Dimensions } from "react-native";
import { WalletCardComponentStyles } from ".";
import { ThemeContext } from "react-native-theme-component";
import { useContext } from "react";

const useMergeStyles = (
  style?: WalletCardComponentStyles
): WalletCardComponentStyles => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: WalletCardComponentStyles = StyleSheet.create({
    containerStyle: {
      flex: 1
    },
    containerWrapper:{ maxHeight: Dimensions.get('window').height-180 },
    loadingContainerStyle: {
      height: 173,
      alignItems: "center",
      justifyContent: "center"
    },
    emptyCarouselContainerStyle: {
      // marginHorizontal: 25
    },
    emptyWalletItemComponentStyle: {
      accountNumberStyle2: {
        fontSize: 12,
        color: "#7F7B82",
        flex: 1
      },
      accountNumberStyle: {
        // fontFamily: fonts.bold,
        fontSize: 14,
        color: "#7F7B82",
        marginRight: 3,
        textDecorationLine: "none"
      }
    },
    containerStyleMessage: {
      marginHorizontal: 25,
      backgroundColor: "#E7DBF5",
      marginVertical: 16,
      borderRadius: 8,
      elevation: 2,
      shadowColor: "grey",
      shadowOffset: {
        width: 1,
        height: 1
      },
      shadowOpacity: 0.1,
      shadowRadius: 1,
      margin: 1,
      // paddingBottom: 22,
      padding: 15
    },
    labelTextStyle: {
      fontSize: 10,
      lineHeight: 10,
      color: "#5E0CBC",
      fontWeight: "400",
      width: 280
    },
    label2TextStyle: {
      fontSize: 10,
      lineHeight: 10,
      color: "#5E0CBC",
      fontWeight: "400",
      marginTop: 20,
      width: 280
    },
    labelTitlStyle: {
      fontFamily: fonts.bold,
      fontSize: 16,
      lineHeight: 36,
      color: colors.primaryTextColor,
      paddingLeft: 20
    }
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
