import { CryptoTransactionPostingComponentProps } from './types';
import React from 'react';
import {
  SafeAreaView,
  View,
  Text
} from 'react-native';
import useMergeStyles from './styles';
import { LoadingModal } from 'react-native-theme-component';

const CryptoTransactionPostingComponent = ({ props, style }: CryptoTransactionPostingComponentProps) => {
    const styles = useMergeStyles(style);
    const isLoading = true;

    if(isLoading) {
      return <View style={styles.container}>
        <Text>Hang on for a moment</Text>
        <Text>We’re currently setting up your transaction.</Text>
        <View>
        </View>
      </View>
    }

    return (
     <View>
        <Text>content</Text>
     </View>
    );
  };

export default CryptoTransactionPostingComponent;
