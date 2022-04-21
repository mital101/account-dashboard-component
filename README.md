# `@banking-component/wallet-component`

Manage wallets

## Table Of Content

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
  - [Init API Service](#init-api-service)
  - [Init Component Provider](#init-component-provider)
  - [Assets And Multiple Languages](#assets-and-multiple-languages)
- [API Reference](#api-reference)
  - [WalletService](#walletservice)
  - [WalletContext](#walletcontext)
  - [WalletComponent](#walletcomponent)

## Features

- Managa wallets linked to account
- Display total balance
- Change primary wallet
- Unlink a wallet

## Installation

Open a Terminal in your project's folder and run the command

```sh
yarn add https://github.com/101digital/wallet-component.git
```

- Installed [react-native-clipboard](https://github.com/react-native-clipboard/clipboard)
- Installed [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git)

## Quick Start

### Init API Service

- `WalletService` is initiated should be from `App.ts`

```javascript
import { WalletService } from '@banking-component/wallet-component';

WalletService.instance().initClients({
  walletClient: createAuthorizedApiClient(wallet), // Your Axios authorized client Wallet Url
});
```

### Init Component Provider

- Wrapped the app with `WalletProvider`

```javascript
import { WalletProvider } from '@banking-component/wallet-component';

const App = () => {
  return (
    <View>
      <WalletProvider>{/* YOUR APP COMPONENTS */}</WalletProvider>
    </View>
  );
};

export default App;
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props into each component

- In order to do multiple languages, you need to configurate `i18n` for [react-native-theme-component](https://github.com/101digital/react-native-theme-component.git). And then, you have to copy and paste all fields and values in [texts](wallet-component-data.json) into your app locale file. You can also change text value, but DON'T change the key.

## API Reference

### WalletService

Manage wallet services connect to BE. First of all, you need init `WalletService` soon, should be from `App.ts`

List of functions:

- `getWallets()`: Get all wallets linked to user's account
- `getWalletDetails(walletId: string)`: Get wallet details by `walletId`
- `linkBankAccount(bankId: string, accountId: string, consentId: string)`:Link an account into current wallets
- `unlinkBankWallet(walletId: string)`: Remove wallet by `walletId`
- `setDefaultWallet(walletId: string, isDefaultWallet: bool)`: Set a wallet with `walletId` is primary account or not. If `isDefaultWallet` is `true`, wallet will be set as primary. If `isDefaultWallet` is `false` wallet will set as normal account

### WalletContext

Manage state of wallets.
To access to data, error and function from these contexts, you can use `useContext` inside a React Component

```javascript
export interface WalletContextData {
  wallets: Wallet[]; // all wallets linked to user's profile
  isLoadingWallets: boolean; // fetching wallets status
  isLinkingWallet: boolean; // linking wallet status
  isUpdatingPrimary: boolean; // updating primary wallet status
  linkedWallet?: Wallet; // wallet that just linked successfully
  summary?: WalletSummary; // some wallets detail: total balance, total money in, total money out
  unlinkedWallet?: Wallet; // wallet that just unlinked successfully
  isUnlinking: boolean; // unlinking wallet status
  fetchWallets: () => void; // fetch wallets from API
  getGroupWallets: () => GroupedWallets | undefined; // wallets grouped by wallet type
  getDefaultWallet: () => Wallet | undefined; // get primary wallet or first wallet in the list
  getWalletDetail: (walletId?: string) => Wallet | undefined; //
  getAggregatedWallets: () => Wallet[]; // get aggregated wallets
  deleteWallet: (wallet: Wallet) => void; // remove wallet out of user's profile
  setPrimaryWallet: (walletId: string) => void; // set a wallet as a primary wallet
  linkWallet: (bankId: string, accountId: string, consentId: string) => void; // link new wallet
  clearLinkedWallet: () => void;
  clearWalletErrors: () => void;
  clearUnlinkedWallet: () => void;
  errorLoadWallet?: Error;
  errorUnlinkWallet?: Error;
  errorUpdatePrimary?: Error;
  errorLinkWallet?: Error;
}
```

### WalletComponent

- Props, styles and component can be found [here](./src/types.ts)

- Reference call: You can use `useRef` to call function inside `WalletComponent` (see Example for using `showRecommandBanner`)

```javascript
export type WalletComponentRefs = {
  showActionsSheet: (wallet: Wallet) => void, // show bottom action sheet
  unlinkWallet: (wallet: Wallet) => void, // show confirm unlink dialog
  setAsPrimary: (wallet: Wallet) => void, // show confirm set primary dialog
  showRecommandBanner: (wallet: Wallet) => void, // show banner at bottom of wallet
  hideActionSheet: () => void, // hide bottom action sheet
};
```

- Example

```javascript
import { currencyFormatter } from '@/helpers/currency-formatter';
import {
  WalletComponent,
  WalletContext,
  WalletComponentRefs,
} from '@banking-component/wallet-component';
import { AlertModal } from 'react-native-theme-component';
import { ProductContext, RecommandBannerComponent } from 'product-comparison-component';
import { AccountLinkingContext } from '@banking-component/account-linking';

const AccountsScreen = (props: AccountScreenProps) => {
  const { navigation } = props;
  const { wallets, errorUnlinkWallet, errorUpdatePrimary, clearWalletErrors, errorLinkWallet } =
    useContext(WalletContext);
  const { scrollHandler, headerTitleOpacity, navigationBarOpacity } = useCollapsibleHeaderHandler();
  const accountRef = useRef<WalletComponentRefs>();
  const { comparisons } = useContext(ProductContext);
  const { bankImages } = useContext(AccountLinkingContext);

  useEffect(() => {
    if (!isEmpty(comparisons)) {
      for (var c of comparisons) {
        const _wallet = wallets.find((w) => w.walletId === c.walletId);
        if (_wallet) {
          accountRef?.current?.showRecommandBanner(_wallet);
        }
      }
    }
  }, [comparisons.length]);

  const handleAddBankAccountPressed = () => {
    navigation.navigate(Route.SELECT_BANK);
  };

  return (
    <>
        <SafeAreaView style={styles.container}>
          <WalletComponent
            ref={accountRef}
            Root={{
              props: {
                formatCurrency: currencyFormatter,
                scrollHandler: scrollHandler,
                bankImages: bankImages,
              },
              components: {
                headerTitle: (
                  <Animated.View style={{ opacity: headerTitleOpacity }}>
                    <Text variant="h1" ml="m">
                      {i18n.t('account.lbl_my_account')}
                    </Text>
                  </Animated.View>
                ),
              },
            }}
            Balance={{
              style: {
                titleTextStyle: {
                  color: '#4DA0F5',
                },
                amountTextStyle: {
                  fontSize: 35,
                  lineHeight: 53,
                },
              },
            }}
            WalletItem={{
              props: {
                onItemPressed: (wallet) => {
                  accountRef?.current?.showActionsSheet(wallet);
                },
              },
              components: {
                recommandBanner: (wallet) => (
                  <RecommandBannerComponent
                    walletId={wallet.walletId}
                    formatCurrency={(amount) => currencyFormatter(amount, wallet.currencyCode)}
                    onTakeLook={() =>
                      navigation.navigate(Route.SWITCH_AND_SAVE, {
                        walletId: wallet.walletId,
                      })
                    }
                  />
                ),
              },
            }}
            LinkAccountButton={{
              props: {
                onLinkAccountPressed: handleAddBankAccountPressed,
              },
            }}
            EmptyWallet={{
              props: {
                onLinkAccountPressed: handleAddBankAccountPressed,
              },
            }}
            ActionSheet={{
              props: {
                onSetPrimaryPress: (wallet) => {
                  accountRef?.current?.setAsPrimary(wallet);
                },
                onUnlinkPress: (wallet) => {
                  accountRef?.current?.unlinkWallet(wallet);
                },
                onPressViewTransactions: (wallet) => {
                  navigation.navigate(Route.TRANSACTIONS_TAB, { wallet });
                },
              },
            }}
          />
        </SafeAreaView>
      <AlertModal
        isVisible={!isEmpty(errorUnlinkWallet?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={errorUnlinkWallet?.toString()}
      />
      <AlertModal
        isVisible={!isEmpty(errorUpdatePrimary?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={errorUpdatePrimary?.toString()}
      />

      <AlertModal
        isVisible={!isEmpty(errorLinkWallet?.toString())}
        title={i18n.t('common.lbl_oop')}
        leftIcon={<FailedSvg width={18} height={18} fill="red" />}
        onClose={clearWalletErrors}
        onConfirmed={clearWalletErrors}
        message={'Account linking was unsuccessful, please try again'}
      />
    </>
  );
};

export default AccountsScreen;

```
