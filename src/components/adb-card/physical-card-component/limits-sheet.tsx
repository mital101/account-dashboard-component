import React, { useMemo } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet } from 'react-native-theme-component';
import { ArrowRightIcon } from '../../..//assets/arrow-right.icon';
import ImageIcon from '../../../assets/image-icon';
import { BRoundedCloseIcon } from '../../../assets/rounded-close.icon';

export interface LimitBottomSheetProps {
    onOnlineLimitPress: () => void;
    onCardLimitPress: () => void;
    isVisible: boolean;
  onClose: () => void;
}

const LimitBottomSheet: React.FC<LimitBottomSheetProps> = (props) => {
    const {onOnlineLimitPress, onCardLimitPress, isVisible, onClose} = props;
    const limitsData = useMemo(() => [
        {
            id: 'ld-1',
            title: 'Online limit',
            onPress: onOnlineLimitPress
        },
        {
            id: 'ld-2',
            title: 'Card limit',
            onPress: onCardLimitPress
        },
    ], [onCardLimitPress,onOnlineLimitPress ])
  return (
    <BottomSheet
    style={{
        containerStyle: {
          padding: 24,
          height: (Dimensions.get("screen").height * 50) / 100,
        },
      }}
        isVisible={isVisible}
    >
        <TouchableOpacity style={styles.crossContainer} onPress={onClose}>
        <BRoundedCloseIcon height={32} width={32} />
      </TouchableOpacity>
        <Text style={styles.title}>Limits</Text>

        <FlatList
            data={limitsData}
            style={{marginTop: 32}}
            renderItem={({item, index}) => (
                <TouchableOpacity onPress={item.onPress} style={[styles.itemContainer, {borderTopWidth: index === 0 ? 1 : 0}]}>
                    <View style={{flexDirection:"row", alignItems:'center'}}>
                        <ImageIcon color={'#1b1b1b'}/>
                        <Text style={styles.itemText}>{item.title}</Text>
                    </View>
                        <ArrowRightIcon height={13} width={13} color="#1b1b1b"/>
                </TouchableOpacity>
            )}
        />
    </BottomSheet>
  )
}

export default LimitBottomSheet
const styles = StyleSheet.create({
    crossContainer: {
      height: 32,
      width: 32,
      backgroundColor: "#dddddd",
      alignSelf: "flex-end",
      borderRadius: 100,
      marginBottom: 24,
    },
    title: {
      fontWeight: "600",
      fontSize: 24,
      width: "90%",
      color: "#1b1b1b",
    },
    itemContainer: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomWidth: 1, borderColor: "#dddddd",
        paddingVertical:16,
    },
    itemText: {
        fontSize: 16,
        fontWeight:'500',
        marginLeft: 18,
    }
  });