import React,{useState,useEffect,useContext} from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  SafeAreaView,
  Image,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInput,
  Dimensions
} from 'react-native';
import {
  ArrowBack,
  UnionDigitalBankIcon,
  InfoIcon
} from '../../../assets/images';
import useMergeStyles from './styles';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';

import { BottomSheet, Button,ProcessBar } from 'react-native-theme-component';
import {
  useCurrencyFormat,
  getAmountRawValue
} from "react-native-theme-component";
import { WalletContext } from "../../../context/wallet-context";
import { WalletService } from "../../../services/wallet-service";
import moment from 'moment';
import { AuthContext } from 'react-native-auth-component';
import * as Progress from 'react-native-progress';

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
  onBackToDashboard:()=>void;
  onBackToTransfer:()=>void;
  onGoToHelpCenter:()=>void;
};


const walletService = WalletService.instance();

const CryptoTradeComponent = (props: CryptoTradeComponentProps) => {
  const {
    style,
    onClickItem,
    defaultData,
    onGoBack,
    navigateToHome,
    onBackToDashboard,
    onBackToTransfer,
    onGoToHelpCenter,
   } = props;
  const styles = useMergeStyles(style);
  const {
    setAmountCryptoIn,
    cryptoWallet,
    unionWallet,
    getFinancialProfile,
    financialProfile
  } = useContext(WalletContext);
  const { profile } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [transferPresentage, setTransferPresentage] = useState<number>(0);
  const [transferValue, setTransferValue] = useState<number>(0);
  const [cardExcangeValue, setCardExcangeValue] = useState<string>('');
  const [isLoadingValidation, setIsLoadingValidation] = useState<boolean>(false);
  const [quotesResponse, setQuotesResponse] = useState<any>();
  const [orderResponse, setOrderResponse] = useState<any>();
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [cryptoWalletCurrentBalance, setCryptoWalletCurrentBalance] = useState<string>('');
  const [seconds, setSeconds ] =  useState(15);
  const windowWidth = Dimensions.get('window').width;
  const transferValueFormated =  transferValue > 0 ? useCurrencyFormat(transferValue, "", "") : "";


  useEffect(() => {
    if (cardExcangeValue === '') {
      if (defaultData.type === 'Buy') {
        setCardExcangeValue(`0 ${defaultData.item.code}`)
      }else{
        setCardExcangeValue(`0 PHP`)
      }

    }
  },[]);

  useEffect(() => {

    if (transferValueFormated) {
      if (defaultData.type === 'Buy') {
        let transactionExchangeRate =getAmountRawValue(transferValueFormated ,'PHP')/(getAmountRawValue(defaultData?.currentExchangeRateShowing ,'PHP'));
        setCardExcangeValue(`${Math.round(transactionExchangeRate * 100)/100} ${defaultData.item.code}`)
      }else{
        let transactionExchangeRate =getAmountRawValue(transferValueFormated ,defaultData.item.code)*(getAmountRawValue(defaultData?.currentExchangeRateShowing ,defaultData.item.code));
        setCardExcangeValue(`${Math.round(transactionExchangeRate * 100)/100} PHP`)
      }

    }

  },[transferValueFormated]);

  useEffect(() => {
    getUserFinancialProfile();
  }, []);

  useEffect(() => {
    if (financialProfile) {
      let filteredCryptoBalance = financialProfile.walletSummaries.find((item) => item.currency === defaultData.item.code);

      setCryptoWalletCurrentBalance(filteredCryptoBalance?.currentBalance)
      // setCryptoBalance(financialProfile?.totalCurrentBalance-filteredPesoBalance?.currentBalanceInBaseCurrency)
    }
  },[financialProfile]);

  useEffect(()=>{
    if (isVisible) {
      let myInterval = setInterval(() => {
              if (seconds > 0) {
                  setSeconds(seconds - 1);
              }
          }, 1000)
          return ()=> {
              clearInterval(myInterval);
            };
    }

  });

  const getUserFinancialProfile =()=>{
    if (profile.userId) {
      getFinancialProfile(profile.userId, 'PDAX');
    }
  }

  const unionWalletCurrentBalance = useCurrencyFormat(
    cryptoWallet?.availableBalance || 0,
    'PHP'
  );

  const handleOnTransferPHP = async () => {

    if (defaultData.item) {
      setIsLoadingValidation(true);
      const responeData = await walletService.createTradeQuote(
      defaultData.type === 'Buy'?  transferValueFormated: transferValueFormated * getAmountRawValue(defaultData?.currentExchangeRateShowing ,'PHP'),
        defaultData.type === 'Buy'?"buy":"sell",
        defaultData.item.code,
        defaultData.item.name
      );

      if (responeData.data) {
        setIsVisible(true)
        setSeconds(15)
        setQuotesResponse(responeData.data[0]);
        setIsLoadingValidation(false);
      }else{
        setIsLoadingValidation(false);
      }
    }
  }

  const confirmTransferPHP = async () => {

    if (quotesResponse) {
      setIsLoadingValidation(true);

      try {
        const result = await walletService.placeTradeOrder(
          quotesResponse.quoteId
        );

        if (result.data) {
          setOrderResponse(result.data)
          setIsLoadingValidation(false);
          getUserFinancialProfile();
          setIsVisible(false)
          setShowSuccess(true)
        }else{
          setIsVisible(false)
          setIsFailed(true)
          setIsLoadingValidation(false);
        }
      } catch (error) {
        setIsFailed(true)
        console.log('error ',error);
        setIsLoadingValidation(false);
      }

    }
  }

  const onInputValue = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>
  ) => {
    if (e.nativeEvent.key !== "Backspace") {
      setTransferValue(parseInt(`${transferValue || ""}${e.nativeEvent.key}`));
    } else {
      setTransferValue(parseInt(`${transferValue || ""}`.slice(0, -1)));
    }
  };

  const onClose=()=>{
    setIsVisible(false)
  }

  const onSetAmount=(rate:number)=>{
    setTransferPresentage(rate)
    if (defaultData.type === 'Buy') {
      setTransferValue((cryptoWallet.availableBalance*rate)/100);
    }else{
      setTransferValue((cryptoWalletCurrentBalance*rate)/100);
    }

  }


  if (isFailed) {
    return (
      <View style={styles.containerFailed}>
        <View style={styles.errorContentWrapper}>
          <View style={styles.columnBetween}>
            <View>
              <View style={styles.errorTitleWrapper}>
                <View style={styles.iconErrorWrapper}>
                  <InfoIcon width={80} height={80} color={'#E06D6D'} />
                </View>
                <Text style={styles.statusLabel}>Transfer Unsuccessful</Text>
                <View style={styles.errorMessageWrapper}>
                  <Text style={styles.errorMessageLabel}>
                    We’ve encountered a problem with your transaction. Your
                    crypto has been returned to your crypto pitaka. Please try
                    again later.
                  </Text>
                </View>
              </View>
              {/*<View style={styles.rowErrorBetween}>
                <Text style={[styles.infoTitle, styles.errorInfoTitleColor]}>
                  Reference No.
                </Text>
                <Text style={[styles.infoSubTitle, styles.errorInfoTitleColor]}>
                  {refNumber}
                </Text>
              </View>*/}
            </View>
          </View>
        </View>
        <View>
          <Button
            label={'Back to Crypto Dashboard'}
            onPress={onBackToDashboard}
          />
          <Button
            label={'Have issues? Visit our Help Center!'}
            onPress={onGoToHelpCenter}
            bgColor={'transparent'}
            style={{
              primaryContainerStyle: styles.btnTransparent,
              primaryLabelStyle: styles.labelBtnTransaprent,
            }}
          />
        </View>
      </View>
    );
  }

  if (showSuccess) {
    return(
      <View style={styles.successContainerStyle}>
        <View style={styles.containerWrapperStyle}>
          <Text style={styles.successTitle}>Transaction Successful!</Text>
          {defaultData && orderResponse && <Text  style={styles.successHeaderMessage}>
            {`#UDidIt! You have successfully ${orderResponse.orderType ==="buy"?'bought': 'sold'} your ${defaultData.item.code} via Market Order. See transaction details below:`}
          </Text>}

          <View style={styles.successPanel}>
            <View style={styles.successItemGroup}>
              <Text style={styles.successItemLabel}>Transaction Type</Text>
              {defaultData && orderResponse &&<Text style={styles.successItemValue}>{`${orderResponse.orderType === "buy" ? 'Buy' : 'Sell'} ${defaultData.item.code} asset via Market Order`}</Text>}
            </View>
            <View style={styles.successItemGroup}>
              <Text style={styles.successItemLabel}>Amount</Text>
              {transferValueFormated && <Text style={styles.successItemValue}>{useCurrencyFormat(
                transferValueFormated,
                'PHP'
              )}</Text>}
            </View>
            <View style={styles.successItemGroup}>
              {defaultData && <Text style={styles.successItemLabel}>{`${defaultData.item.code} Amount`}</Text>}
              {orderResponse && <Text style={styles.successItemValue}>{`${orderResponse.items[0].quantity} ${orderResponse.items[0].itemCode}`}</Text>}
            </View>
            <View style={styles.successItemGroup}>
              <Text style={styles.successItemLabel}>Transaction Status</Text>
              <Text style={styles.successItemStatus}>Completed</Text>
            </View>
          </View>

          <View style={styles.successDetailWrapper}>
            <Text style={styles.successDetailLabel}>Transaction Date / Time</Text>
            <Text style={styles.successDetailValue}>{moment(orderResponse.updatedAt).locale('en').format('MMM DD, YYYY/ HH:ss A')}</Text>
          </View>
          <View style={styles.successDetailWrapper}>
            <Text style={styles.successDetailLabel}>Reference No.</Text>
            {orderResponse && <Text style={styles.successDetailValue}>{orderResponse.id}</Text>}
          </View>
          <View style={styles.successLogoWrapper}>
            <UnionDigitalBankIcon height={40} width={150} />
          </View>
        </View>
        <View style={styles.footerContainerStyle}>
          <View style={styles.footerButtonWrapper}>
            <View style={styles.successButtonWrapper}>
              <Button
                onPress={()=>{
                  setShowSuccess(false);
                  onBackToTransfer();
                }}
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
                onPress={() => {
                  // navigateToHome();
                  onBackToDashboard();
                }}
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
                    {defaultData && defaultData.item && <Text style={styles.buttonTitle}>{`Buy ${defaultData.item.code}`}</Text>}
                  </View>
                  <View style={defaultData.type === 'Sell' ? styles.headerActiveButton : styles.headerInActiveButton}>
                    {defaultData && defaultData.item && <Text style={styles.buttonTitle}>{`Sell ${defaultData.item.code}`}</Text>}
                  </View>
                </View>

                <View style={styles.labelWrapper}>
                  {defaultData && defaultData.item && <Image
                     source={{
                       uri: defaultData.item.logo
                     }}
                     style={styles.image}
                   />}
                  <View style={styles.headerBannerWrapper}>
                    {defaultData&& defaultData.item && defaultData.currentExchangeRateShowing&& <Text style={styles.headerLabel}>
                      {`1 ${defaultData.item.code} ≈ ${defaultData.currentExchangeRateShowing}`}
                    </Text>}
                    <Text style={styles.headerSubLabel}>This is only an initial estimate, price may still change.</Text>
                  </View>
                </View>
                <View style={styles.subHeader}>
                  <Text style={styles.subHeaderText}>Enter amount</Text>
                </View>

                <View style={styles.cardWrapper}>

                  <View style={styles.cardBannerWrapper}>
                    <View style={styles.cardBannerContainer}>
                      <View style={styles.textBoxWrapper}>
                        {defaultData.type === 'Buy' && <Text style={styles.cardLabelText}>₱ </Text>}
                        <TextInput
                          value={transferValueFormated}
                          onKeyPress={onInputValue}
                          style={styles.cardInputLabelText}
                          placeholder="0.00"
                          keyboardType="numeric"
                        />
                        {defaultData.type !== 'Buy' && <Text style={styles.cardLabelText}>{defaultData.item.code}</Text>}
                      </View>
                      <Text style={styles.cardValueText}>{`= ${cardExcangeValue}`}</Text>
                    </View>
                  </View>

                  <View style={styles.cardButtonWrapper}>
                    <TouchableOpacity onPress={()=>{onSetAmount(25)}} style={transferPresentage === 25 ? styles.activeCardButtonItem : styles.cardButtonItem}>
                      <Text style={styles.cardButtonText}>25%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onSetAmount(50)}}  style={transferPresentage === 50 ? styles.activeCardButtonItem :styles.cardButtonItem}>
                      <Text style={styles.cardButtonText}>50%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onSetAmount(75)}}  style={transferPresentage === 75 ? styles.activeCardButtonItem :styles.cardButtonItem}>
                      <Text style={styles.cardButtonText}>75%</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{onSetAmount(100)}}  style={transferPresentage === 100 ? styles.activeCardButtonItem :styles.cardButtonItem}>
                      <Text style={styles.cardButtonText}>100%</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.hrL}></View>

                  <View style={styles.footerBannerWrapper}>
                    <Text style={styles.footerSubLabel}>{`My PDAX ${defaultData.item.code} Balance: `}</Text>
                    {defaultData && <Text style={styles.footerLabel}>{ defaultData.type === 'Buy' ? unionWalletCurrentBalance : cryptoWalletCurrentBalance}</Text>}
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
                onPress={()=>{
                  handleOnTransferPHP()

                }}
                isLoading={isLoadingValidation}
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
              {defaultData && <Text style={styles.itemLabelStyle}> {`${defaultData.item.code} Amount`}</Text>}
              {cardExcangeValue && <Text style={styles.itemLabelStyle}>{cardExcangeValue}</Text>}
            </View>
            <View style={styles.modalItemWrapper}>
              <Text style={styles.itemLabelStyle}>PHP Amount</Text>
              {transferValueFormated && <Text style={styles.itemLabelStyle}>{useCurrencyFormat(
                transferValueFormated,
                'PHP'
              )}</Text>}
            </View>
            <View style={styles.modalItemWrapper}>
              <Text style={styles.itemLabelStyle}>Estimated Fee</Text>
              {quotesResponse && <Text style={styles.itemLabelStyle}>{useCurrencyFormat(
                quotesResponse.totalFee,
                'PHP'
              )}</Text>}
            </View>
            <View style={styles.modalItemWrapper}>
              <Text style={styles.itemValueStyle}>Total Amount</Text>
              {quotesResponse && <Text style={styles.itemValueStyle}>{useCurrencyFormat(
                quotesResponse.totalAmount,
                'PHP'
              )}</Text>}
            </View>
            <View style={styles.modalItemTimer}>
              <Text style={styles.itemLabelStyle}>{`Price Valid for ${seconds}s`}</Text>
            </View>
            <ProcessBar processPercent={((seconds/15)*100)} />
           

            <Button
              onPress={() => {
                // onValueChanged(value!);
                confirmTransferPHP();
              }}
              label="Confirm Transaction"
              isLoading={isLoadingValidation}
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
