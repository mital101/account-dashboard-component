import { MyCardComponentProps } from './types';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
  RefreshControl
} from 'react-native';
import useMergeStyles from './styles';
import { CloseEyesIcon, EyesIcon, images, InformationIcon, Page1, Page2, Page3, PointerIcon } from '../../../assets/images';
import { Carousel } from 'account-origination-component/src/components/carousel';
import RowSelection from '../../../components/row-selection';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import { WalletContext } from '../../../context/wallet-context';
import { Button } from 'react-native-theme-component';
import AlertModal from '../../alert-model';
import { CardWalletSensitiveData } from '../../../model';
import { WalletService } from '../../../services/wallet-service';

const walletService = WalletService.instance();

const MyCardComponent = ({
  style,
  props
}: MyCardComponentProps) => {
  const { isShowWalkThrough = true,
    onToggleShowingSensitiveData, 
    onSuccessUpdateTransactionLimit,
    onFailedUpdateTransactionLimit,
    onReportCard, 
    transactionLimitValue, 
    isShowSensitiveData, 
    isInProgressStatus, 
    isVCActive, 
    onToggleActiveCard, 
    onUpdateTransactionLimits, 
    onUpdateTransactionChannel, 
    onSuccessUpdatedStatus, 
    onFailedUpdatedStatus,
    onSuccessUpdateTransactionChannel,
    onFailedUpdateTransactionChannel,
    onSuccessReportCard,
    onFailedReportCard
  } = props;
  const [toolTipCardVisible, setToolTipCardVisible] = useState<boolean>(isShowWalkThrough);
  const [toolTipOptionsVisible, setToolTipOptionsVisible] = useState<boolean>(false);
  const [isSkiped, setIsSkiped] = useState<boolean>(false);
  const [isVisibleOkBtn, setIsVisibleOkBtn] = useState<boolean>(true);
  const [ttOptionsYPosition, setTTOptionsYPosition] = useState<number>(0);
  const [ttPointerCardPosition, setTTCardPointerPosition] = useState<number>(0);
  const [ttPointerOptionsPosition, setTTPointerOptionsPosition] = useState<number>(0);
  const [isShowAlertUpdateStatusVC, setIsShowAlertUpdateStatusVC] = useState<boolean>(false);
  const [sensitiveData, setSensitiveData] = useState<CardWalletSensitiveData>();
  const [isShowErrorGetSensitiveData, setIsShowErrorGetSensitiveData] = useState<boolean>(false);

  const {
    cardWallet,
    getCardWallet,
    getTransactionLimit,
    getTransactionChannels,
    transactionLimitsOverall,
    isEnableTransactionChannel,
    initIsEnableTransactionChannel,
    oneTimeToken,
    isLoadingCardWallet = false,
    selectedReportOption
  } = useContext(WalletContext);

  useEffect(() => {
    getCardWallet();
    getTransactionLimit();
    getTransactionChannels();
  }, []);

  useEffect(() => {
    console.log('getSensitiveData -> isShowSensitiveData', isShowSensitiveData);
    getSensitiveData();
  }, [isShowSensitiveData]);

  useEffect(() => {
    updateCardStatus();
  }, [isVCActive]);

  useEffect(() => {
    updateTransactionLimitValue();
  }, [transactionLimitValue]);

  useEffect(() => {
    updateTransactionChannel();
  }, [isEnableTransactionChannel]);

  useEffect(() => {
    reportAndReplaceCard();
  }, [selectedReportOption]);

  const reportAndReplaceCard = useCallback(async () => {
    console.log('reportAndReplaceCard -> ', selectedReportOption)
    if (cardWallet?.walletId && oneTimeToken && selectedReportOption) {
      try {
        await walletService.updateCardStatus('BLOCKED', cardWallet.walletId, oneTimeToken, selectedReportOption.reason, selectedReportOption.reasonCode);
        console.log('rreportAndReplaceCard => esponse -> data');
        getCardWallet();
        onSuccessReportCard && onSuccessReportCard();
      } catch (error) {
        onFailedReportCard && onFailedReportCard();
      }
    }
  }, [cardWallet?.walletId, oneTimeToken, selectedReportOption]);


  const updateTransactionChannel = useCallback(async () => {
    console.log('updateTransactionLimitValue', transactionLimitValue, transactionLimitsOverall)
    if (isEnableTransactionChannel !== initIsEnableTransactionChannel && cardWallet?.walletId && oneTimeToken) {
      try {
        await walletService.updateTransactionChannels(cardWallet?.walletId, oneTimeToken, isEnableTransactionChannel);
        onSuccessUpdateTransactionChannel && onSuccessUpdateTransactionChannel(isEnableTransactionChannel);
      } catch (error) {
        onFailedUpdateTransactionChannel && onFailedUpdateTransactionChannel();
      }
    }
  }, [oneTimeToken, cardWallet?.walletId, isEnableTransactionChannel]);

  const updateTransactionLimitValue = useCallback(async () => {
    console.log('updateTransactionLimitValue', transactionLimitValue, transactionLimitsOverall)
    if (transactionLimitValue && cardWallet?.walletId && transactionLimitsOverall?.limitValue !== transactionLimitValue && oneTimeToken) {
      try {
        const response = await walletService.updateCardTransactionDailyLimit(cardWallet?.walletId, transactionLimitValue, oneTimeToken);
        console.log('response -> data', response?.limitSettings);
        if(response?.limitSettings.length > 0) {
          onSuccessUpdateTransactionLimit && onSuccessUpdateTransactionLimit(response?.limitSettings[0]);
        }
      } catch (error) {
        onFailedUpdateTransactionLimit && onFailedUpdateTransactionLimit();
      }
    }
  }, [transactionLimitsOverall, transactionLimitValue, oneTimeToken, cardWallet?.walletId]);


  const updateCardStatus = useCallback(async () => {
    console.log('updateCardStatus -> isVCActive', isVCActive)
    if (cardWallet?.walletId && oneTimeToken) {
      try {
        const targetStatus = isVCActive ? 'LOCKED' : 'ACTIVE';
        const response = await walletService.updateCardStatus(targetStatus, cardWallet.walletId, oneTimeToken);
        console.log('response -> data', response.data);
        onSuccessUpdatedStatus && onSuccessUpdatedStatus();
      } catch (error) {
        onFailedUpdatedStatus && onFailedUpdatedStatus();
      }
    }
  }, [cardWallet?.walletId, oneTimeToken, isShowSensitiveData]);


  const getSensitiveData = useCallback(async () => {
    console.log('getSensitiveData -> isShowSensitiveData', isShowSensitiveData)
    try {
      if (cardWallet?.walletId && oneTimeToken && isShowSensitiveData) {
        const response = await walletService.getVCSensitiveData(cardWallet.walletId, oneTimeToken);
        console.log('response -> data', response.data);
        setSensitiveData(response.data.pciData);
      }
    } catch (e) {
      setIsShowErrorGetSensitiveData(true);
    }
  }, [cardWallet?.walletId, oneTimeToken, isShowSensitiveData]);
  
  const ttCardRef = useRef<View>(null);
  const refOptionsView = useRef<View>(null);
  const refScreen = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const styles = useMergeStyles(style);
  
  const carouselList = [
    { item: <Page1 width={170} height={254} /> },
    { item: <Page2 width={170} height={254} /> },
    { item: <Page3 width={170} height={254} /> },
  ];

  useEffect(() => {
    refScreen?.current?.measure( (_, __, ___, height) => {
      const screenHeight = height;
    refOptionsView?.current?.measure((_, __, ___, height, ____, pageY) => {
      if((height + pageY) < screenHeight) {
        setTTOptionsYPosition(0);
        setTTCardPointerPosition(screenHeight * 3 / 4);
        setTTPointerOptionsPosition(screenHeight / 4);
      } else {
        setTTOptionsYPosition(height + pageY - screenHeight + 20);
        setTTCardPointerPosition(screenHeight * 6 / 7);
        setTTPointerOptionsPosition(screenHeight / 9);
      }
    });
    });
  }, []);
  
  const onSelectTransactionChannel = () => {
    console.log('onSelectTransactionChannel');
    onUpdateTransactionChannel();
  }

  const onSelectTransactionLimits = () => {
    console.log('onSelectTransactionLimits');
    onUpdateTransactionLimits();
  }

  const onSelectReportCard = () => {
    console.log('onSelectReportCard');
    onReportCard();
  }

  const onToggleActiveSwitch = () => {
    setIsShowAlertUpdateStatusVC(true);
  }

  const onNextTTCard = () => {
    setToolTipCardVisible(false);
    scrollViewRef?.current?.scrollTo({y: ttOptionsYPosition });
    setTimeout(() => {
      setToolTipOptionsVisible(true);
    }, 500);
  }

  const onNextTTOptions = () => {
    setToolTipOptionsVisible(false);
    scrollViewRef?.current?.scrollTo(0);
  }

  const onHideOKBtn = () => {
    setIsVisibleOkBtn(false);
  }

  const onConfirmAlertUpdateStatusVC = () => {
    setIsShowAlertUpdateStatusVC(false);
    onToggleActiveCard();
  }

  const onCancelAlertUpdateStatusVC = () => {
    setIsShowAlertUpdateStatusVC(false)
  }

  const onHideErrorAlert = () => {
    setIsShowErrorGetSensitiveData(false);
    onToggleShowingSensitiveData();
  }

  console.log('render my card',transactionLimitValue);

  return (
    <View style={styles.container} ref={refScreen} collapsable={false}>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef} refreshControl={
        <RefreshControl
          refreshing={isLoadingCardWallet}
          onRefresh={getCardWallet}
        />
      }>
          <Text style={styles.pageTitle}>{'My Card'}</Text>
          {isInProgressStatus ? <View style={styles.cardProgressContainer}>
            <Text style={styles.cardProgressTitle}>Your card request is still processing</Text>
            <Text style={styles.cardProgressSubTitle}>We’ll notify you via SMS once we have processed your card request.</Text>
            {isVisibleOkBtn && <Button
              label={'OK'}  
              style={{
                primaryContainerStyle: {borderRadius: 35, marginTop: 15}
              }}
              onPress={onHideOKBtn}
            />}
          </View> : <Tooltip
            isVisible={toolTipCardVisible && !isSkiped} 
            allowChildInteraction={false}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 10, right: 10 }}
            contentStyle={styles.ttCardContainer}
            content={<View ref={ttCardRef} collapsable={false}>
                <View style={styles.row}>
                  <InformationIcon size={15} />
                  <View style={styles.marginLeft}>
                    <Text>UnionDigital Bank Virtual Card</Text>
                  </View>
                </View>
                <View style={styles.ttContent}>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis.</Text>
                </View>
            </View>}
            placement="bottom"
            extraView={
              <>
                  <View style={[styles.pointerView, {top: ttPointerCardPosition}]} >
                    <TouchableOpacity
                      onPress={onNextTTCard}
                      style={styles.column}
                    >
                      <PointerIcon width={40} height={40} />
                      <Text style={styles.pointerText}>Tap to Continue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.skipView}>
                    <TouchableOpacity
                      onPress={() => setIsSkiped(true)}
                      style={styles.skipBtn}
                    >
                      <Text style={styles.skipText}>Skip Walkthrough</Text>
                    </TouchableOpacity>
                  </View>
                </>
            }
            onClose={onNextTTCard}
          >
          <View style={[styles.vcCardContainer, !isVCActive && {backgroundColor: '#676666'}]}>
            <View style={styles.rowSpaceBetween}>
              <Text style={[styles.cardText, styles.title]}>{cardWallet?.walletName}</Text>
              <TouchableOpacity disabled={!isVCActive} onPress={onToggleShowingSensitiveData}>
              {!isShowSensitiveData ? <EyesIcon width={18} height={18} /> : <CloseEyesIcon width={18} height={18} />}
              </TouchableOpacity>
            </View>
            <View style={styles.rowSubTitle}>
            <Text style={[styles.cardText, styles.subTitle]}>UnionDigital Bank Debit</Text>
            </View>
            <View style={styles.rowCardNumber}>
              <Text style={[styles.cardText, styles.title]}>{isShowSensitiveData ? sensitiveData?.pan : `****  ${cardWallet?.cardData?.cardLastFourDigitNumber}`}</Text>
            </View>
            <View style={styles.row}>
              <View style={styles.row}>
                <Text style={[styles.cardText, {width: 35}]}>{`VALID THRU: `}</Text>
                <Text style={styles.cardText}>{`${isShowSensitiveData ? sensitiveData?.expiry : '****'}`}</Text>

              </View>
              <View style={styles.cvvSection}>
                <Text style={styles.cardText}>{`CVV:  ${isShowSensitiveData ? sensitiveData?.cvv : '****'}`}</Text>
              </View>
            </View>
            <View style={styles.rowSpaceBetween}>
              <Image source={images.visa} />
              <View style={styles.imageUD}>
                <Image style={styles.image} source={isVCActive ? images.udVCCard : images.udVCCardDisable} />
              </View>
            </View>
          </View>
        </Tooltip>}
        {isShowSensitiveData && <View style={[styles.row, styles.noteWrapper]}>
          <Text style={styles.note}>NOTE: </Text>
          <Text style={styles.noteDescription}>For your security, please keep your details private.</Text>
        </View>}
        <Tooltip
            isVisible={toolTipOptionsVisible && !isSkiped}
            allowChildInteraction={false}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 10, right: 10 }}
            contentStyle={styles.ttCardContainer}
            content={<View>
                <View style={styles.row}>
                  <InformationIcon size={15} />
                  <View style={styles.marginLeft}>
                    <Text>Manage cards</Text>
                  </View>
                </View>
                <View style={styles.ttContent}>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis tortor magna, non porta nibh cursus in. Mauris efficitur finibus odio et condimentum.</Text>
                </View>
            </View>}
            placement="top"
            extraView={
              <>
                  <View style={[styles.pointerView, {top: ttPointerOptionsPosition}]}>
                    <TouchableOpacity
                      onPress={onNextTTOptions}
                      style={styles.column}
                    >
                      <PointerIcon width={40} height={40} />
                      <Text style={styles.pointerText}>Tap to Continue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.skipView}>
                    <TouchableOpacity
                      onPress={() => setIsSkiped(true)}
                      style={styles.skipBtn}
                    >
                      <Text style={styles.skipText}>Skip Walkthrough</Text>
                    </TouchableOpacity>
                  </View>
                </>
            }
            onClose={onNextTTOptions}
          >
            <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
            <View style={styles.optionsSection} ref={refOptionsView} collapsable={false}>
            <RowSelection props={{
              title: 'Lock or Unlock card',
              subtitle: `Your card is `,
              value: `${isVCActive ? 'unlocked' : 'locked'}.`,
              rightIcon: <Switch
                trackColor={{ false: "red", true: "#40916C" }}
                thumbColor={isVCActive ? "#FFFFFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onToggleActiveSwitch}
                value={isVCActive}
                disabled={isInProgressStatus}
              />,
              disabled: isInProgressStatus,
            }}
            style={{
              value: {
                color: isVCActive ? "#40916C" : "#CC444B"
              }
            }} />
            <RowSelection props={{
              title: 'Transaction channels',
              subtitle: 'Update card’s stransaction channels status',
              onPress: onSelectTransactionChannel,
              disabled: isInProgressStatus || !isVCActive
            }} />
            <RowSelection props={{
              title: 'Transaction limits',
              subtitle: 'Update card’s transaction limits',
              onPress: onSelectTransactionLimits,
              disabled: isInProgressStatus || !isVCActive
            }} />
            <RowSelection props={{
              title: 'Report Card',
              subtitle: 'Lost your card? Request for a new one',
              onPress: onSelectReportCard,
              disabled: isInProgressStatus || !isVCActive
            }} />
            </View>
            )}
            </TooltipChildrenContext.Consumer>
       
          </Tooltip>
        <View style={styles.learnSection}>
          <Text style={styles.titleSection}>{'Learn & Grow'}</Text>
          <View style={styles.sliderContainerStyle}>
            <Carousel
              showBullets={false}
              containerStyle={styles.dashboardCarousel}
              carouselList={carouselList}
            />
          </View>
        </View>
      </ScrollView>
      <AlertModal 
        isVisible={isShowAlertUpdateStatusVC} 
        title={isVCActive ? 'Are you sure you would like to lock your card?' : 'Unlock Card?'}
        onConfirmed={onConfirmAlertUpdateStatusVC}
        onCancel={onCancelAlertUpdateStatusVC} 
        iconColor={'#FBC02D'}
        subtitle={isVCActive ? 'You will not be able to perform card transactions if you lock the card. Existing Direct Debit, recurring automatic payments, standing instructions will not be affected by the temporary block and you will remain responsible for these transactions.' : 'Are you sure you would like to unlock your card?'}
        btnLabel={'Confirm'} 
        secondaryBtnLabel={'Cancel'}
      />
      <AlertModal
          isVisible={isShowErrorGetSensitiveData}
          title={'Something went wrong'}
          onConfirmed={getSensitiveData}
          onCancel={onHideErrorAlert}
          iconColor={'#FBC02D'}
          subtitle={`We're having difficulty trying to connect to our server. Please try again.`}
          btnLabel={'Retry'}
          secondaryBtnLabel={'Cancel'}
        />
    </View>
  );
};

export default MyCardComponent;
