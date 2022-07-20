import { CryptoReceiveSummaryComponentProps } from './types';
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import useMergeStyles from './styles';
import {  Button } from 'react-native-theme-component';


const CryptoReceiveSummaryComponent = ({ props, style }: CryptoReceiveSummaryComponentProps) => {
    const { onSelectCrypto } = props || {};
    const styles = useMergeStyles(style);
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>{'Receive BTC'}</Text>
          <View style={styles.pageSubTitleView}>
            <Text style={styles.pageSubTitle}>Scan the QR code or share the address to receive the Bitcoin (BTC).</Text>
          </View>
          <View style={styles.content}>
            
          </View>
        </ScrollView>
        <View style={styles.actionWrapper}>
          <Button label='Share' onPress={onSelectCrypto} />
        </View>
      </SafeAreaView>
    );
  };

export default CryptoReceiveSummaryComponent;
