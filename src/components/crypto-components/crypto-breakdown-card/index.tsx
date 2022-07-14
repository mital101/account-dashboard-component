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
};

const BreakdownSummaryCard = (props: BreakdownSummaryCardProps) => {
  const { style,isProtected,isEmpty,onViewAccount } = props;
  const styles = useMergeStyles(style);

  const data=[
    {value:15,color: '#3E2D68',name:'PHP'},
    {value:22,color: '#FF9800',name:'BTC'},
    {value:21,color: '#7F7B82',name:'ETH'},
    {value:21,color: '#50AF95',name:'USDT'},
    {value:21,color: '#FF93A1',name:'Others'},
  ]
  // const [showTip1, setTip1] = useState<boolean>(false);
  // const [showTip2, setTip2] = useState<boolean>(false);
  // const [showTip3, setTip3] = useState<boolean>(false);
  //
  // useEffect(() => {
  //   if (isShowTips) {
  //     setTip1(true)
  //   }
  // },[isShowTips]);

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
        <Text style={{color: '#1D1C1D', fontSize: 16}}>{isProtected?'***': `${itemData.value}%`}</Text>
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
                data={data}
                donut
                radius={80}
                innerRadius={50}/>
              <View style={styles.graphContainer}>
                {data && data.map((obj,key)=>{
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
