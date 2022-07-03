import React, { useContext, useEffect, useState } from 'react';
import { StyleProp, TextStyle, ViewStyle,StyleSheet, SafeAreaView, View, Text,TouchableOpacity  } from 'react-native';
import { Button, ThemeContext,CheckBox } from 'react-native-theme-component';
import useMergeStyles from './styles';



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
  // const { getBanks } = useContext(AccountLinkingContext); //eslint-disable-line  @typescript-eslint/no-unused-vars

  const [isMount, setIsMount] = useState<boolean>(false);
  const [isSelected1, setSelected1] = useState(false);
  const [isSelected2, setSelected2] = useState(false);
  const [isSelected3, setSelected3] = useState(false);

  useEffect(() => {
    if (isMount) {
      // getWallets();
    }
  }, [isMount]); // eslint-disable-line react-hooks/exhaustive-deps

  const firstName = `${profile?.firstName}`.trim();

  // return (
  //   <ErrorVerificationComponent
  //     onNext={() => {
  //       // onBack();
  //     }}
  //     name={firstName}
  //   />
  // );

  // return (
  //   <SuccessVerificationComponent
  //     onNext={() => {
  //       // onBack();
  //     }}
  //     name={firstName}
  //   />
  // );
  //
    return (
      <>
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
                    title="This is a place holder for Exchange Terms and Condiition. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Link out to terms and condition"
                    isSelected={isSelected1}
                    onChanged={() => {
                      setSelected1(!isSelected1);
                    }}
                    style={styles.checkBoxInputFieldStyle}
                    // disabled
                  />
                </View>
                <View style={styles.checkBoxWrapper}>
                  <CheckBox
                    title="This is a place holder for Exchange Terms and Condiition. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Link out to terms and condition"
                    isSelected={isSelected2}
                    onChanged={() => {
                      setSelected2(!isSelected2);
                    }}
                    style={styles.checkBoxInputFieldStyle}
                    // disabled
                  />
                </View>
                <View style={styles.checkBoxWrapper}>
                  <CheckBox
                    title="This is a place holder for Exchange Terms and Condiition. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Link out to terms and condition"
                    isSelected={isSelected3}
                    onChanged={() => {
                      setSelected3(!isSelected3);
                    }}
                    style={styles.checkBoxInputFieldStyle}
                    // disabled
                  />
                </View>
              </View>
            </View>

            <View style={{ paddingHorizontal: 15, bottom: 5 }}>
              <Button
                label={'Proceed to activate crypto account'}
                onPress={() => {}}
                disabled={false}
                disableColor={colors.primaryButtonColor}
              />
            </View>
          </SafeAreaView>
        </View>
      </>
    );
  };

export default CryptoLinkAccountComponent;
