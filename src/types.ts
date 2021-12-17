import { BankImagesMap, Wallet, EmptyWalletThemeProps } from '@banking-component/core';
import { ReactNode } from 'react';
import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { AlertModalStyles } from 'react-native-theme-component/src/alert';

export type WalletComponentRefs = {
  showActionsSheet: (wallet: Wallet) => void;
  unlinkWallet: (wallet: Wallet) => void;
  setAsPrimary: (wallet: Wallet) => void;
  showRecommandBanner: (wallet: Wallet) => void;
  hideActionSheet: () => void;
};

export type WalletComponentProps = {
  Root: {
    style?: WalletComponentStyle;
    props: {
      formatCurrency: (amount: number, code: string) => string;
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
      totalBalanceLabel?: string;
      onViewCashFlow?: () => void;
      viewCashflowLabel?: string;
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
      primaryLabel?: string;
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
      setPrimaryLabel?: string;
      unlinkLabel?: string;
      viewTransactionLabel?: string;
      shareLabel?: string;
      cancelLabel?: string;
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
      buttonLabel?: string;
    };
    components?: {
      addIcon?: ReactNode;
    };
  };
  ConfirmUnlinkModal?: {
    props?: {
      disable?: boolean;
      title?: string;
      message?: string;
      cancelButtonLabel?: string;
      confirmButonLabel?: string;
      isShowClose?: boolean;
      isFullWidth?: boolean;
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
      title?: string;
      message?: string;
      cancelButtonLabel?: string;
      confirmButonLabel?: string;
      isShowClose?: boolean;
      isFullWidth?: boolean;
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
      title?: string;
      message?: string;
      setPrimaryLabel?: string;
      confirmButonLabel?: string;
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

export type WalletComponentStyle = {
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


