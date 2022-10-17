import { CardTermAndConditionsProps } from './types';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useMergeStyles from './styles';
import { InfoIcon } from '../../../assets/info.icon';
import { WalletContext } from '../../../context/wallet-context';
import { Button } from 'react-native-theme-component';
import LoadingSpinner from '../../loading-spinner';
import { CustomerInvokeContext } from 'customer-invoke-component';

const CardTermAndCondition = ({
  style,
  onAccept,
  onErrorCreateVCApplication
}: CardTermAndConditionsProps) => {
  const styles = useMergeStyles(style);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isEnableSubmitTC, setIsEnableSubmitTC] = useState<boolean>(false);
  const [isEnableSubmitPrivacy, setIsEnableSubmitPrivacy] = useState<boolean>(false);
  const { getCryptoTcData, cryptoTC, isLoadingCryptoTC } = useContext(WalletContext);
  const { createVCApplication, acceptApplication, isLoadingAcceptApplication, errorCreateVCApplication } = useContext(CustomerInvokeContext);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const selectedBG = '#FFF0D9'

  useEffect(() => {
    createVCApplication();
    getCryptoTcData("vc-debit-card-terms-conditions","UnionDigital","UD","HTML");
  }, []);

  useEffect(() => {
    if(errorCreateVCApplication) {
      onErrorCreateVCApplication && onErrorCreateVCApplication();
    }
  }, [errorCreateVCApplication]);

  const onAcceptTC = async () => {
    setIsEnableSubmitTC(false);
    if(cryptoTC) {
      const isAccepted = await acceptApplication(cryptoTC.templateId);
      console.log('onAcceptTC -> isAccepted', isAccepted);
      if(isAccepted) {
        scrollViewRef.current?.scrollTo(0,0,false);
        getCryptoTcData("vc-debit-card-privacy-notice","UnionDigital","UD","HTML");
        setSelectedIndex(1);
      }
    }
  }

  const onAcceptPrivacy = async () => {
    setIsEnableSubmitPrivacy(false);
    if(cryptoTC) {
      const isAccepted = await acceptApplication(cryptoTC.templateId);
      if(isAccepted) {
        onAccept && onAccept();
      }
    }
  }

  const renderLoadingView = () => <View style={styles.loadingView}>
    <LoadingSpinner />
  </View>

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={[styles.tabbarBtn, selectedIndex === 0 && {backgroundColor: selectedBG}]}>
          <Text style={styles.tabbarBtnTitle}>{`Terms & Conditions`}</Text>
        </View>
        <View style={[styles.tabbarBtn, selectedIndex === 1 && {backgroundColor: selectedBG}]}>
          <Text style={styles.tabbarBtnTitle}>{`Privacy Notice`}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>{selectedIndex === 0 ? `Terms & Conditions` : `Privacy Notice`}</Text>
        <View style={[styles.row, styles.spacingnVertical]}>
          <View style={styles.iconInfoWrapper}>
            <InfoIcon width={15} height={15} color={'#3E2D68'}/>
          </View>
          <Text style={styles.contentSubTitle}>{`Please read to the bottom for you to be able to continue.`}</Text>
        </View>
        <ScrollView style={styles.contentScrollView} 
          ref={scrollViewRef}
          onScroll={({nativeEvent}) => {
            const paddingToBottom = 20;
            const {layoutMeasurement, contentOffset, contentSize} = nativeEvent;
            const isCloseToBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
            if (isCloseToBottom) {
              if(selectedIndex === 0) {
                setIsEnableSubmitTC(true);
              } else if(selectedIndex === 1) {
                setIsEnableSubmitPrivacy(true);
              }
            }
          }}
          scrollEventThrottle={400}>
          {isLoadingCryptoTC ? renderLoadingView() : <Text>{cryptoTC?.content}</Text>}
          <View style={styles.paddingBottom} />
        </ScrollView>
        {selectedIndex === 0 ? <Button isLoading={isLoadingAcceptApplication} disableColor='#ECECEC' disabled={!isEnableSubmitTC} label={"Accept and proceed to Privacy Notice"} onPress={onAcceptTC} /> :
        <Button isLoading={isLoadingAcceptApplication} disableColor='#ECECEC' disabled={!isEnableSubmitPrivacy} label={"Accept and continue"} onPress={onAcceptPrivacy} />}
        
      </View>
    </View>
  );
};

export default CardTermAndCondition;
