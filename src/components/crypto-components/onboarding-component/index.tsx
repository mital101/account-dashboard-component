import React, { forwardRef, useContext, useRef, useState } from 'react';
import { Image, Text, View } from 'react-native';
import {
  ThemeContext,
  Carousel,
  Button,
  CarouselRef,
} from 'react-native-theme-component';
import { OnboardingComponentProps, OnboardingItem } from './types';
import useMergeStyles from './styles';
import {
  CryptoLinkIcon,
  CryptoLinkIcon2,
  CryptoLinkIcon3,
} from '../../../assets/images';

const defaultOnboardingData: OnboardingItem[] = [
  {
    title: 'Welcome to your UnionDigital Bank Crypto Account',
    subtitle: 'Trade directly with PHP!',
    description:
      'Experience a more seamless crypto trading process with the UnionDigital Bank app where you can directly transfer PHP from your Pitaka Account to your My Crypto Account.',
    imageComponent: <CryptoLinkIcon width={110} height={110} />,
  },
  {
    title: 'Welcome to your UnionDigital Bank Crypto Account',
    subtitle: 'Save money on fees!',
    description:
      'Crypto trading shouldn’t be expensive! Here in the UnionDigital Bank App, your cash-in and cash-out transactions are free.',
    imageComponent: <CryptoLinkIcon2 width={110} height={110} />,
  },
  {
    title: 'Welcome to your UnionDigital Bank Crypto Account',
    subtitle: 'Secured Transactions',
    description:
      'All transactions made in the UnionDigital Bank app are safe and secure. We are a digital bank regulated and licensed by the Bangko Sentral ng Pilipinas as well as our exchange partner, PDAX.',
    imageComponent: <CryptoLinkIcon3 width={110} height={110} />,
  },
];

const OnboardingComponent = (props: OnboardingComponentProps) => {
  // const OnboardingComponent = forwardRef(({ Root }: OnboardingComponentProps) => {
  // const { style, data = defaultOnboardingData, props } = Root || {};
  const { onFinished, style, data = defaultOnboardingData } = props;
  //
  const styles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  //
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const carouselRef = useRef<CarouselRef>();
  //
  const isLastSlide = currentSlideIndex === data.length - 1;
  //
  const renderOnboardingItem = (item: OnboardingItem, index: number) => {
    return (
      <View style={styles.sliderWrapper}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.imageWrapper}>{item.imageComponent}</View>
        {item.subtitle && <Text style={styles.subTitle}>{item.subtitle}</Text>}
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
      </View>
    );
  };
  //
  const onNext = () => {
    if (!isLastSlide) {
      carouselRef.current?.scrollToNextSlide();
    } else {
      onFinished && onFinished();
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Carousel
          ref={carouselRef}
          onChangeIndex={setCurrentSlideIndex}
          swipeAble={true}
          data={data.map((item) => renderOnboardingItem(item))}
          style={{
            container: { backgroundColor: colors.primaryColor },
            selectedCircle: { backgroundColor: colors.secondaryColor },
            circle: { backgroundColor: colors.mainBackgroundColor },
          }}
        />
        <View>
          <Button
            label={isLastSlide ? 'Proceed to activate crypto account' : 'Next'}
            onPress={onNext}
            disabled={false}
            disableColor={colors.primaryButtonColor}
          />
        </View>
      </View>
    </>
  );
};

// export default OnboardingComponent;
export default React.memo(OnboardingComponent);
