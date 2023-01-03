import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet, ThemeContext } from 'react-native-theme-component';
import { ArrowRightIcon } from '../../../../assets/arrow-right.icon';
import ImageIcon from '../../../../assets/image-icon';
import { BRoundedCloseIcon } from '../../../../assets/rounded-close.icon';
import { WalletContext } from '../../../../context/wallet-context';
import useMergeStyles, { SettingsSheetStyles } from './styles';

export interface ISettingsSheet {
    isVisible:boolean;
    style?:SettingsSheetStyles;
    onClose: () => void;
    onChangeCardPin: () => void;
}
export interface ISettingsItemStyle {
    item: {
        code?: string;
        name: string;
        type?: string;
        enabled:boolean;
        onPress?: () => void;
    }
    onChange: (e:boolean) => void;
}
const SettingsItemStyle = (props:ISettingsItemStyle) => {
    const {item, onChange} = props
    return (
        <TouchableOpacity disabled={!!item.code} onPress={item.onPress} style={innerStyles.itemContainer}>
            <View style={innerStyles.titleContainer}>
            <ImageIcon color={'#1b1b1b'} />
            <Text style={innerStyles.titleStyle}>{item.name}</Text>
            </View>
            {!!item.code ? <Switch onValueChange={onChange} value={item.enabled} thumbColor={'#FFF'} trackColor={{false: "#DDD", true: "#000"}}  /> : <ArrowRightIcon height={22} width={22} color={"#1b1b1b"} />}
        </TouchableOpacity>
    )
}

const SettingsBottomSheet = (props:ISettingsSheet) => {
    const {isVisible,style, onClose, onChangeCardPin} = props;
    const styles:SettingsSheetStyles = useMergeStyles(style);
    const {i18n} = useContext(ThemeContext) 
    const { transactionChannels, getTransactionChannels } = useContext(WalletContext) 
    const [settingsData, setSettingsData] = useState<any[]>([])
    useEffect(() => getTransactionChannels(), [])
    useEffect(() => {
        setSettingsData([...transactionChannels, {name: "Change card PIN", onPress: onChangeCardPin}])
    }, [transactionChannels])
    
  return (
    <BottomSheet
    style={{
        containerStyle: styles.containerStyle
    }}
        isVisible={isVisible}>
        <TouchableOpacity style={styles.crossContainer} onPress={onClose}>
        <BRoundedCloseIcon height={32} width={32} />
      </TouchableOpacity>
      <Text style={styles.titleStyle}>{i18n?.t("card_settings.title")}</Text>
      <FlatList
        data={settingsData}
        style={styles.listContainerStyle}
        renderItem={({item, index}) => (
           <SettingsItemStyle onChange={e => {
            const arr = [...settingsData];
            arr[index].enabled = e;
            setSettingsData(arr)
           }} item={item} /> 
        )}
        ItemSeparatorComponent={() => (
            <View style={{width:'100%', borderWidth:0.7, borderColor:'#DDDDDD'}} />
        )}
        bounces={false}
      />
            </BottomSheet>
  )
}

export default SettingsBottomSheet

const innerStyles = StyleSheet.create({
    itemContainer: {
        flexDirection:"row",
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:16,
    },
    titleContainer: {
        flexDirection:'row',
        alignItems:'center'
    },
    titleStyle: {
        marginLeft: 12,
        fontSize:16,
        color: "#1b1b1b",
        fontWeight:'500'
    }
})