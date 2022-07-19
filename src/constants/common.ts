import { ContactInfoItem } from '../components/help-center-component/types';
import {
  ContactMailIcon,
  ContactClockIcon,
  ContactMapIcon,
  ContactGlobeIcon,
} from '../../src/assets/images';
import { TransactionStatus, TransactionTypes } from '../components/crypto-components/crypto-transactions-histoy-component/types';

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
  {id: '1', title: 'Transfer-out (PHP) '},
  {id: '2', title: 'Transfer-out (Crypto)  '},
  {id: '3', title: 'Transfer-in (PHP) '},
  {id: '4', title: 'Transfer-in (Crypto) '},
  {id: '5', title: 'Buy '},
  {id: '6', title: 'Sell '}
]

export const statusOfTransaction: TransactionStatus[] = [
  {id: '1', title: 'All'},
  {id: '2', title: 'Complete'},
  {id: '3', title: 'Failed'},
]