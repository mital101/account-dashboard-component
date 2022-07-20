import React,{useState,useEffect} from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle,TouchableOpacity,ScrollView } from 'react-native';
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
import {
  Button,
} from "react-native-theme-component";
import { LineChart } from "react-native-gifted-charts";

export type CryptoTradeComponentThemeProps = {
  style?: CryptoTradeComponentThemeStyles;
  props: {
    message?: string;
    buttonLabel?: string;
    onLinkAccountPressed?: () => void;
  };
};

export type CryptoTradeComponentThemeStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
};

export type CryptoTradeComponentProps = {
  itemData: string;
  buttonLabel?: string;
  onLinkAccountPressed?: () => void;
  style?: CryptoTradeComponentThemeStyles;
  isEmpty?:boolean;
  onClick?:(data:any)=>void;
  isList?:boolean;
};

const CryptoTradeComponent = (props: CryptoTradeComponentProps) => {
  const { style,itemData,isEmpty,onClick,isList } = props;
  const styles = useMergeStyles(style);

  const [isActive, setIsActive] = useState<number>(0);
  //
  // useEffect(() => {
  //   if (isShowTips) {
  //     setTip1(true)
  //   }
  // },[isShowTips]);
  const ptData = [
    { value: 160, date: '1 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '1 Apr' },
    { value: 180, date: '2 Apr 2022'  },
    { value: 190, date: '3 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '3 Apr' },
    { value: 280, date: '4 Apr 2022'  },
    { value: 440, date: '5 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '5 Apr' },
    { value: 545, date: '6 Apr 2022'  },
    { value: 460, date: '7 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '7 Apr' },
    { value: 500, date: '8 Apr 2022' },
    { value: 200, date: '9 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '9 Apr' },
    { value: 440, date: '10 Apr 2022'},
  ];

  const ptData2 = [
    { value: 110, date: '1 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '1 Apr' },
    { value: 380, date: '2 Apr 2022'  },
    { value: 490, date: '3 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '3 Apr' },
    { value: 280, date: '4 Apr 2022'  },
    { value: 440, date: '5 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '5 Apr' },
    { value: 545, date: '6 Apr 2022'  },
    { value: 160, date: '7 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '7 Apr' },
    { value: 200, date: '8 Apr 2022' },
    { value: 300, date: '9 Apr 2022' ,labelTextStyle: { color: 'gray', width: 60 }, label: '9 Apr' },
    { value: 140, date: '10 Apr 2022'},
  ];


  return (
    <View style={styles.containerStyle}>

      <ScrollView
        style={styles.containerWrapperStyle}
        showsVerticalScrollIndicator={false}
      >

            <View style={styles.rowSpaceBetween}>
              <View style={styles.rowCurrency}>
                <Text style={styles.title}>{`${itemData.fullName} (${itemData.shortName})`}</Text>
              </View>
              {itemData.icon}
            </View>

            <View style={styles.rowCurrency}>
              <Text style={styles.subTitle}>{`As of Dec 03, 2021 2:12PM`}</Text>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.exchangePrecentage}>{`1 BTC ≈ ₱ 2,444,810.00`}</Text>
              <Text style={itemData.fullName === 'USD Coin' ? styles.nagativeExchangeRate:styles.exchangeRate}>{`+6.33% from yesterday`}</Text>
            </View>
            <View style={styles.rowWrapper}>
               <TouchableOpacity onPress={()=>{setIsActive(0)}} style={isActive ===0 ?styles.chartActiveButton:styles.chartInaActiveButton}><Text style={styles.chartButtonText}>{`24H`}</Text></TouchableOpacity>
               <TouchableOpacity onPress={()=>{setIsActive(1)}} style={isActive ===1 ?styles.chartActiveButton:styles.chartInaActiveButton}><Text style={styles.chartButtonText}>{`1W`}</Text></TouchableOpacity>
               <TouchableOpacity onPress={()=>{setIsActive(2)}} style={isActive ===2 ?styles.chartActiveButton:styles.chartInaActiveButton}><Text style={styles.chartButtonText}>{`1M`}</Text></TouchableOpacity>
               <TouchableOpacity onPress={()=>{setIsActive(3)}} style={isActive ===3 ?styles.chartActiveButton:styles.chartInaActiveButton}><Text style={styles.chartButtonText}>{`3M`}</Text></TouchableOpacity>
               <TouchableOpacity onPress={()=>{setIsActive(4)}} style={isActive ===4 ?styles.chartActiveButton:styles.chartInaActiveButton}><Text style={styles.chartButtonText}>{`6M`}</Text></TouchableOpacity>
               <TouchableOpacity onPress={()=>{setIsActive(5)}} style={isActive ===5 ?styles.chartActiveButton:styles.chartInaActiveButton}><Text style={styles.chartButtonText}>{`1Y`}</Text></TouchableOpacity>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.exchangePrecentage}>{`₱ 2,444,792.00`}</Text>
              <Text style={styles.subTitle}>{`As of Dec 03, 2021 2:12PM`}</Text>
            </View>

            <>
              <LineChart
                areaChart
                data={itemData.fullName === 'USD Coin' ? ptData2:ptData}
                width={310}
                hideDataPoints
                spacing={50}
                color={itemData.fullName === 'USD Coin' ? "#D32F2F" :"#2E7D32"}
                thickness={2}
                startFillColor={itemData.fullName === 'USD Coin' ? "rgba(211, 47, 47,0.01)" : "rgba(140,183,142,0.3)"}
                endFillColor={itemData.fullName === 'USD Coin' ? "rgba(211, 47, 47,0.01)" : "rgba(140,183,142,0.01)"}
                startOpacity={0.9}
                endOpacity={0.1}
                initialSpacing={0}
                noOfSections={5}
                maxValue={600}
                yAxisColor="lightgray"
                yAxisThickness={1}
                rulesType="solid"
                // verticalLinesSpacing={100}
                // noOfVerticalLines={}
                // rotateLabel
                // xAxisColor="#0BA5A4"
                // rulesColor="gray"
                yAxisTextStyle={{ color: 'gray' }}
                yAxisSide="right"
                // hideOrigin={true}
                hideYAxisText={true}
                showVerticalLines
                xAxisColor="lightgray"
                pointerConfig={{
                  pointerStripHeight: 160,
                  // pointerStripColor: 'lightgray',
                  pointerStripWidth: 2,
                  pointerColor: 'white',
                  radius: 6,
                  pointerLabelWidth: 100,
                  pointerLabelHeight: 90,
                  activatePointersOnLongPress: true,
                  autoAdjustPointerLabelPosition: false,
                  pointerLabelComponent: (items) => {
                    return (
                      <View
                        style={{
                          height: 90,
                          width: 100,
                          justifyContent: 'center',
                          marginTop: -30,
                          marginLeft: -40,
                        }}
                      >
                        <Text
                          style={{ color: 'white', fontSize: 14, marginBottom: 6, textAlign: 'center' }}
                        >
                          {items[0].date}
                        </Text>
                        <View
                          style={{
                            paddingHorizontal: 14,
                            paddingVertical: 6,
                            borderRadius: 16,
                            backgroundColor: 'white',
                          }}
                        >
                          <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                            {'$' + items[0].value + '.0'}
                          </Text>
                        </View>
                      </View>
                    );
                  },
                }}
              />
            </>

            <View style={styles.rowCurrency}>
              <Text style={styles.title2}>{`My Assets`}</Text>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.message}>{`1 BTC ≈ ₱ 2,444,810.00`}</Text>
              <Text style={styles.message}>{`+6.33% from yesterday`}</Text>
            </View>
            <View style={styles.rowCurrency}>
              <Text style={styles.title2}>{`About Bitcoin`}</Text>
            </View>
            <View style={styles.headerWrapper}>
              <Text style={styles.message2}>Bitcoin is one of the most popular
                cryptocurrencies in the market. First introduced in 2009 by
                Satoshi Nakamoto, Bitcoin has held the crypto market’s number
                one spot according to market capitalization. Bitcoin paved the
                way for many existing altcoins in the market and marked a
                pivotal moment for digital payment solutions.</Text>
            </View>
      </ScrollView>
      <View style={styles.footerContainerStyle}>
        <View style={styles.footerButtonWrapper}>
          <Button
            onPress={()=>{onClick({type:'Buy',item:itemData})}}
            // label={
            //   i18n?.t("customer_invoke_component.lbl_continue") ??
            //   "Continue"
            // }
            label={ "Buy"}
          />
        </View>
        <View style={styles.footerButtonWrapper}>
          <Button
            onPress={()=>{onClick({type:'Sell',item:itemData})}}
            label={ "Sell"}
          />
          </View>
        </View>
    </View>
  );
};

export default CryptoTradeComponent;
