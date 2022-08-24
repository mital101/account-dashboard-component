import { ContactInfoItem } from '../components/help-center-component/types';
import {
  ContactMailIcon,
  ContactClockIcon,
  ContactMapIcon,
  ContactGlobeIcon,
} from '../../src/assets/images';
import {
  TransactionStatus,
  TransactionTypes,
} from '../components/crypto-components/crypto-transactions-histoy-component/types';
import { FilterExchangeRateOption } from '../components/crypto-components/crypto-trade-item-component';
import moment from 'moment';

export const contactInfos: ContactInfoItem[] = [
  {
    title: 'Email',
    subTitle: 'help@uniondigitalbank.io',
    icon: ContactMailIcon,
    showCopyToClipboardOption: true,
  },
  {
    title: 'Operating Hours',
    subTitle: 'Monday - Friday, 12:00 am - 6:00 pm',
    icon: ContactClockIcon,
  },
  {
    title: 'Correspondence Address',
    subTitle:
      '41st F, UnionBank Plaza, Meralco avenue cor. Onyx and Sapphire Sts., Ortigas Center, Pasig City',
    icon: ContactMapIcon,
  },
  {
    title: 'BSP Consumer Empowerment Group',
    subTitle: 'consumeraffairs@bsp.gov.ph',
    icon: ContactGlobeIcon,
    showCopyToClipboardOption: true,
  },
];

export const typeOfTransaction: TransactionTypes[] = [
  { id: '1', title: 'Transfer-out (PHP) ', code: 'MoneyOut' },
  // { id: '2', title: 'Transfer-out (Crypto)  ', code: 'MoneyOut' },
  { id: '3', title: 'Transfer-in (PHP) ', code: 'MoneyIn' },
  // { id: '4', title: 'Transfer-in (Crypto) ', code: 'MoneyIn' },
  // { id: '5', title: 'Buy ', code: 'Buy' },
  // { id: '6', title: 'Sell ', code: 'Sell' },
];

export const statusOfTransaction: TransactionStatus[] = [
  { id: '1', title: 'All', code: '' },
  { id: '2', title: 'Complete', code: 'SUCCESS' },
  { id: '3', title: 'Failed', code: 'FAILED' },
  { id: '4', title: 'Pending', code: 'PROCESSING' },
];

export const maxLengthExchangeRateHistory = 500;

export const filterExchangeRateOptions: FilterExchangeRateOption[] = [
  {
    id: '1',
    label: '24H',
    date: moment().subtract(1, 'd').format('YYYY-MM-DDTHH:mm:ss'),
    unit: 'DAY',
    offset: 1
  },
  {
    id: '1',
    label: '1W',
    date: moment().subtract(1, 'w').format('YYYY-MM-DDTHH:mm:ss'),
    unit: 'DAY',
    offset: 7
  },
  {
    id: '1',
    label: '1M',
    date: moment().subtract(1, 'M').format('YYYY-MM-DDTHH:mm:ss'),
    unit: 'MONTH',
    offset: 1
  },
  {
    id: '1',
    label: '3M',
    date: moment().subtract(3, 'M').format('YYYY-MM-DDTHH:mm:ss'),
    unit: 'MONTH',
    offset: 3
  },
  {
    id: '1',
    label: '6M',
    date: moment().subtract(6, 'M').format('YYYY-MM-DDTHH:mm:ss'),
    unit: 'MONTH',
    offset: 6
  },
  {
    id: '1',
    label: '1Y',
    date: moment().subtract(1, 'y').format('YYYY-MM-DDTHH:mm:ss'),
    unit: 'YEAR',
    offset: 1
  },
];
