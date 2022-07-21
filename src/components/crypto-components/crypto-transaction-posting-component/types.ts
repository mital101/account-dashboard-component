  import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type CryptoTransactionPostingComponentProps = {
  style?: CryptoTransactionPostingComponentStyles;
  props?: { 
    onBackToDashboard?: () => void,
    onBackToTranferIn?: () => void,
    onGoToHelpCenter?: () => void
  };
};

export type CryptoTransactionPostingComponentStyles = {
  safeArea?: StyleProp<ViewStyle>;
  container?: StyleProp<ViewStyle>;
};
