import { MyCardComponentProps } from './types';
import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Switch
} from 'react-native';
import useMergeStyles from './styles';
import { EyesIcon, images, InformationIcon, Page1, Page2, Page3, PointerIcon } from '../../../assets/images';
import { Carousel } from 'account-origination-component/src/components/carousel';
import RowSelection from '../../../components/row-selection';
import Tooltip, { TooltipChildrenContext } from 'react-native-walkthrough-tooltip';


const MyCardComponent = ({
  style,
  props
}: MyCardComponentProps) => {
  const { isShowWalkThrough = true } = props || {};
  const [isVisibleVCCard, setIsVisibleVCCard] = useState<boolean>(true);
  const [isEnabledVC, setIsEnabledVC] = useState(false);
  const [toolTipCardVisible, setToolTipCardVisible] = useState<boolean>(isShowWalkThrough);
  const [toolTipOptionsVisible, setToolTipOptionsVisible] = useState<boolean>(false);
  const [isSkiped, setIsSkiped] = useState<boolean>(false);
  const [ttOptionsYPosition, setTTOptionsYPosition] = useState<number>(0);
  const [ttPointerCardPosition, setTTCardPointerPosition] = useState<number>(0);
  const [ttPointerOptionsPosition, setTTPointerOptionsPosition] = useState<number>(0);

  const ttCardRef = useRef<View>(null);
  const refOptionsView = useRef<View>(null);
  const refScreen = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  
  const styles = useMergeStyles(style);
  
  const onToggleVisibleCard = () => {
    setIsVisibleVCCard(!isVisibleVCCard);
  }
  
  const carouselList = [
    { item: <Page1 width={170} height={254} /> },
    { item: <Page2 width={170} height={254} /> },
    { item: <Page3 width={170} height={254} /> },
  ];

  useEffect(() => {
    refScreen?.current?.measure( (_, __, ___, height) => {
      const screenHeight = height;
    refOptionsView?.current?.measure((_, __, ___, height, ____, pageY) => {
      if((height + pageY) < screenHeight) {
        setTTOptionsYPosition(0);
        setTTCardPointerPosition(screenHeight * 3 / 4);
        setTTPointerOptionsPosition(screenHeight / 4);
      } else {
        setTTOptionsYPosition(height + pageY - screenHeight + 20);
        setTTCardPointerPosition(screenHeight * 6 / 7);
        setTTPointerOptionsPosition(screenHeight / 9);
      }
    });
    });
  }, []);

  const onToggleLockOrUnlockCard = () => setIsEnabledVC(previousState => !previousState);
  
  const onSelectTransactionChannel = () => {
    console.log('onSelectTransactionChannel');
  }

  const onSelectTransactionLimits = () => {
    console.log('onSelectTransactionLimits');
  }

  const onSelectReportCard = () => {
    console.log('onSelectReportCard');
  }

  const onNextTTCard = () => {
    setToolTipCardVisible(false);
    scrollViewRef?.current?.scrollTo({y: ttOptionsYPosition });
    setTimeout(() => {
      setToolTipOptionsVisible(true);
    }, 500);
  }

  const onNextTTOptions = () => {
    setToolTipOptionsVisible(false);
    scrollViewRef?.current?.scrollTo(0);
  }

  return (
    <View style={styles.container} ref={refScreen} collapsable={false}>
      <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <Text style={styles.pageTitle}>{'My Card'}</Text>
          <Tooltip
            isVisible={toolTipCardVisible && !isSkiped}
            allowChildInteraction={false}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 10, right: 10 }}
            contentStyle={styles.ttCardContainer}
            content={<View ref={ttCardRef} collapsable={false}>
                <View style={styles.row}>
                  <InformationIcon size={15} />
                  <View style={styles.marginLeft}>
                    <Text>UnionDigital Bank Virtual Card</Text>
                  </View>
                </View>
                <View style={styles.ttContent}>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis.</Text>
                </View>
            </View>}
            placement="bottom"
            extraView={
              <>
                  <View style={[styles.pointerView, {top: ttPointerCardPosition}]} >
                    <TouchableOpacity
                      onPress={onNextTTCard}
                      style={styles.column}
                    >
                      <PointerIcon width={40} height={40} />
                      <Text style={styles.pointerText}>Tap to Continue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.skipView}>
                    <TouchableOpacity
                      onPress={() => setIsSkiped(true)}
                      style={styles.skipBtn}
                    >
                      <Text style={styles.skipText}>Skip Walkthrough</Text>
                    </TouchableOpacity>
                  </View>
                </>
            }
            onClose={onNextTTCard}
          >
          <View style={styles.vcCardContainer}>
            <View style={styles.rowSpaceBetween}>
              <Text style={[styles.cardText, styles.title]}>MARK ANTHONY DELA CRUZ</Text>
              <TouchableOpacity onPress={onToggleVisibleCard}>
              <EyesIcon width={18} height={18} />
              </TouchableOpacity>
            </View>
            <View style={styles.rowSubTitle}>
            <Text style={[styles.cardText, styles.subTitle]}>UnionDigital Bank Debit</Text>
            </View>
            <View style={styles.rowCardNumber}>
              <Text style={[styles.cardText, styles.title]}>****  7890</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.cardText}>VALID ****</Text>
              <View style={styles.cvvSection}>
                <Text style={styles.cardText}>CVV: ****</Text>
              </View>
            </View>
            <View style={styles.rowSpaceBetween}>
              <Image source={images.visa} />
              <Image source={images.udVCCard} />
            </View>
          </View>
        </Tooltip>
        <Tooltip
            isVisible={toolTipOptionsVisible && !isSkiped}
            allowChildInteraction={false}
            showChildInTooltip={true}
            useInteractionManager={true}
            displayInsets={{ top: 20, bottom: 20, left: 10, right: 10 }}
            contentStyle={styles.ttCardContainer}
            content={<View>
                <View style={styles.row}>
                  <InformationIcon size={15} />
                  <View style={styles.marginLeft}>
                    <Text>Manage cards</Text>
                  </View>
                </View>
                <View style={styles.ttContent}>
                  <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis tortor magna, non porta nibh cursus in. Mauris efficitur finibus odio et condimentum.</Text>
                </View>
            </View>}
            placement="top"
            extraView={
              <>
                  <View style={[styles.pointerView, {top: ttPointerOptionsPosition}]}>
                    <TouchableOpacity
                      onPress={onNextTTOptions}
                      style={styles.column}
                    >
                      <PointerIcon width={40} height={40} />
                      <Text style={styles.pointerText}>Tap to Continue</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.skipView}>
                    <TouchableOpacity
                      onPress={() => setIsSkiped(true)}
                      style={styles.skipBtn}
                    >
                      <Text style={styles.skipText}>Skip Walkthrough</Text>
                    </TouchableOpacity>
                  </View>
                </>
            }
            onClose={onNextTTOptions}
          >
            <TooltipChildrenContext.Consumer>
            {({ tooltipDuplicate }) => (
            <View style={styles.optionsSection} ref={refOptionsView} collapsable={false}>
            <RowSelection props={{
              title: 'Lock or Unlock card',
              subtitle: 'Your card is unlocked.',
              rightIcon: <Switch
                trackColor={{ false: "#767577", true: "#40916C" }}
                thumbColor={isEnabledVC ? "#FFFFFF" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onToggleLockOrUnlockCard}
                value={isEnabledVC}
              />
            }} />
            <RowSelection props={{
              title: 'Transaction channels',
              subtitle: 'Update card’s stransaction channels status',
              onPress: onSelectTransactionChannel
            }} />
            <RowSelection props={{
              title: 'Transaction limits',
              subtitle: 'Update card’s transaction limits',
              onPress: onSelectTransactionLimits
            }} />
            <RowSelection props={{
              title: 'Report Card',
              subtitle: 'Lost your card? Request for a new one',
              onPress: onSelectReportCard
            }} />
            </View>
            )}
            </TooltipChildrenContext.Consumer>
       
          </Tooltip>
        <View style={styles.learnSection}>
          <Text style={styles.titleSection}>{'Learn & Grow'}</Text>
          <View style={styles.sliderContainerStyle}>
            <Carousel
              showBullets={false}
              containerStyle={styles.dashboardCarousel}
              carouselList={carouselList}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyCardComponent;
