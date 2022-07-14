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


  BitCoinIcon,
  BitCoinIcon2,
  BitCoinIcon3,
  BitCoinIcon4
} from '../../../assets/images';
import useMergeStyles from './styles';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';

export type CryptoTransactionsCardThemeProps = {
  style?: CryptoTransactionsCardThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type CryptoTransactionsCardThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type CryptoTransactionsCardProps = {
  message?: string;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: CryptoTransactionsCardThemeStyles;
  isProtected?:boolean;
  isEmpty?:boolean;
  onViewAccount?:()=>void;
};

const CryptoTransactionsCard = (props: CryptoTransactionsCardProps) => {
  const { style,isProtected,isEmpty,onViewAccount } = props;
  const styles = useMergeStyles(style);

  // const [showTip1, setTip1] = useState<boolean>(false);
  // const [showTip2, setTip2] = useState<boolean>(false);
  // const [showTip3, setTip3] = useState<boolean>(false);
  //
  // useEffect(() => {
  //   if (isShowTips) {
  //     setTip1(true)
  //   }
  // },[isShowTips]);

  const data=[
    {
      shortName:'Transfer-out (Crypto) ',
      currentValue:'- 0.00038167 BTC',
      fullName:'Nov 17, 2021 02:56 PM',
      status:'Pending'
    },
    {
      shortName:'Transfer-in (PHP)',
      currentValue:'+ ₱ 1,000.00',
      fullName:'Nov 15, 2021 02:00 PM',
      status:'Failed'
    },
    {
      shortName:'Buy',
      currentValue:'+ 0.00018167 BTC',
      fullName:'Nov 15, 2021 07:25 AM',
      status:'Completed'
    },
  ]

  const cryptoItems =(item:any)=>{
    return (
      <View style={styles.rowWrapper}>
        <View style={styles.item}>
           <View style={styles.itemWrapper}>
             <View style={styles.itemContainer}>
               <Text style={styles.mainLabel}>{item.shortName}</Text>
               <Text style={styles.mainLabel}>{isProtected?'***': item.currentValue}</Text>
             </View>
             <View style={styles.itemContainer}>
               <Text style={styles.subLabel}>{item.fullName}</Text>
               <Text style={
                  item.status === 'Pending'?styles.subPendingLabel:item.status === 'Failed'?styles.subFailedLabel:styles.subLabel}>{item.status}</Text>
             </View>
           </View>
         </View>
       </View>
    )
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.containerWrapperStyle}>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.rowCurrency}>
            <Text style={styles.currency}>Recent Transactions</Text>
          </View>
          {!isEmpty && <View style={styles.rowCurrency}>
            <Text style={styles.viewAll}>View all</Text>
          </View>}
        </View>


        {!isEmpty ? <>
          {data && data.map((obj,key)=>{
            return(<View key={key}>{cryptoItems(obj)}</View>)
          })}
        </> :
        <View style={styles.placeHolderWrapper}>
          <Text style={styles.text}>Buy or transfer-in crypto assets to start</Text>
        </View>}

      </View>
    </View>
  );
};

export default CryptoTransactionsCard;
