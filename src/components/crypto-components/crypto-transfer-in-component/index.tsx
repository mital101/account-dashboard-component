import { CryptoTransferInComponentProps } from './types';
import React from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CryptoItem } from './types';
import useMergeStyles from './styles';
import { RadioButtonItem, RadioButtonGroup, Button } from 'react-native-theme-component';

const randomCryptoImgUrl =
  'https://cdn.pixabay.com/photo/2017/03/12/02/57/bitcoin-2136339_960_720.png';

const cryptoDummyData: CryptoItem[] = [
    {
      id: '1',
      imageUrl: randomCryptoImgUrl,
      shortName:'BTC',
      currentValue:'0.00628167',
      fullName:'Bitcoin',
      rate:'≈ ₱ 9,591.54'
    },
    {
      id: '2',
      imageUrl: randomCryptoImgUrl,
      shortName:'ETH',
      currentValue:'0.014716',
      fullName:'Ethereum',
      rate:'≈ ₱ 1,515.16'
    },
    {
      id: '3',
      imageUrl: randomCryptoImgUrl,
      shortName:'USDC',
      currentValue:'9.73469',
      fullName:'USD Coin',
      rate:'≈ ₱ 510.00'
    },
    {
      id: '4',
      imageUrl: randomCryptoImgUrl,
      shortName:'SLP',
      currentValue:'1608.77699',
      fullName:'Smooth Love Potion',
      rate:'≈ ₱ 510.00'
    },
    {
      id: '5',
      imageUrl: randomCryptoImgUrl,
      shortName:'AXS',
      currentValue:'0.2198',
      fullName:'Axie Infinity',
      rate:'≈ ₱ 264.33'
    },
    {
      id: '6',
      imageUrl: randomCryptoImgUrl,
      shortName:'AXS',
      currentValue:'0.2198',
      fullName:'Axie Infinity',
      rate:'≈ ₱ 264.33'
    },
    {
      id: '7',
      imageUrl: randomCryptoImgUrl,
      shortName:'AXS',
      currentValue:'0.2198',
      fullName:'Axie Infinity',
      rate:'≈ ₱ 264.33'
    },
    {
      id: '8',
      imageUrl: randomCryptoImgUrl,
      shortName:'AXS',
      currentValue:'0.2198',
      fullName:'Axie Infinity',
      rate:'≈ ₱ 264.33'
    },
];

const CryptoTransferInComponent = ({ props, style }: CryptoTransferInComponentProps) => {
    const { onSelectCrypto } = props || {};
    const styles = useMergeStyles(style);
    const [index, setIndex] = React.useState<number>(0);
    const [selectedCrypto, setSelectedCrypto] = React.useState<string>();

    const renderTabbar = (title: string, indexTabbar: number) => (
      <TouchableOpacity
        style={[
          styles.headerView,
          indexTabbar === index && styles.headerSelectedBg,
        ]}
        onPress={() => setIndex(indexTabbar)}
      >
        <Text style={styles.headerTitle}>{title}</Text>
      </TouchableOpacity>
    );
  
    const renderPHPContent = () => {
        return (
          <View style={styles.rowItem}>
            <Text>renderPHPContent</Text>
          </View>
        );
    };

    const transferToRadioButtonItem = (data: CryptoItem[]): RadioButtonItem[] => {
      return data.map((item) => ({
          title: item.shortName,
          subTitle: item.fullName,
          imageUrl: item.imageUrl,
          rightTitle: item.currentValue,
          rightSubTitle: item.rate,
          value: item.id
      }))
    }
  
    const renderCryptoContent = () => <RadioButtonGroup 
          data={transferToRadioButtonItem(cryptoDummyData)} 
          onSelect={setSelectedCrypto} 
          selectedValue={selectedCrypto} 
        />

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>{'Transfer-in'}</Text>
          <View style={styles.tabbar}>
            <View style={styles.headerWrapper}>
              {renderTabbar('PHP', 0)}
              {renderTabbar('Crypto', 1)}
            </View>
            <View style={styles.content}>
              {index === 0 ? renderPHPContent() : renderCryptoContent()}
            </View>
          </View>
        </ScrollView>
        <View style={styles.actionWrapper}>
          <Button label='Select' onPress={onSelectCrypto} disabled={!selectedCrypto} disableColor={'#EAEAEB'} />
        </View>
      </SafeAreaView>
    );
  };

export default CryptoTransferInComponent;
