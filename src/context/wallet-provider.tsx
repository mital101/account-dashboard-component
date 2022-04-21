import React, { ReactNode } from 'react';
import { useWalletContextValue, WalletContext } from './wallet-context';

export type WalletProviderProps = {
  children: ReactNode;
};

export const WalletProvider = (props: WalletProviderProps) => {
  const { children } = props;
  const walletContextData = useWalletContextValue();

  return <WalletContext.Provider value={walletContextData}>{children}</WalletContext.Provider>;
};
