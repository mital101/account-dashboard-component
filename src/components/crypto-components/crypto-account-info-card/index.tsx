import React,{useState,useEffect} from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle,TouchableOpacity } from 'react-native';
import {
  ArrowRightIcon,
  EyesIcon,
  PytakaCurrencyIcon,
  TooltipIcon,
  TradeActiveIcon,
  TransferinActiveIcon,
  TransferoutActiveIcon,
  InfoIcon,
  PointerIcon
} from '../../../assets/images';
import useMergeStyles from './styles';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import {
  useCurrencyFormat,
} from "react-native-theme-component";

export type AccountInfoCardThemeProps = {
  style?: AccountInfoCardThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type AccountInfoCardThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type AccountInfoCardProps = {
  message?: string;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: AccountInfoCardThemeStyles;
  isShowTips?:boolean;
  onTipsCompleted?: () => void;
  onTipsTerminated?: () => void;
  onViewAccount?:()=>void;
  onClickTrade?:()=>void;
  onTransferIn?: () => void;
  onTransferOut?: () => void;
  walletData?:any;
};

const AccountInfoCard = (props: AccountInfoCardProps) => {
  const {
    style,
    isShowTips,
    onTipsCompleted,
    onTipsTerminated,
    onViewAccount,
    onClickTrade,
    onTransferIn,
    onTransferOut,
    walletData
  } = props;
  const styles = useMergeStyles(style);

  const [showTipBalance, setShowTipBalance] = useState<boolean>(false);
  const [showTip1, setTip1] = useState<boolean>(false);
  const [showTip2, setTip2] = useState<boolean>(false);
  const [showTip3, setTip3] = useState<boolean>(false);
  const [isHideBalance, setIsHideBalance] = useState<boolean>(false);
  let ballance = '***'
  if (walletData) {
    ballance = isHideBalance ? '***' :  useCurrencyFormat(walletData.currentBalance, walletData.currencyCode);
  }
  useEffect(() => {
    if (isShowTips) {
      setTip1(true)
    }
  },[isShowTips]);

  return (
    <View style={styles.containerStyle}>
      <View  style={styles.rowSpaceBetween}>
        <View style={styles.marginHorizontalView}>
          <Text style={styles.text}>My Crypto Pitaka</Text>
          <Tooltip
            isVisible={showTipBalance}
            allowChildInteraction={false}
            onClose={() => setShowTipBalance(false)}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 35, right: 10 }}
            placement="bottom"
            tooltipStyle={{alignItems:'center'}}
            arrowSize={{ width: 20, height: 10 }}
            backgroundColor={'transparent'}
            contentStyle={{backgroundColor: '#FFF0D9'}}
            content={
              <View style={styles.viewTooltipBalance}>
                <Text style={styles.messageTooltip}>
                This displays the total amount of your portfolio, including all your crypto assets and available cash on hand for buying other crypto.
                </Text>
              </View>
            }
            >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              <TouchableOpacity onPress={() => setShowTipBalance(true)}>
                <TooltipIcon width={12} height={12} />
              </TouchableOpacity>
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>
        </View>
        <TouchableOpacity onPress={() => onViewAccount()} style={styles.marginHorizontalView}>
          <Text style={styles.profileLink}>View </Text>
          <ArrowRightIcon width={14} height={14} color={'#F8981D'} />
        </TouchableOpacity>
      </View>
      <View style={styles.rowSpaceBetween}>
        <View style={styles.rowCurrency}>
          {walletData ? <Text style={styles.currency}>
            {ballance}
          </Text>:
          <>
          <PytakaCurrencyIcon width={16} height={18} />
          <Text style={styles.currency}>0.00</Text>
          </>
        }
        </View>
        <TouchableOpacity onPress={() => setIsHideBalance(!isHideBalance)}>
          <EyesIcon width={18} height={18} />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <Tooltip
            isVisible={showTip1}
            allowChildInteraction={false}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 35, right: 10 }}
            placement="bottom"
            tooltipStyle={{alignItems:'center'}}
            arrowSize={{ width: 40, height: 15 }}
            content={
              <View style={styles.viewTooltip}>
                <View style={styles.viewTooltipHeader}>
                  <InfoIcon width={20} height={20} color={'#3E2D68'} />
                  <Text style={styles.titleTooltip}>Transfer-in</Text>
                </View>
                <Text style={styles.messageTooltip}>
                  Transfer pesos or crypto to your account to start trading and to
                  increase the value of your portfolio
                </Text>
              </View>
            }
            extraView={
              <>
                <View style={styles.pointerView}>
                  <TouchableOpacity
                    onPress={()=>{
                      setTip1(false)
                      setTip2(true)
                    }} style={styles.column}>
                    <PointerIcon width={40} height={40} />
                    <Text style={styles.pointerText}>Tap to Continue</Text>
                  </TouchableOpacity>
                </View>
                <View
                 style={styles.skipView}>
                  <TouchableOpacity onPress={()=>{
                      setTip1(false)
                      onTipsTerminated(false)
                    }} style={styles.skipBtn}>
                    <Text style={styles.skipText}>Skip Walkthrough</Text>
                  </TouchableOpacity>
                </View>
              </>
            }
            >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              <TouchableOpacity onPress={onTransferIn}>
                <TransferinActiveIcon width={70} height={70} />
              </TouchableOpacity>
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>

        <Tooltip
            isVisible={showTip2}
            allowChildInteraction={false}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 15, right: 15 }}
            placement="bottom"
            tooltipStyle={{alignItems:'center'}}
            arrowSize={{ width: 40, height: 15 }}
            content={
              <View style={styles.viewTooltip}>
                <View style={styles.viewTooltipHeader}>
                  <InfoIcon width={20} height={20} color={'#3E2D68'} />
                  <Text style={styles.titleTooltip}>Transfer-out</Text>
                </View>
                <Text style={styles.messageTooltip}>
                  Withdraw your pesos or crypto out of your crypto wallet
                </Text>
              </View>
            }
            extraView={
              <>
                <View style={styles.pointerView}>
                  <TouchableOpacity onPress={()=>{
                      setTip2(false)
                      setTip3(true)
                    }} style={styles.column}>
                    <PointerIcon width={40} height={40} />
                    <Text style={styles.pointerText}>Tap to Continue</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.skipView}>
                  <TouchableOpacity onPress={()=>{
                      setTip2(false)
                      onTipsTerminated(false)
                    }} style={styles.skipBtn}>
                    <Text style={styles.skipText}>Skip Walkthrough</Text>
                  </TouchableOpacity>
                </View>
              </>
            }
            >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              <TouchableOpacity onPress={onTransferOut}>
                <TransferoutActiveIcon width={70} height={70} />
              </TouchableOpacity>
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>

        <Tooltip
            isVisible={showTip3}
            allowChildInteraction={false}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 15, right: 35 }}
            placement="bottom"
            tooltipStyle={{alignItems:'center'}}
            arrowSize={{ width: 40, height: 15 }}
            content={
              <View style={styles.viewTooltip}>
                <View style={styles.viewTooltipHeader}>
                  <InfoIcon width={20} height={20} color={'#3E2D68'} />
                  <Text style={styles.titleTooltip}>Trade</Text>
                </View>
                <Text style={styles.messageTooltip}>
                  Buy and sell crypto assets using your account
                </Text>
              </View>
            }
            extraView={
              <>
                <View style={styles.pointerView}>
                  <TouchableOpacity onPress={()=>{
                      setTip3(false)
                      onTipsCompleted(true)
                    }} style={styles.column}>
                    <PointerIcon width={40} height={40} />
                    <Text style={styles.pointerText}>Tap to Continue</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.skipView}>
                  <TouchableOpacity onPress={()=>{
                      setTip3(false)
                      onTipsTerminated(false)
                    }} style={styles.skipBtn}>
                    <Text style={styles.skipText}>Skip Walkthrough</Text>
                  </TouchableOpacity>
                </View>
              </>
            }
            >
          <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
              <TouchableOpacity onPress={()=>{onClickTrade()}}>
                <TradeActiveIcon width={70} height={70} />
              </TouchableOpacity>
            )}
          </TooltipChildrenContext.Consumer>
        </Tooltip>

      </View>
    </View>
  );
};

export default AccountInfoCard;
