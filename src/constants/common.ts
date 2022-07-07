import { ContactInfoItem } from '../../src/components/help-center-component/types';
import {
  ContactMailIcon,
  ContactClockIcon,
  ContactMapIcon,
  ContactGlobeIcon,
} from '../../src/assets/images';

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
