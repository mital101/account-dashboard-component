import { OncompletedIcon } from "../../../assets/images";
import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type SuccessVerificationComponentProps = {
  style?: SuccessVerificationComponentStyles;
  onNext: () => void;
  name:string;
};

export type SuccessVerificationComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

const SuccessVerificationComponent = ({ style, onNext,name }: SuccessVerificationComponentProps) => {
  const styles: SuccessVerificationComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

// Congratulations Ben, #UDidIt! You have successfully activated your Crypto account!
  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        <OncompletedIcon width={94} height={94} />
        <Text style={styles.titleTextStyle}>
          {`Congratulations ${name}, #UDidIt! You have `}
        </Text>
        <Text style={styles.messageTextStyle}>
          {'successfully activated your Crypto account!'}
        </Text>
      </View>
      <View style={styles.footerContainerStyle}>
        <Button label={'Great! Let’s start the walkthrough.'} onPress={onNext} />
      </View>
    </View>
  );
};

export default SuccessVerificationComponent;
