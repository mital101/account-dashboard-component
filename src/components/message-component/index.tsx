import { OncompletedIcon, InfoIcon } from "../../assets/images";
import React, { useContext } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { Button, ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type MessageComponentProps = {
  style?: MessageComponentStyles;
  onNext: () => void;
  nextTitle: string;
  title: string;
  subtitle: string;
  failed: boolean;
};

export type MessageComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

const MessageComponent = ({ style, onNext, title, subtitle, nextTitle, failed }: MessageComponentProps) => {
  const styles: MessageComponentStyles = useMergeStyles(style);
  const { i18n } = useContext(ThemeContext);

// Congratulations Ben, #UDidIt! You have successfully activated your Crypto account!
  return (
    <View style={styles.containerStyle}>
      <View style={styles.mainContainerStyle}>
        {failed ? <InfoIcon width={94} height={94} color={'#DA5552'} /> : <OncompletedIcon width={94} height={94} />}
        <Text style={styles.titleTextStyle}>
          {title}
        </Text>
        <Text style={styles.messageTextStyle}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.footerContainerStyle}>
        <Button label={nextTitle} onPress={onNext} />
      </View>
    </View>
  );
};

export default MessageComponent;
