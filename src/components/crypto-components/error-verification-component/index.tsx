import { InfoIcon } from "../../../assets/images";
import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle,TouchableOpacity } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type ErrorVerificationComponentProps = {
  style?: ErrorVerificationComponentStyles;
  onHome: () => void;
  retry: () => void;
};

export type ErrorVerificationComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

const ErrorVerificationComponent = ({ style, onHome,retry }: ErrorVerificationComponentProps) => {
  const styles: ErrorVerificationComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

// Congratulations Ben, #UDidIt! You have successfully activated your Crypto account!
  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <InfoIcon width={110} height={110} color={"#E06D6D"} />
        <Text style={styles.titleTextStyle}>
          {`Crypto Account Activation Failed`}
        </Text>
        <Text style={styles.messageTextStyle}>
          {'Sorry, we are unable to activate your crypto account. Please try again.'}
        </Text>
      </View>
      <View style={styles.footerContainerStyle}>
        <Button label={'Try Again'} onPress={retry} />
        <TouchableOpacity onPress={onHome} >
          <Text style={styles.errorTextStyle}>
            {'Back to My Pitaka'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ErrorVerificationComponent;
