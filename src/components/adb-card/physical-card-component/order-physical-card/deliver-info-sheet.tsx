import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { BottomSheet } from 'react-native-theme-component';
import { BRoundedCloseIcon } from '../../../../assets/rounded-close.icon';

export interface DeliverInfoSheetProps {
    isVisible: boolean;
    onClose: () => void;
}

const DeliverInfoSheet:React.FC<DeliverInfoSheetProps> = (props) => {
    const {isVisible, onClose} = props;
  return (
    <BottomSheet style={{containerStyle: {padding: 24, height:Dimensions.get('screen').height * 50 / 100}}} isVisible={isVisible}>
        <TouchableOpacity style={styles.crossContainer} onPress={onClose}>
            <BRoundedCloseIcon height={32} width={32}/>
        </TouchableOpacity>
        <Text style={styles.title}>Changing your mailing address</Text>
        <Text style={styles.desc}>If you wish to change your mailing address, please change it via the Customer Settings page.
</Text>
    </BottomSheet>
  )
}

export default DeliverInfoSheet

const styles = StyleSheet.create({
    crossContainer: {
        height: 32,
        width: 32,
        backgroundColor: '#dddddd',
        alignSelf: 'flex-end',
        borderRadius: 100,
        marginBottom:24,
    },
    title: {
        fontWeight:'600',
        fontSize: 24,
        width:'90%'
    },
    desc: {
        fontSize:14,
        lineHeight: 20,
        width:'90%',
        marginTop: 8,
    }
})