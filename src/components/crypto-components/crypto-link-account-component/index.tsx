import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, TextStyle, ViewStyle,StyleSheet, SafeAreaView, View, Text,TouchableOpacity  } from 'react-native';
import { Button, ThemeContext,CheckBox } from 'react-native-theme-component';
import useMergeStyles from './styles';
import WebView from 'react-native-webview';

//createCryptoApplication

// import { AccountLinkingContext } from '@banking-component/account-linking';
import { AuthContext } from 'react-native-auth-component';

import {
  WalletCardComponent,
  WalletContext,
  ArrowBack,
  CryptoLinkAccountIcon,
} from '@banking-component/wallet-component';

import {
  SuccessVerificationComponent,
  ErrorVerificationComponent,
} from '@banking-component/wallet-component/src/components/crypto-components';

// import { AccountOriginationContext } from 'account-origination-component';

import { CustomerInvokeContext } from 'customer-invoke-component';

export type CryptoLinkAccountComponentProps = {
  style?: CryptoLinkAccountComponentStyles;
  onPressBack:() => void;
  onNext: () => void;
};

export type CryptoLinkAccountComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

const CryptoLinkAccountComponent = ({ style, onNext,onPressBack }: CryptoLinkAccountComponentProps) => {
  const styles: CryptoLinkAccountComponentStyles = useMergeStyles(style);
  const { i18n,colors } = useContext(ThemeContext);

  const { profile } = useContext(AuthContext);

  const {
    createCryptoApplication,
    cryptoApplicationDetails,
    cryptoErrorCreateApplication,
    isCryptoCreatingApplication,
    isCryptoCreatedApplication,
    clearErrors
  } = useContext(CustomerInvokeContext);

  const { getCryptoTcData, cryptoTC, isLoadingCryptoTC, getWalletsById } = useContext(WalletContext);

  // const [isMount, setIsMount] = useState<boolean>(false);
  const [isSelected1, setSelected1] = useState(false);
  const [isSelected2, setSelected2] = useState(false);
  const [isSelected3, setSelected3] = useState(false);
  const [isAppCreated, setIsAppCreated] = useState(false);
  const [isShowTc, setShowTc] = useState(false);


  useEffect(() => {
    getCryptoTcData("pdax-terms-conditions","UnionDigital","UD","HTML");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const firstName = `${profile?.firstName}`.trim();

  useEffect(() => {
    if (isCryptoCreatedApplication) {
      getWalletsById('PDAX')
      setIsAppCreated(isCryptoCreatedApplication)
    }
  }, [isCryptoCreatedApplication]);

  if (cryptoErrorCreateApplication) {
    return (
      <ErrorVerificationComponent
        onHome={() => {
          onPressBack();
          clearErrors()
        }}
        retry={() => {
          clearErrors()
          setIsAppCreated(false)
          if (cryptoTC) {
            createCryptoApplication(cryptoTC?.templateId)
          }
        }}
        name={firstName}
      />
    );
  }

  if (isAppCreated && !cryptoErrorCreateApplication) {
    return (
      <SuccessVerificationComponent
        onNext={() => {
          onNext();
        }}
        name={firstName}
      />
    );
  }

  if (isShowTc) {
    return (
      <View style={styles.tcContentWrapper}>
        <SafeAreaView>
          <View style={styles.webViewmainContainerStyle}>
            <TouchableOpacity onPress={()=>{
              setShowTc(false)
            }} style={styles.webViewheader}>
              <ArrowBack color={'#3E2D68'} />
            </TouchableOpacity>
            {isLoadingCryptoTC ? (
              <View><Text>Loading</Text></View>
            ) : (
            <WebView
                startInLoadingState
                scalesPageToFit
                originWhitelist={['*']}
                source={{ html:cryptoTC?.content}}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  }else{
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.mainContainerStyle}>
            <TouchableOpacity onPress={()=>{
              onPressBack()
            }} style={styles.header}>
              <ArrowBack color={'#fff'} />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>Before you proceed...</Text>
            </View>
            <View style={styles.headerIcon}>
              <CryptoLinkAccountIcon width={120} height={120} />
              <Text style={styles.subTitle}>
                Please keep in mind that the price of crypto are volatile and may carry a high level
                of risk.
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>
                Kindly checkout our UnionDigital Bank Crypto Accounts’s Terms and Conditions:
              </Text>

              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  title={
                    <Text>This is a place holder for Exchange Terms and
                      Condiition. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. <Text onPress={() =>{setShowTc(true)}} style={styles.tcLink}>
                        Link out to terms and condition
                      </Text>
                    </Text>}
                  isSelected={isSelected1}
                  onChanged={() => {
                    setSelected1(!isSelected1);
                  }}
                  style={styles.checkBoxInputFieldStyle}
                />
              </View>
              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  title={
                    <Text>This is a place holder for Exchange Terms and
                      Condiition. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. <Text onPress={() =>{setShowTc(true)}} style={styles.tcLink}>
                        Link out to terms and condition
                      </Text>
                    </Text>}
                  isSelected={isSelected2}
                  onChanged={() => {
                    setSelected2(!isSelected2);
                  }}
                  style={styles.checkBoxInputFieldStyle}
                />
              </View>
              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  title={
                    <Text>This is a place holder for Exchange Terms and
                      Condiition. Lorem ipsum dolor sit amet, consectetur
                      adipiscing elit. <Text onPress={() =>{setShowTc(true)}} style={styles.tcLink}>
                        Link out to terms and condition
                      </Text>
                    </Text>}
                  isSelected={isSelected3}
                  onChanged={() => {
                    setSelected3(!isSelected3);
                  }}
                  style={styles.checkBoxInputFieldStyle}
                />
              </View>
            </View>
          </View>

          <View style={(isSelected1 && isSelected2 && isSelected3) ? styles.buttonWrapper:styles.disableButtonWrapper}>
            <Button
              label={'Proceed to activate crypto account'}
              isLoading={isCryptoCreatingApplication}
              onPress={() => {

                if (cryptoTC) {
                  createCryptoApplication(cryptoTC?.templateId)
                }
              }}
              disabled={(isSelected1 && isSelected2 && isSelected3) ? false : true}
              disableColor={colors.primaryButtonColor}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
};

export default CryptoLinkAccountComponent;
