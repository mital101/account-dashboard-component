import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { colors, palette } from '../../assets';

export interface IAccountBalanceProps {
  balance: number;
}

const AccountBalanceCard: React.FC<IAccountBalanceProps> = (props: IAccountBalanceProps) => {
  const { balance = 0 } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.accountBalanceText}>Account Balance</Text>
      <Text style={styles.accountBalance}>RM {balance.toFixed(2)}</Text>
    </View>
  );
};

export default AccountBalanceCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dddddd',
    width: '100%',
    paddingVertical: 12,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },
  accountBalanceText: {
    // ...palette.highlight,
    fontSize:14,
  },
  accountBalance: {
    // ...palette.bigTitle,
    padding: 8,
    fontSize:32,
    fontWeight:'600'
  },
});
