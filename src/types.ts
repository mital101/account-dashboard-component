import { ReactNode } from 'react';
import { ImageSourcePropType, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AlertModalStyles } from 'react-native-theme-component/src/alert';
import { EmptyWalletThemeProps } from './components/no-wallet-component';
import { BankImagesMap, Transaction, TransactionSummary, Wallet } from './model';

export type WalletListComponentRefs = {
  showActionsSheet: (wallet: Wallet) => void;
  unlinkWallet: (wallet: Wallet) => void;
  setAsPrimary: (wallet: Wallet) => void;
  showRecommandBanner: (wallet: Wallet) => void;
  hideActionSheet: () => void;
};

export type TransferType = 'moneyin' | 'moneyout';

export type FilterTransaction = {
  types?: string[];
  status?: string;
  from?: string;
  to?: string;
}


export type WalletListComponentProps = {
  Root: {
    style?: WalletListComponentStyle;
    props?: {
      scrollHandler?: {
        onScroll: (...args: any[]) => void;
        scrollEventThrottle: number;
      };
      bankImages: BankImagesMap;
    };
    components?: {
      loadingIndicator?: ReactNode;
      headerTitle?: ReactNode;
    };
  };
  Balance?: {
    style?: BalanceStyle;
    props?: {
      onViewCashFlow?: () => void;
      cashflowIconColor?: string;
    };
    components?: {
      rightIcon?: ReactNode;
    };
  };
  WalletItem?: {
    style?: WalletItemStyle;
    props?: {
      onItemPressed?: (wallet: Wallet) => void;
      bannerStartOffset?: number;
      bannerEndOffset?: number;
    };
    components?: {
      tickIcon?: ReactNode;
      moreIcon?: ReactNode;
      recommandBanner?: (wallet: Wallet) => ReactNode;
      renderItem?: (index: number, item: Wallet) => React.ReactElement | null;
    };
  };
  Section?: {
    style?: AccountSectionStyle;
    components?: {
      renderSection: (title: string) => React.ReactElement | null;
    };
  };
  ActionSheet?: {
    style?: ActionSheetStyle;
    props?: {
      onSetPrimary?: (wallet: Wallet) => void;
      onUnlink?: (wallet: Wallet) => void;
      onViewTransactions?: (wallet: Wallet) => void;
      onShare?: (wallet: Wallet) => void;
    };
    components?: {
      setPrimaryIcon?: ReactNode;
      unlinkIcon?: ReactNode;
      viewTransactionIcon?: ReactNode;
      cancelIcon?: ReactNode;
      shareIcon?: ReactNode;
    };
  };
  LinkAccountButton?: {
    style?: LinkAccountStyle;
    props?: {
      onLinkAccountPressed?: () => void;
    };
    components?: {
      addIcon?: ReactNode;
    };
  };
  ConfirmUnlinkModal?: {
    props?: {
      disable?: boolean;
      isShowClose?: boolean;
      isFullWidth?: boolean;
      confirmButonLabel?: string;
    };
    components?: {
      leftIcon?: ReactNode;
      closeIcon?: ReactNode;
    };
    style?: AlertModalStyles;
  };
  ConfirmSetPrimaryModal?: {
    props?: {
      disable?: boolean;
      isShowClose?: boolean;
      isFullWidth?: boolean;
      confirmButonLabel?: string;
    };
    components?: {
      leftIcon?: ReactNode;
      closeIcon?: ReactNode;
    };
    style?: AlertModalStyles;
  };
  LinkAccountSuccessModal?: {
    style?: SetPrimaryComponentStyle;
    alertStyle?: AlertModalStyles;
    props?: {
      disable?: boolean;
      isShowClose?: boolean;
      isFullWidth?: boolean;
    };
    components?: {
      leftIcon?: ReactNode;
      tickIcon?: ReactNode;
      renderSetPrimary?: (
        isSelected: boolean,
        toggleSelect: () => void
      ) => React.ReactElement | null;
    };
  };
  EmptyWallet?: EmptyWalletThemeProps;
  ViewCashFlow?: {
    styles?: ViewCashflowComponentStyle;
    props?: {
      label?: string;
      message?: string;
      onViewCashFlow?: () => void;
    };
  };
};

export type WalletListComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  listDivider?: StyleProp<ViewStyle>;
};

export type BalanceStyle = {
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
  viewCashflowContainer?: StyleProp<ViewStyle>;
  viewCashflowTextStyle?: StyleProp<TextStyle>;
};

export type WalletItemStyle = {
  wrapperStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  imageContainerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  leftContainerStyle?: StyleProp<ViewStyle>;
  rightContainerStyle?: StyleProp<ViewStyle>;
  moreContainerStyle?: StyleProp<ViewStyle>;
  accountNameTextStyle?: StyleProp<TextStyle>;
  accountNumberTextStyle?: StyleProp<TextStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
  primaryContainerStyle?: StyleProp<ViewStyle>;
  primaryTextStyle?: StyleProp<TextStyle>;
};

export type AccountSectionStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
};

export type ActionSheetStyle = {
  modalStyle?: StyleProp<ViewStyle>;
  containerStyles?: StyleProp<ViewStyle>;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  cancelContainerStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  cancelTextStyle?: StyleProp<TextStyle>;
  leftIconContainer?: StyleProp<ViewStyle>;
};

export type LinkAccountStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
};

export type SetPrimaryComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  checkBoxStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
};

export type ViewCashflowComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  labelTextStyle?: StyleProp<TextStyle>;
  messageContainerStyle?: StyleProp<ViewStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  viewButtonContainerStyle?: StyleProp<ViewStyle>;
  viewTitleTextStyle?: StyleProp<TextStyle>;
};

export type TransactionListComponentProps = {
  Root?: {
    style?: TransactionListComponentStyle;
    props?: {
      initWallet?: Wallet;
    };
    components?: {
      loadingIndicator?: ReactNode;
    };
  };
  CarouselItem?: {
    style?: CarouselItemStyle;
    props?: {
      carouselWidth?: number;
      carouselItemWidth?: number;
    };
    components?: {
      renderSummary?: (summary?: TransactionSummary) => React.ReactElement | null;
      tickIcon?: ReactNode;
      moneyInIcon?: ReactNode;
      moneyOutIcon?: ReactNode;
    };
  };
  Pagination?: {
    style?: DotStyle;
    props?: {
      activeOpacity?: number;
      inactiveOpacity?: number;
    };
  };
  EmptyTransaction?: {
    style?: EmptyTransactionStyle;
    components?: {
      emptyIcon?: ReactNode;
    };
  };
  TransactionPage?: {
    style?: TransactionPageStyle;
    component?: {
      sectionHeader?: (date: string) => React.ReactElement | null;
      renderItem?: (index: number, item: Transaction) => React.ReactElement | null;
    };
    props?: {
      onItemPress?: (transaction: Transaction) => void;
    };
  };
  TransactionItem?: {
    style?: TransactionItemStyle;
  };
  EmptyWallet?: EmptyWalletThemeProps;
};

export type TransactionListComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  carouselWrap?: StyleProp<ViewStyle>;
  paginationWrap?: StyleProp<ViewStyle>;
};

export type EmptyTransactionStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  messageStyle?: StyleProp<TextStyle>;
  iconStyle?: StyleProp<ViewStyle>;
};

export type CarouselItemStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  imageWrapStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  walletWrapStyle?: StyleProp<ViewStyle>;
  walletNameTextStyle?: StyleProp<TextStyle>;
  walletNumberTextStyle?: StyleProp<TextStyle>;
  balanceTextStyle?: StyleProp<TextStyle>;
  primaryTextStyle?: StyleProp<TextStyle>;
  summaryTextStyle?: StyleProp<TextStyle>;
  moneyInWrapStyle?: StyleProp<ViewStyle>;
  moneyOutWrapStyle?: StyleProp<ViewStyle>;
  moneyLabelTextStyle?: StyleProp<TextStyle>;
  moneyValueTextStyle?: StyleProp<TextStyle>;
};

export type DotStyle = {
  dot?: StyleProp<ViewStyle>;
};

export type TransactionPageStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  transactionListStyle?: StyleProp<ViewStyle>;
  dividerStyle?: StyleProp<ViewStyle>;
};

export type TransactionItemStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  leftWrapStyle?: StyleProp<ViewStyle>;
  rightWrapStyle?: StyleProp<ViewStyle>;
  descriptionTextStyle?: StyleProp<TextStyle>;
  walletNameTextStyle?: StyleProp<TextStyle>;
  amountTextStyle?: StyleProp<TextStyle>;
};

export type OnboardingItem = {
  title: string;
  image?: ImageSourcePropType;
  imageUrl?: string;
  subtitle?: string;
  description?: string;
  imageComponent: ReactNode;
};
