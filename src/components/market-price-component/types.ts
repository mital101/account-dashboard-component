import { Currency } from '../../../src/model';
import {
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { SearchInputProps } from 'react-native-theme-component';

export type MarketPriceComponentProps = {
  Root?: {
    style?: MarketPriceComponentStyles;
    props?: {
      onSearchingCrypto?: () => void;
      searchInputProps?: SearchInputProps;
      onViewAllCrypto?: () => void;
      onSelectItemCurrency?: (currency: Currency) => void;
    };
  };
};

export type MarketPriceComponentStyles = {
  container?: StyleProp<ViewStyle>;
  contentWrapper?: StyleProp<ViewStyle>;
  image?: StyleProp<ImageStyle>;
  header?: StyleProp<ViewStyle>;
  title?: StyleProp<TextStyle>;
  viewAllLabel?: StyleProp<TextStyle>;
  viewAllSection?: StyleProp<ViewStyle>;
  viewAllBtn?: StyleProp<ViewStyle>;
};

export type MarketPriceItem = {
  title: string;
  image?: ImageSourcePropType;
  imageUrl?: string;
  subtitle?: string;
  description?: string;
};
