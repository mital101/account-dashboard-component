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
  PointerIcon
} from '../../../assets/images';
import useMergeStyles from './styles';
import { PieChart } from "react-native-gifted-charts";
export type BreakdownSummaryCardThemeProps = {
  style?: BreakdownSummaryCardThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type BreakdownSummaryCardThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type BreakdownSummaryCardProps = {
  message?: string;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: BreakdownSummaryCardThemeStyles;
  isProtected?:boolean;
  isEmpty?:boolean;
  onViewAccount?:()=>void;
  financialProfile?:any;
};

const BreakdownSummaryCard = (props: BreakdownSummaryCardProps) => {
  const { style,isProtected,isEmpty,onViewAccount,financialProfile } = props;
  const styles = useMergeStyles(style);
  const [chartData, setChartData] = useState<any>([]);
  const data=[
    {value:15,color: '#3E2D68',name:'PHP'},
    {value:22,color: '#FF9800',name:'BTC'},
    {value:21,color: '#7F7B82',name:'ETH'},
    {value:21,color: '#50AF95',name:'USDT'},
    {value:21,color: '#FF93A1',name:'Others'},
  ]

  const hashCode=(str)=> {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  }

  const intToRGB=(i)=> {
    var c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "#"+"00000".substring(0, 6 - c.length) + c;
  }

  useEffect(() => {
    if (financialProfile) {
      let currencyList = []
      let othersCurrencyList = 0
      console.log('financialProfile.walletSummaries',financialProfile.walletSummaries);

      financialProfile.walletSummaries.map((obj,key)=>{
        if (key < 4) {
          currencyList.push(
          {
            value:obj.currentBalanceInBaseCurrency > 0 ? ((obj.currentBalanceInBaseCurrency/financialProfile.totalCurrentBalance)*100) : 0.00,
            color: intToRGB(hashCode(obj.walletId)),
            name:obj.currency
          });
        }else{
          othersCurrencyList += obj.currentBalanceInBaseCurrency
        }



      });
      if (othersCurrencyList > 0) {
        currencyList.push(
        {
          value:(othersCurrencyList/financialProfile.totalCurrentBalance)*100,
          color: '#FF93A1',
          name:'Others'
        });
      }

      setChartData(currencyList)
    }
  },[financialProfile]);



  // let filteredArray = walletsById.find((item) => item.status === 'ACTIVE');


  const renderLegend = (itemData)=>{
    return (
      <View
        style={styles.item}>
        <View style={styles.itemContainer}>
          <View
            style={{
              height: 18,
              width: 18,
              marginRight: 10,
              borderRadius: 10,
              backgroundColor: itemData.color?itemData.color:'#3E2D68',
            }}
          />
          <Text style={{color: '#1D1C1D', fontSize: 16}}>{itemData.name}</Text>
        </View>
        <Text style={{color: '#1D1C1D', fontSize: 16}}>{isProtected?'***': `${itemData.value.toFixed(2)}%`}</Text>
      </View>
    )
  }



  return (
    <View style={styles.containerStyle}>
      <View style={styles.containerWrapperStyle}>
        <View style={styles.rowSpaceBetween}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>Breakdown</Text>
          </View>
        </View>
        <View style={styles.rowSpaceBetween}>

          {!isEmpty?
            <>
              <PieChart
                isAnimated
                strokeWidth={1}
                strokeColor={'#fff'}
                data={chartData}
                donut
                radius={80}
                innerRadius={50}/>
              <View style={styles.graphContainer}>
                {chartData && chartData.map((obj,key)=>{
                  return(<View key={key}>{renderLegend(obj)}</View>)
                })}
              </View>
            </> : <View style={styles.placeHolderWrapper}>
              <Text style={styles.title}>Get started with crypto!</Text>
              <Text style={styles.text}>Transfer-in money from your My Pitaka or transfer-in crypto assets from your other wallets.</Text>
              <Text style={styles.linkText}>Transfer-in Peso or Crypto</Text>

            </View>}

        </View>
      </View>
    </View>
  );
};

export default BreakdownSummaryCard;
