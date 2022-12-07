import React from 'react';
import { FlatList } from 'react-native';
import ListCardVariant from './list-card-component';

const data = [
  {
    id: '1',
    title: 'Cash Advance-i',
    subTitle: 'Get up to RM 1,000 anytime!',
  },
  {
    id: '2',
    title: 'Personal Financing',
    subTitle: 'Grown your cah. Easy approve.',
  },
  {
    id: '3',
    title: 'Personal Financing',
    subTitle: 'Grown your cah. Easy approve.',
  },
];

const WalletItemComponent = () => {
  return (
    <FlatList
      style={{ marginVertical: 20 }}
      data={data}
      renderItem={({ item }) => (
        <ListCardVariant key={item.id} title={item.title} subTitle={item.subTitle} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default WalletItemComponent;
