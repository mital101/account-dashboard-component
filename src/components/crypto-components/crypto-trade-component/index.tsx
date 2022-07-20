import React,{useState,useEffect} from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle,TouchableOpacity,SafeAreaView } from 'react-native';
import {
  ArrowBack,
  UnionDigitalBankIcon
} from '../../../assets/images';
import useMergeStyles from './styles';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';

import { BottomSheet, Button } from 'react-native-theme-component';


export type CryptoTradeComponentThemeProps = {
  style?: CryptoTradeComponentThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type CryptoTradeComponentThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type CryptoTradeComponentProps = {
  defaultData: any;
  style?: CryptoTradeComponentThemeStyles;
  onClickItem?:(data:any)=>void;
  onGoBack:()=>void;
  navigateToHome:()=>void;
};

const CryptoTradeComponent = (props: CryptoTradeComponentProps) => {
  const { style,onClickItem,defaultData,onGoBack,navigateToHome } = props;
  const styles = useMergeStyles(style);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showTip3, setTip3] = useState<boolean>(false);
  //
  // useEffect(() => {
  //   if (isShowTips) {
  //     setTip1(true)
  //   }
  // },[isShowTips]);

  const onClose=()=>{
    setIsVisible(false)
  }

  if (showSuccess) {
    return(
      <View style={styles.successContainerStyle}>
        <View style={styles.containerWrapperStyle}>
          <Text style={styles.successTitle}>Transaction Successful!</Text>
          <Text  style={styles.successHeaderMessage}>
            #UDidIt! You have successfully sold your BTC via Market Order. See transaction details below:
          </Text>

          <View style={styles.successPanel}>
            <View style={styles.successItemGroup}>
              <Text style={styles.successItemLabel}>Transaction Type</Text>
              <Text style={styles.successItemValue}>Sell BTC asset via Market Order</Text>
            </View>
            <View style={styles.successItemGroup}>
              <Text style={styles.successItemLabel}>Amount</Text>
              <Text style={styles.successItemValue}>₱ 1,000.00</Text>
            </View>
            <View style={styles.successItemGroup}>
              <Text style={styles.successItemLabel}>BTC Amount</Text>
              <Text style={styles.successItemValue}>0.000064 BTC</Text>
            </View>
            <View style={styles.successItemGroup}>
              <Text style={styles.successItemLabel}>Transaction Status</Text>
              <Text style={styles.successItemStatus}>Completed</Text>
            </View>
          </View>

          <View style={styles.successDetailWrapper}>
            <Text style={styles.successDetailLabel}>Transaction Date / Time</Text>
            <Text style={styles.successDetailValue}>Nov 2, 2021 / 07:10 AM</Text>
          </View>
          <View style={styles.successDetailWrapper}>
            <Text style={styles.successDetailLabel}>Reference No.</Text>
            <Text style={styles.successDetailValue}>ABCDE12345676789</Text>
          </View>
          <View style={styles.successLogoWrapper}>
            <UnionDigitalBankIcon height={40} width={150} />
          </View>
        </View>
        <View style={styles.footerContainerStyle}>
          <View style={styles.footerButtonWrapper}>
            <View style={styles.successButtonWrapper}>
              <Button
                onPress={()=>{setShowSuccess(false)}}
                // label={
                //   i18n?.t("customer_invoke_component.lbl_continue") ??
                //   "Continue"
                // }
                label={ "Make Another Transaction"}
              />
            </View>
            <View style={styles.successButtonWrapper}>

              <TouchableOpacity
                style={styles.successButtonPrimaryStyle}
                activeOpacity={0.8}
                onPress={() => {navigateToHome()}}
              >
                <Text style={styles.successButtonPrimaryLabelStyle}>
                  Back to Crypto Dashboard
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    )
  }else{
    return (
      <>
        <SafeAreaView>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => {onGoBack()}}
            >
              <ArrowBack />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.containerStyle}>
          <View style={styles.containerWrapperStyle}>

                <View style={styles.rowSpaceBetween}>
                  <View style={defaultData.type === 'Buy' ? styles.headerActiveButton : styles.headerInActiveButton}>
                    <Text style={styles.buttonTitle}>Buy BTC</Text>
                  </View>
                  <View style={defaultData.type === 'Sell' ? styles.headerActiveButton : styles.headerInActiveButton}>
                    <Text style={styles.buttonTitle}>Sell BTC</Text>
                  </View>
                </View>

                <View style={styles.labelWrapper}>
                  {defaultData.item.icon}
                  <View style={styles.headerBannerWrapper}>
                    <Text style={styles.headerLabel}>1 BTC = ₱ 2,453,766.63</Text>
                    <Text style={styles.headerSubLabel}>This is only an initial estimate, price may still change.</Text>
                  </View>
                </View>
                <View style={styles.subHeader}>
                  <Text style={styles.subHeaderText}>Enter amount</Text>
                </View>

                <View style={styles.cardWrapper}>

                  <View style={styles.cardBannerWrapper}>
                    <View style={styles.cardBannerContainer}>
                      <Text style={styles.cardLabelText}>₱ 0.00</Text>
                      <Text style={styles.cardValueText}>= 0 BTC</Text>
                    </View>
                  </View>

                  <View style={styles.cardButtonWrapper}>
                    <View style={styles.cardButtonItem}>
                      <Text style={styles.cardButtonText}>25%</Text>
                    </View>
                    <View style={styles.cardButtonItem}>
                      <Text style={styles.cardButtonText}>50%</Text>
                    </View>
                    <View style={styles.cardButtonItem}>
                      <Text style={styles.cardButtonText}>75%</Text>
                    </View>
                    <View style={styles.cardButtonItem}>
                      <Text style={styles.cardButtonText}>100%</Text>
                    </View>
                  </View>

                  <View style={styles.hrL}></View>

                  <View style={styles.footerBannerWrapper}>
                    <Text style={styles.footerSubLabel}>My PDAX PHP Balance: </Text>
                    <Text style={styles.footerLabel}>₱ 6,123.75</Text>
                  </View>
                </View>

                <View style={styles.footerCardWrapper}>
                  <Text style={styles.footerCardSubLabel}>NOTE: Please keep in mind that the prices of crypto are volatile and may carry a high level of risk. By proceeding, you agree to our</Text>
                  <Text style={styles.footerCardLabel}>Terms & Conditions.</Text>
               </View>
          </View>
          <View style={styles.footerContainerStyle}>
            <View style={styles.footerButtonWrapper}>
              <Button
                onPress={()=>{setIsVisible(true)}}
                // label={
                //   i18n?.t("customer_invoke_component.lbl_continue") ??
                //   "Continue"
                // }
                label={ "Convert"}
              />
            </View>
          </View>
        </View>
        <BottomSheet onBackButtonPress={onClose} onBackdropPress={onClose} isVisible={isVisible}>
          <View style={styles.containerStyle2}>
            <View style={styles.headerWrapper}>
              <Text style={styles.modalTitleStyle}>Review Summary</Text>
              <TouchableOpacity onPress={onClose} >
                <Text style={styles.modalTitleButtonStyle}>Close</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.modalItemWrapper}>
              <Text style={styles.itemLabelStyle}>BTC Amount</Text>
              <Text style={styles.itemLabelStyle}>0.00028167 BTC</Text>
            </View>
            <View style={styles.modalItemWrapper}>
              <Text style={styles.itemLabelStyle}>PHP Amount</Text>
              <Text style={styles.itemLabelStyle}>₱ 287.22 </Text>
            </View>
            <View style={styles.modalItemWrapper}>
              <Text style={styles.itemLabelStyle}>Estimated Fee</Text>
              <Text style={styles.itemLabelStyle}>₱ 0.00</Text>
            </View>
            <View style={styles.modalItemWrapper}>
              <Text style={styles.itemValueStyle}>Total Amount</Text>
              <Text style={styles.itemValueStyle}>₱ 287.22 </Text>
            </View>

            <Button
              onPress={() => {
                // onValueChanged(value!);
                setIsVisible(false)
                setShowSuccess(true)
              }}
              label="Confirm Transaction"
              // disabled={value === undefined}
              // disableColor={colors.secondaryButtonColor}
              style={{
                primaryContainerStyle: {
                  marginTop: 30,
                },
              }}
            />
          </View>
        </BottomSheet>
      </>
    );
  }



};

export default CryptoTradeComponent;
