import { MyCardComponentProps } from "./types";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch,
  RefreshControl
} from "react-native";
import useMergeStyles from "./styles";
import {
  CloseEyesIcon,
  EyesIcon,
  images,
  InformationIcon,
  Page1,
  Page2,
  Page3,
  PointerIcon
} from "../../../assets/images";
import { Carousel } from "account-origination-component/src/components/carousel";
import RowSelection from "../../../components/row-selection";
import Tooltip, {
  TooltipChildrenContext
} from "react-native-walkthrough-tooltip";
import { WalletContext } from "../../../context/wallet-context";
import { Button } from "react-native-theme-component";
import AlertModal from "../../alert-model";
import { CardWalletSensitiveData } from "../../../model";
import { WalletService } from "../../../services/wallet-service";
import { KeyPair, RSA } from "react-native-rsa-native";
import { Buffer } from "buffer";
import LoadingSpinner from "@banking-component/account-dashboard-component/src/components/loading-spinner";
global.Buffer = Buffer;

const walletService = WalletService.instance();

const MyCardComponent = ({ style, props }: MyCardComponentProps) => {
  const {
    isShowWalkThrough = true,
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
    onFailedReportCard,
    onSelectPhysicalCard,
    isShowLoadingSensitiveData,
    setIsShowLoadingSensitiveData
  } = props;
  const [toolTipCardVisible, setToolTipCardVisible] = useState<boolean>(
    isShowWalkThrough
  );
  const [toolTipOptionsVisible, setToolTipOptionsVisible] = useState<boolean>(
    false
  );
  const [isSkiped, setIsSkiped] = useState<boolean>(false);
  const [isVisibleOkBtn, setIsVisibleOkBtn] = useState<boolean>(true);
  const [ttOptionsYPosition, setTTOptionsYPosition] = useState<number>(0);
  const [ttPointerCardPosition, setTTCardPointerPosition] = useState<number>(0);
  const [ttPointerOptionsPosition, setTTPointerOptionsPosition] = useState<
    number
  >(0);
  const [isShowAlertUpdateStatusVC, setIsShowAlertUpdateStatusVC] = useState<
    boolean
  >(false);
  const [sensitiveData, setSensitiveData] = useState<CardWalletSensitiveData>();
  const [
    isShowErrorGetSensitiveData,
    setIsShowErrorGetSensitiveData
  ] = useState<boolean>(false);

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
    console.log("getSensitiveData -> isShowSensitiveData", isShowSensitiveData);
    if (isShowSensitiveData) {
      getSensitiveData();
    }
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
    console.log("reportAndReplaceCard -> ", selectedReportOption);
    if (cardWallet?.walletId && oneTimeToken && selectedReportOption) {
      try {
        await walletService.updateCardStatus(
          "BLOCKED",
          cardWallet.walletId,
          oneTimeToken,
          selectedReportOption.reason,
          selectedReportOption.reasonCode
        );
        console.log("rreportAndReplaceCard => esponse -> data");
        getCardWallet();
        onSuccessReportCard && onSuccessReportCard();
      } catch (error) {
        onFailedReportCard && onFailedReportCard();
      }
    }
  }, [cardWallet?.walletId, oneTimeToken, selectedReportOption]);

  const updateTransactionChannel = useCallback(async () => {
    console.log(
      "updateTransactionLimitValue",
      transactionLimitValue,
      transactionLimitsOverall
    );
    if (
      isEnableTransactionChannel !== initIsEnableTransactionChannel &&
      cardWallet?.walletId &&
      oneTimeToken
    ) {
      try {
        await walletService.updateTransactionChannels(
          cardWallet?.walletId,
          oneTimeToken,
          isEnableTransactionChannel
        );
        onSuccessUpdateTransactionChannel &&
          onSuccessUpdateTransactionChannel(isEnableTransactionChannel);
      } catch (error) {
        onFailedUpdateTransactionChannel && onFailedUpdateTransactionChannel();
      }
    }
  }, [oneTimeToken, cardWallet?.walletId, isEnableTransactionChannel]);

  const updateTransactionLimitValue = useCallback(async () => {
    console.log(
      "updateTransactionLimitValue",
      transactionLimitValue,
      transactionLimitsOverall
    );
    if (
      transactionLimitValue &&
      cardWallet?.walletId &&
      transactionLimitsOverall?.limitValue !== transactionLimitValue &&
      oneTimeToken
    ) {
      try {
        const response = await walletService.updateCardTransactionDailyLimit(
          cardWallet?.walletId,
          transactionLimitValue,
          oneTimeToken
        );
        console.log("response -> data", response?.limitSettings);
        if (response?.limitSettings.length > 0) {
          onSuccessUpdateTransactionLimit &&
            onSuccessUpdateTransactionLimit(response?.limitSettings[0]);
        }
      } catch (error) {
        onFailedUpdateTransactionLimit && onFailedUpdateTransactionLimit();
      }
    }
  }, [
    transactionLimitsOverall,
    transactionLimitValue,
    oneTimeToken,
    cardWallet?.walletId
  ]);

  const updateCardStatus = useCallback(async () => {
    console.log("updateCardStatus -> isVCActive", isVCActive);
    if (cardWallet?.walletId && oneTimeToken) {
      try {
        const targetStatus = isVCActive ? "LOCKED" : "ACTIVE";
        const response = await walletService.updateCardStatus(
          targetStatus,
          cardWallet.walletId,
          oneTimeToken
        );
        console.log("response -> data", response.data);
        onSuccessUpdatedStatus && onSuccessUpdatedStatus();
      } catch (error) {
        onFailedUpdatedStatus && onFailedUpdatedStatus();
      }
    }
  }, [cardWallet?.walletId, oneTimeToken, isShowSensitiveData]);

  const getSensitiveData = useCallback(async () => {
    setIsShowLoadingSensitiveData(true);
    setSensitiveData(undefined);
    console.log("set true");
    try {
      RSA.generateKeys(4096) // set key size
        .then(async (keys: KeyPair) => {
          const publicKey = `MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAzHgyZFwqjK8rECfSJB2cvFh/vV/x+svcrIhv8rT47fzvZKATisKA9D74k1s4h7RV6nUPIzNnquN7dNFKxiWxbkOMzPDLOfuzySXPsGRdAq7D6RhOnyAioMkU6eSk9oUX+VApNyHCBe1fHU3RPwkoHK4ktPieR1FR0C+sO/fT7+nyNKh8mwC986jJ7SZnJoPFegvTrdmeIv6o7fNJ0+qru7KE6QyDdl0EikRvHGq/DsfMGpLSHwUzq8Wl6mjs4QsClmNB+R+qzlODnfdf6RZAJXgai0Yr0YNBy7eJN+iCtQNsnooz9lBtIqTggyUb3quWTmfAhg5cbIRLlBik83pcA7M0hoMBPSuefFHEkic7G67B8/ikcCX7jQYU/iiKiSzXtWEQwjwk65jaNR/6h7/02H5Ja3N43o3Fcm7U5Uo3nbcQqYcNF0XKUkAz0LI2BxOX1GPNPVOHZdYNZKm7Nr+RHyHvUH+WaeCO1cdKVAAlO1rzUs+KFJGxvt7IIMHsZk69XwsVIA35r4znhb6xf36PJK/cwrRi+PszkxipFozVIzeADgjC5Mgu9tYpyd+cLFy57tQHgz4PkcCFW7H3fxWKwdaQb3DB/xjVsiiJ6mwflqQq0qx6Re2m7i0mSnQgXVBrLuOA4AZiskN+aliqGw+DQGjq/I7OWPOeykjE2ZphxP8CAwEAAQ==`;
          const privateKey = `-----BEGIN RSA PRIVATE KEY-----
          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
          -----END RSA PRIVATE KEY-----`;
          if (
            cardWallet?.walletId &&
            oneTimeToken &&
            isShowSensitiveData &&
            keys
          ) {
            const response = await walletService.getVCSensitiveData(
              publicKey,
              cardWallet.walletId,
              oneTimeToken
            );
            console.log("privateKey", privateKey);
            if (response.data.pciData) {
              const cvv = await RSA.decrypt(
                response.data.pciData.cvv,
                privateKey
              );
              const expiry = await RSA.decrypt(
                response.data.pciData.expiry,
                privateKey
              );
              const pan = await RSA.decrypt(
                response.data.pciData.pan,
                privateKey
              );
              setSensitiveData({
                cvv,
                expiry: `${expiry.slice(0, 2)} / ${expiry.slice(2)}`,
                pan
              });
              setIsShowLoadingSensitiveData(false);
            }
          }
        });
    } catch (e) {
      setIsShowErrorGetSensitiveData(true);
      setIsShowLoadingSensitiveData(false);
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
    { item: <Page3 width={170} height={254} /> }
  ];

  useEffect(() => {
    refScreen?.current?.measure((_, __, ___, height) => {
      const screenHeight = height;
      refOptionsView?.current?.measure((_, __, ___, height, ____, pageY) => {
        if (height + pageY < screenHeight) {
          setTTOptionsYPosition(0);
          setTTCardPointerPosition((screenHeight * 3) / 4);
          setTTPointerOptionsPosition(screenHeight / 4);
        } else {
          setTTOptionsYPosition(height + pageY - screenHeight + 20);
          setTTCardPointerPosition((screenHeight * 6) / 7);
          setTTPointerOptionsPosition(screenHeight / 9);
        }
      });
    });
  }, []);

  const onSelectTransactionChannel = () => {
    console.log("onSelectTransactionChannel");
    onUpdateTransactionChannel();
  };

  const onSelectTransactionLimits = () => {
    console.log("onSelectTransactionLimits");
    onUpdateTransactionLimits();
  };

  const onSelectReportCard = () => {
    console.log("onSelectReportCard");
    onReportCard();
  };

  const onToggleActiveSwitch = () => {
    setIsShowAlertUpdateStatusVC(true);
  };

  const onNextTTCard = () => {
    setToolTipCardVisible(false);
    scrollViewRef?.current?.scrollTo({ y: ttOptionsYPosition });
    setTimeout(() => {
      setToolTipOptionsVisible(true);
    }, 500);
  };

  const onNextTTOptions = () => {
    setToolTipOptionsVisible(false);
    scrollViewRef?.current?.scrollTo(0);
  };

  const onHideOKBtn = () => {
    setIsVisibleOkBtn(false);
  };

  const onConfirmAlertUpdateStatusVC = () => {
    setIsShowAlertUpdateStatusVC(false);
    onToggleActiveCard();
  };

  const onCancelAlertUpdateStatusVC = () => {
    setIsShowAlertUpdateStatusVC(false);
  };

  const onHideErrorAlert = () => {
    setIsShowErrorGetSensitiveData(false);
    onToggleShowingSensitiveData();
  };

  const onSelectPhysicalCardHandler = () => {
    onSelectPhysicalCard && onSelectPhysicalCard();
  };

  const fromBase64 = (encoded: string) => {
    return Buffer.from(encoded, "base64").toString("utf8");
  };

  console.log("render my card", isShowLoadingSensitiveData);

  return (
    <View style={styles.container} ref={refScreen} collapsable={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingCardWallet}
            onRefresh={getCardWallet}
          />
        }
      >
        <Text style={styles.pageTitle}>{"My Card"}</Text>
        {isInProgressStatus ? (
          <View style={styles.cardProgressContainer}>
            <Text style={styles.cardProgressTitle}>
              Your card request is still processing
            </Text>
            <Text style={styles.cardProgressSubTitle}>
              We’ll notify you via SMS once we have processed your card request.
            </Text>
            {isVisibleOkBtn && (
              <Button
                label={"OK"}
                style={{
                  primaryContainerStyle: { borderRadius: 35, marginTop: 15 }
                }}
                onPress={onHideOKBtn}
              />
            )}
          </View>
        ) : (
          <Tooltip
            isVisible={toolTipCardVisible && !isSkiped}
            allowChildInteraction={false}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 10, right: 10 }}
            contentStyle={styles.ttCardContainer}
            content={
              <View ref={ttCardRef} collapsable={false}>
                <View style={styles.row}>
                  <InformationIcon size={15} />
                  <View style={styles.marginLeft}>
                    <Text>UnionDigital Bank Virtual Card</Text>
                  </View>
                </View>
                <View style={styles.ttContent}>
                  <Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Vestibulum mattis.
                  </Text>
                </View>
              </View>
            }
            placement="bottom"
            extraView={
              <>
                <View
                  style={[styles.pointerView, { top: ttPointerCardPosition }]}
                >
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
            <View
              style={[
                styles.vcCardContainer,
                !isVCActive && { backgroundColor: "#676666" }
              ]}
            >
              <View style={styles.rowSpaceBetween}>
                <Text style={[styles.cardText, styles.title]}>
                  {cardWallet?.walletName}
                </Text>
                <TouchableOpacity
                  disabled={!isVCActive}
                  onPress={onToggleShowingSensitiveData}
                >
                  {!isShowSensitiveData ? (
                    <EyesIcon width={18} height={18} />
                  ) : (
                    <CloseEyesIcon width={18} height={18} />
                  )}
                </TouchableOpacity>
              </View>
              <View style={styles.rowSubTitle}>
                <Text style={[styles.cardText, styles.subTitle]}>
                  UnionDigital Bank Debit
                </Text>
              </View>
              <View style={styles.rowCardNumber}>
                <Text style={[styles.cardText, styles.title]}>
                  {isShowSensitiveData && sensitiveData?.pan
                    ? sensitiveData.pan
                    : `****  ${cardWallet?.cardData?.cardLastFourDigitNumber}`}
                </Text>
              </View>
              <View style={styles.row}>
                <View style={styles.row}>
                  <Text
                    style={[styles.cardText, { width: 35 }]}
                  >{`VALID THRU: `}</Text>
                  <Text style={styles.cardText}>{`${
                    isShowSensitiveData && sensitiveData?.expiry
                      ? sensitiveData?.expiry
                      : "****"
                  }`}</Text>
                </View>
                <View style={styles.cvvSection}>
                  <Text style={styles.cardText}>{`CVV:  ${
                    isShowSensitiveData && sensitiveData?.cvv
                      ? sensitiveData.cvv
                      : "****"
                  }`}</Text>
                </View>
              </View>
              <View style={styles.rowSpaceBetween}>
                <Image source={images.visa} />
                <View style={styles.imageUD}>
                  <Image
                    style={styles.image}
                    source={
                      isVCActive ? images.udVCCard : images.udVCCardDisable
                    }
                  />
                </View>
              </View>
              {isShowLoadingSensitiveData && (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: "center",
                    opacity: 0.3,
                    justifyContent: "space-around",
                    backgroundColor: "gray"
                  }}
                >
                  <LoadingSpinner />
                </View>
              )}
            </View>
          </Tooltip>
        )}

        {/* <View style={styles.imagePC}>
          <Image source={images.pcCardPreview} style={styles.image} resizeMode={'cover'} />
          <View style={styles.pcCardContentView}>
            <View style={styles.pcCardContentImageView}/>
            <View style={styles.pcCardContentWrapper}>
              <Text style={styles.pcCardTitle}>Your card on the go</Text>
              <Text style={styles.pcCardSubTitle}>Get your UD Bank Physical Card, now!</Text>
              <Button onPress={onSelectPhysicalCardHandler} label='Get a card' style={{
                primaryContainerStyle: styles.getACardBtn,
              }}/>
            </View>
          </View>
        </View> */}
        {isShowSensitiveData && (
          <View style={[styles.row, styles.noteWrapper]}>
            <Text style={styles.note}>NOTE: </Text>
            <Text style={styles.noteDescription}>
              For your security, please keep your details private.
            </Text>
          </View>
        )}
        <Tooltip
          isVisible={toolTipOptionsVisible && !isSkiped}
          allowChildInteraction={false}
          showChildInTooltip={true}
          useInteractionManager={true}
          displayInsets={{ top: 20, bottom: 20, left: 10, right: 10 }}
          contentStyle={styles.ttCardContainer}
          content={
            <View>
              <View style={styles.row}>
                <InformationIcon size={15} />
                <View style={styles.marginLeft}>
                  <Text>Manage cards</Text>
                </View>
              </View>
              <View style={styles.ttContent}>
                <Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Vestibulum mattis tortor magna, non porta nibh cursus in.
                  Mauris efficitur finibus odio et condimentum.
                </Text>
              </View>
            </View>
          }
          placement="top"
          extraView={
            <>
              <View
                style={[styles.pointerView, { top: ttPointerOptionsPosition }]}
              >
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
              <View
                style={styles.optionsSection}
                ref={refOptionsView}
                collapsable={false}
              >
                <RowSelection
                  props={{
                    title: "Lock or Unlock card",
                    subtitle: `Your card is `,
                    value: `${isVCActive ? "unlocked" : "locked"}.`,
                    rightIcon: (
                      <Switch
                        trackColor={{ false: "red", true: "#40916C" }}
                        thumbColor={isVCActive ? "#FFFFFF" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={onToggleActiveSwitch}
                        value={isVCActive}
                        disabled={isInProgressStatus}
                      />
                    ),
                    disabled: isInProgressStatus
                  }}
                  style={{
                    value: {
                      color: isVCActive ? "#40916C" : "#CC444B"
                    }
                  }}
                />
                <RowSelection
                  props={{
                    title: "Transaction channels",
                    subtitle: "Update card’s stransaction channels status",
                    onPress: onSelectTransactionChannel,
                    disabled: isInProgressStatus || !isVCActive
                  }}
                />
                <RowSelection
                  props={{
                    title: "Transaction limits",
                    subtitle: "Update card’s transaction limits",
                    onPress: onSelectTransactionLimits,
                    disabled: isInProgressStatus || !isVCActive
                  }}
                />
                <RowSelection
                  props={{
                    title: "Report Card",
                    subtitle: "Lost your card? Request for a new one",
                    onPress: onSelectReportCard,
                    disabled: isInProgressStatus || !isVCActive
                  }}
                />
              </View>
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        <View style={styles.learnSection}>
          <Text style={styles.titleSection}>{"Learn & Grow"}</Text>
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
        title={
          isVCActive
            ? "Are you sure you would like to lock your card?"
            : "Unlock Card?"
        }
        onConfirmed={onConfirmAlertUpdateStatusVC}
        onCancel={onCancelAlertUpdateStatusVC}
        iconColor={"#FBC02D"}
        subtitle={
          isVCActive
            ? "You will not be able to perform card transactions if you lock the card. Existing Direct Debit, recurring automatic payments, standing instructions will not be affected by the temporary block and you will remain responsible for these transactions."
            : "Are you sure you would like to unlock your card?"
        }
        btnLabel={"Confirm"}
        secondaryBtnLabel={"Cancel"}
      />
      <AlertModal
        isVisible={isShowErrorGetSensitiveData}
        title={"Something went wrong"}
        onConfirmed={getSensitiveData}
        onCancel={onHideErrorAlert}
        iconColor={"#FBC02D"}
        subtitle={`We're having difficulty trying to connect to our server. Please try again.`}
        btnLabel={"Retry"}
        secondaryBtnLabel={"Cancel"}
      />
    </View>
  );
};

export default MyCardComponent;
