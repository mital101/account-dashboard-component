import AsyncStorage from '@react-native-async-storage/async-storage';
const IS_VIRTUAL_CARD_ACTIVE = 'adb_card.isVirtualCardActive';

class WalletComponentStore {
  storeCustomerCardStatus = (isActive: 'true' | 'false') =>
    AsyncStorage.setItem(IS_VIRTUAL_CARD_ACTIVE, isActive);

  getCustomerCardStatus = () => AsyncStorage.getItem(IS_VIRTUAL_CARD_ACTIVE);

  clearStore = async () => {
    await AsyncStorage.removeItem(IS_VIRTUAL_CARD_ACTIVE);
  };
}

const instance = new WalletComponentStore();
export default instance;
