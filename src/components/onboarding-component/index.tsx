import React, { useContext, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import {
  ThemeContext,
  Carousel,
  Button,
  CarouselRef,
} from 'react-native-theme-component';
import { OnboardingComponentProps } from '../../components/onboarding-component/types';
import useMergeStyles from '../../components/onboarding-component/styles';
import { OnboardingItem } from '../../types';


const OnboardingComponent = ({Root}: OnboardingComponentProps) => {
  const {style, props} = Root || {};
  const { onFinished, data = [], lastSlideBtnConfirmTitle, onPressSecondaryBtnAction, secondaryBtnActionVisible, secondaryBtnActionTitle } = props || {};
  const styles = useMergeStyles(style);
  const { colors } = useContext(ThemeContext);
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const carouselRef = useRef<CarouselRef>();
  const isLastSlide = currentSlideIndex === data.length - 1;
  const renderOnboardingItem = (item: OnboardingItem) => {
    return (
      <View style={styles.sliderWrapper}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.imageWrapper}>{item.imageComponent}</View>
        <View>
        {item.subtitle && <Text style={styles.subTitle}>{item.subtitle}</Text>}
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
        </View>
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
      <View style={styles.container}>
        <View style={{flex: 1}}>
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
        </View>
        <View>
          <Button
            label={(isLastSlide && lastSlideBtnConfirmTitle) ? lastSlideBtnConfirmTitle : 'Next'}
            onPress={onNext}
            disabled={false}
            disableColor={colors.primaryButtonColor}
          />
          {(isLastSlide && secondaryBtnActionVisible) && <TouchableOpacity onPress={onPressSecondaryBtnAction} style={styles.secondaryBtn}>
            <Text style={styles.secondaryTitle}>{secondaryBtnActionTitle}</Text>
          </TouchableOpacity>
          // <Button
          //   label={secondaryBtnActionTitle || ''}
          //   onPress={onPressSecondaryBtnAction}
          //   disabled={false}
          //   disableColor={colors.primaryButtonColor}
          // />
          }
        </View>
      </View>
  );
};

export default React.memo(OnboardingComponent);
