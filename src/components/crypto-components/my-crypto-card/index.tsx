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

export type MyCryptoCardThemeProps = {
  style?: MyCryptoCardThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type MyCryptoCardThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type MyCryptoCardProps = {
  message?: string;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: MyCryptoCardThemeStyles;
  isProtected?:boolean;
  isEmpty?:boolean;
  onViewAccount?:()=>void;
  ViewAll?:()=>void;
  isList?:boolean;
};

const MyCryptoCard = (props: MyCryptoCardProps) => {
  const { style,isProtected,isEmpty,onViewAccount,ViewAll,isList } = props;
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
      currentValue:'0.00628167',
      fullName:'Bitcoin',
      rate:'≈ ₱ 9,591.54'
    },
    {
      icon:<BitCoinIcon2 width={40} height={40} />,
      shortName:'ETH',
      currentValue:'0.014716',
      fullName:'Ethereum',
      rate:'≈ ₱ 1,515.16'
    },
    {
      icon:<BitCoinIcon3 width={40} height={40} />,
      shortName:'USDC',
      currentValue:'9.73469',
      fullName:'USD Coin',
      rate:'≈ ₱ 510.00'
    },
    {
      icon:<BitCoinIcon4 width={40} height={40} />,
      shortName:'SLP',
      currentValue:'1608.77699',
      fullName:'Smooth Love Potion',
      rate:'≈ ₱ 510.00'
    },
    {
      icon:<BitCoinIcon5 width={40} height={40} />,
      shortName:'AXS',
      currentValue:'0.2198',
      fullName:'Axie Infinity',
      rate:'≈ ₱ 264.33'
    },
  ]

  const cryptoItems =(item:any)=>{
    return (
      <View style={styles.rowWrapper}>
        <View style={styles.item}>
           {item.icon}
           <View style={styles.itemWrapper}>
             <View style={styles.itemContainer}>
               <Text style={styles.mainLabel}>{item.shortName}</Text>
               <Text style={styles.mainLabel}>{isProtected?'***': item.currentValue}</Text>
             </View>
             <View style={styles.itemContainer}>
               <Text style={styles.subLabel}>{item.fullName}</Text>
               <Text style={styles.subLabel}>{isProtected?'': item.rate}</Text>
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
                <Text style={styles.currency}>My Crypto</Text>
              </View>
              {!isEmpty && !isList && <TouchableOpacity style={styles.rowCurrency} onPress={()=>{ViewAll()}}>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>}
            </View>

            {!isEmpty ? <>
              {data && data.map((obj,key)=>{
                if (!isList) {
                  if (key < 4) {
                    return(<View key={key}>{cryptoItems(obj)}</View>)
                  }else{
                    return(<View key={key}></View>)
                  }
                }else{
                  return(<View key={key}>{cryptoItems(obj)}</View>)
                }

              })}
            </> :
            <View style={styles.placeHolderWrapper}>
              <Text style={styles.title}>You have no crypto yet.</Text>
              <Text style={styles.text}>Buy or transfer-in crypto assets to start</Text>
              <Text style={styles.linkText}>Buy Crypto</Text>
            </View>}
      </View>
    </View>
  );
};

export default MyCryptoCard;
