import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type OnboardingComponentProps = {
  Root?: {
    style?: OnboardingComponentStyles;
    data?: OnboardingItem[];
    props?: {
      onFinished?: () => void;
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
};

export type OnboardingItem = {
  title: string;
  image?: ImageSourcePropType;
  imageUrl?: string;
  subtitle?: string;
  description?: string;
};
