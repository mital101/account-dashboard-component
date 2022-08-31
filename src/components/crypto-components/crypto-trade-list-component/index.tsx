import React,{useState,useEffect,useContext} from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle,TouchableOpacity ,Image} from 'react-native';
import {
  EyesIcon,
  PytakaCurrencyIcon,
  TradeActiveIcon,
  TransferinActiveIcon,
  TransferoutActiveIcon,
  InfoIcon,
  PointerIcon,


} from '../../../assets/images';
import useMergeStyles from './styles';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';
import {
  WalletContext,
  WalletContextData,
} from '../../../context/wallet-context';
import RowCurrency from './row-currency';

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
  onClickItem?:(currency: any) => void;
  isList?:boolean;
};

const CryptoTradeListComponent = (props: CryptoTradeListComponentProps) => {
  const { style,isProtected,isEmpty,onClickItem,isList } = props;
  const styles = useMergeStyles(style);

  const { getListCurrency,listCurrency } = useContext<WalletContextData>(WalletContext);

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
            {listCurrency && listCurrency.map((obj,key)=>{
              return(<RowCurrency onSelect={onClickItem} currency={obj} />)
            })}
      </View>
    </View>
  );
};

export default CryptoTradeListComponent;
