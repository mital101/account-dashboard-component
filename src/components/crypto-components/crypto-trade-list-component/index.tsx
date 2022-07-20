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
  BitCoinIcon4,
  BitCoinIcon5,
} from '../../../assets/images';
import useMergeStyles from './styles';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';

export type CryptoTradeListComponentThemeProps = {
  style?: CryptoTradeListComponentThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type CryptoTradeListComponentThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type CryptoTradeListComponentProps = {
  message?: string;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: CryptoTradeListComponentThemeStyles;
  isProtected?:boolean;
  isEmpty?:boolean;
  onClickItem?:(data:any)=>void;
  isList?:boolean;
};

const CryptoTradeListComponent = (props: CryptoTradeListComponentProps) => {
  const { style,isProtected,isEmpty,onClickItem,isList } = props;
  const styles = useMergeStyles(style);

  const [showTip1, setTip1] = useState<boolean>(false);
  const [showTip2, setTip2] = useState<boolean>(false);
  const [showTip3, setTip3] = useState<boolean>(false);
  //
  // useEffect(() => {
  //   if (isShowTips) {
  //     setTip1(true)
  //   }
  // },[isShowTips]);

  const data=[
    {
      icon:<BitCoinIcon width={40} height={40} />,
      shortName:'BTC',
      fullName:'Bitcoin',
      price:'₱ 1,106.80000',
      exchangeRate:'+5.00'
    },
    {
      icon:<BitCoinIcon2 width={40} height={40} />,
      shortName:'ETH',
      fullName:'Ethereum',
      price:'₱ 1,580,766.62',
      exchangeRate:'+10.00'
    },
    {
      icon:<BitCoinIcon3 width={40} height={40} />,
      shortName:'USDC',
      fullName:'USD Coin',
      price:'₱ 28.89',
      exchangeRate:'-6.00'
    },
    {
      icon:<BitCoinIcon4 width={40} height={40} />,
      shortName:'SLP',
      fullName:'Smooth Love Potion',
      price:'₱ 107,227.23',
      exchangeRate:'+5.00'
    },
    {
      icon:<BitCoinIcon5 width={40} height={40} />,
      shortName:'AXS',
      fullName:'Axie Infinity',
      price:'₱ 10,702.00',
      exchangeRate:'-3.00'
    },
  ]

  const cryptoItems =(item:any)=>{
    return (
      <TouchableOpacity onPress={()=>{onClickItem(item)}} style={styles.rowWrapper}>
        <View style={styles.tableHeader}>
          <View style={{flex:1,flexDirection:'row',minWidth:'9%'}}>
             {item.icon}
             <View style={styles.itemWrapper}>
               <View style={styles.itemContainer}>
                 <Text style={styles.mainLabel}>{item.shortName}</Text>
               </View>
               <View style={styles.itemContainer}>
                 <Text style={styles.subLabel}>{item.fullName}</Text>
               </View>
             </View>
           </View>
          <View style={{flex:1,flexDirection:'row',alignContent:'center',justifyContent:'flex-start'}}>
            <Text style={styles.dataValue}>{item.price}</Text>
          </View>
          <View style={{flex:1,flexDirection:'row', alignContent:'center',justifyContent:'flex-end'}}>
            <Text style={item.exchangeRate>0?styles.positiveRate:styles.nagativeRate}>{`${item.exchangeRate}%`}</Text>
            <ArrowRightIcon width={14} height={14} color={'#F8981D'} />
          </View>

         </View>
       </TouchableOpacity>
    )
  }

  return (
    <View style={styles.containerStyle}>
      <View style={styles.containerWrapperStyle}>

            <View style={styles.rowSpaceBetween}>
              <View style={styles.rowCurrency}>
                <Text style={styles.title}>Trade</Text>
              </View>
            </View>

            <View style={styles.rowCurrency}>
              <Text style={styles.subTitle}>Select a crypto to trade.</Text>
            </View>
            <View style={styles.rowWrapper}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Currency Name</Text>
                <Text style={styles.tableHeaderText}>Last Price</Text>
                <Text style={styles.tableEndHeaderText}>24h Change</Text>
               </View>
             </View>
            {data && data.map((obj,key)=>{
              return(<View key={key}>{cryptoItems(obj)}</View>)
            })}
      </View>
    </View>
  );
};

export default CryptoTradeListComponent;
