import { defaultsDeep } from "lodash";
import { useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { ThemeContext } from "react-native-theme-component";
import { ADBCardComponentStyleType } from "./types";

const useMergeStyles = (
  style?: ADBCardComponentStyleType
): ADBCardComponentStyleType => {
  const { fonts, colors } = useContext(ThemeContext);

  const defaultStyles: ADBCardComponentStyleType = StyleSheet.create({
    containerStyle: {
      flex: 1,
      backgroundColor:'#ffffff',
      paddingHorizontal: 24,
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
    //   accountNumberStyle2: {
    //     fontSize: 12,
    //     color: "#7F7B82",
    //     flex: 1
    //   },
    //   accountNumberStyle: {
    //     // fontFamily: fonts.bold,
    //     fontSize: 14,
    //     color: "#7F7B82",
    //     marginRight: 3,
    //     textDecorationLine: "none"
    //   }
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
    },
    usernameText: {
        fontSize: 20,
        fontFamily: fonts.semiBold,
        // color: colors.secondary,
        marginBottom: 8,
      },
      subTitle: {
        fontSize: 14,
        // color: colors.secondary,
      },
      imageContainer: {
        marginVertical: 32,
      },
      lowerContainer: {
        paddingHorizontal: 24,
        marginBottom: 8,
      },
      profileNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      membershipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 12,
      },
      type: {
        fontFamily: fonts.medium,
        fontSize: 12,
        color: '#858585',
      },
      value: {
        fontFamily: fonts.regular,
        fontSize: 16,
        color: '#333333',
        lineHeight: 24,
        paddingTop: 8,
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      barcodeIconContainer: {
        marginLeft: 10,
        paddingTop: 8,
      },
  });

  return defaultsDeep(style, defaultStyles);
};

export default useMergeStyles;
