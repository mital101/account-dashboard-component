import React,{useState,useEffect} from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle,TouchableOpacity } from 'react-native';
import {
  ArrowRightIcon,
  EyesIcon,
  PytakaCurrencyIcon,
  TradeActiveIcon,
  TransferinActiveIcon,
  TransferoutActiveIcon,
  InfoIcon,
  PointerIcon,
  CloseEyesIcon,
  PytakaBitcoinIcon
} from '../../../assets/images';
import useMergeStyles from './styles';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';

export type AccountSummaryCardThemeProps = {
  style?: AccountSummaryCardThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type AccountSummaryCardThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type AccountSummaryCardProps = {
  message?: string;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: AccountSummaryCardThemeStyles;
  isProtected?:boolean;
  isEmpty?:boolean;
  onClickHide?: () => void;
  onViewAccount?:()=>void;
};

const AccountSummaryCard = (props: AccountSummaryCardProps) => {
  const { style,isProtected,isEmpty,onClickHide,onViewAccount } = props;
  const styles = useMergeStyles(style);

  // const [isVisible, setIsVisible] = useState<boolean>(false);

  // useEffect(() => {
  //   if (isShowTips) {
  //     setTip1(true)
  //   }
  // },[isShowTips]);

  return (
    <View style={styles.containerStyle}>
      <View style={styles.containerWrapperStyle}>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.rowCurrency}>
            <PytakaCurrencyIcon width={16} height={18} color="#3E2D68"/>
            <Text style={styles.currency}>{isProtected?'***':'12,598.72'}</Text>
          </View>
          <TouchableOpacity onPress={()=>{
            onClickHide(!isProtected)
          }}>
            {isProtected ? <CloseEyesIcon width={25} height={25} color="#F8981D" />:<EyesIcon width={25} height={25} color="#F8981D" />}
          </TouchableOpacity>
        </View>
        <View style={styles.subTitle}>
          <View style={styles.subRowCurrency}>
            <Text style={styles.currencyLink}>{isProtected?'***':isEmpty?'₱ 0.00 (0%)':'₱ 1,000.00 (1.2%)' }</Text>
            <Text style={styles.currencySubLink}> Yesterday's Gain/Loss</Text>
          </View>
        </View>
        <View style={styles.itemSpaceBetween}>
          <View style={styles.rowCurrency}>
            <View style={styles.currencyWrapper}><PytakaCurrencyIcon width={15} height={15} color="#3E2D68"/></View>
            <Text style={styles.currencyMessage}> Peso:</Text>
          </View>
          <View style={styles.rowCurrency}>
            <Text style={styles.accountBalance}>{isProtected?'***':isEmpty?'₱ 0.00':'₱ 3,500.00' }</Text>
          </View>
        </View>
        <View style={styles.itemSpaceBetween}>
          <View style={styles.rowCurrency}>
            <View style={styles.currencyWrapper}><PytakaBitcoinIcon width={15} height={15} color="#3E2D68"/></View>
            <Text style={styles.currencyMessage}> Crypto:</Text>
          </View>
          <View style={styles.rowCurrency}>
            <Text style={styles.accountBalance}>{isProtected?'***': isEmpty?'₱ 0.00': '₱ 9,591.54' }</Text>
          </View>
        </View>
      </View>
      <View style={{height:1,width:'100%',backgroundColor:'#EAEAEB',marginTop:25}}/>
      <View style={styles.containerWrapperStyle}>
        <View style={styles.buttonWrapper}>
          <TransferinActiveIcon width={70} height={70} color={'#FFF0D9'} textColor={'#F8981D'}/>

          <TransferoutActiveIcon width={70} height={70} color={'#FFF0D9'} textColor={'#F8981D'} />

          <TradeActiveIcon width={70} height={70} color={'#FFF0D9'} textColor={'#F8981D'} />

        </View>
      </View>
    </View>
  );
};

export default AccountSummaryCard;
