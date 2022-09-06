import { OnboardingItem } from '../../types';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type OnboardingComponentProps = {
  Root?: {
    style?: OnboardingComponentStyles;
    props?: {
      onFinished?: () => void;
      data?: OnboardingItem[];
      lastSlideBtnConfirmTitle?: string;
      secondaryBtnActionVisible?: boolean;
      secondaryBtnActionTitle?: string;
      onPressSecondaryBtnAction?: () => void;
    };
  };
};

export type OnboardingComponentStyles = {
  container?: StyleProp<ViewStyle>;
  sliderWrapper?: StyleProp<ViewStyle>;
  imageWrapper?: StyleProp<ViewStyle>;
  image?: StyleProp<ImageStyle>;
  title?: StyleProp<TextStyle>;
  subTitle?: StyleProp<TextStyle>;
  description?: StyleProp<TextStyle>;
  secondaryTitle?: StyleProp<TextStyle>;
  secondaryBtn?: StyleProp<ViewStyle>;
};
