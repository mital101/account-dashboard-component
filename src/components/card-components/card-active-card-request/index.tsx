import { ActiveCardRequestProps } from './types';
import React, { useEffect, useState } from 'react';
import {

  Text,
  View,
} from 'react-native';
import useMergeStyles from './styles';
import LoadingSpinner from '../../loading-spinner';
import { Button } from 'react-native-theme-component';
import { InfoIcon, OncompletedIcon } from '../../../assets/images';

const ActiveCardRequestComponent = ({
  style,
  onNavigateToMyCard,
  onBackToDashboard
}: ActiveCardRequestProps) => {
  const styles = useMergeStyles(style);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(false);
    }, 2000);
  }, []);

  const onRetry = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  }

  if(isLoading) {
    return (
      <View style={styles.containerCenter}>
        <View style={styles.content}>
          <Text style={styles.title}>Hang on for a moment</Text>
          <View style={styles.subTitleWrapper}>
            <Text style={styles.subTitle}>
              We’re setting up your card.
            </Text>
          </View>
          <View style={styles.circleProgressWrapper}>
            <LoadingSpinner props={{
              borderColor: '#FFFFFF'
            }} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.containerFailed}>
      <View style={styles.errorContentWrapper}>
        <View style={styles.columnBetween}>
          <View>
            <View style={styles.errorTitleWrapper}>
              <View style={styles.iconErrorWrapper}>
                {
                  isSuccess ? <OncompletedIcon width={94} height={94} /> :
                  <InfoIcon width={94} height={94} color={'#DA5552'} />
                }
              </View>
              <Text style={styles.statusLabel}>{isSuccess ? `#UDidit! You've activated your virtual card!` : 'Something went wrong'}</Text>
              <View style={styles.errorMessageWrapper}>
                <Text style={styles.errorMessageLabel}>
                {isSuccess ? 'Start using your virtual card right now!' : `We're having difficulty trying to connect to our server. Please try again.`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        {isSuccess ? <Button
          label={'Take me to my card'}
          onPress={onNavigateToMyCard}
        /> : <>
        <Button
          label={'Retry'}
          onPress={onRetry}
        />
        <Button
          label={'Back to Cards'}
          onPress={onBackToDashboard}
          bgColor={'transparent'}
          style={{
            primaryContainerStyle: styles.btnTransparent,
            primaryLabelStyle: styles.labelBtnTransaprent,
          }}
        />
        </>}
      </View>
    </View>
  );
};

export default ActiveCardRequestComponent;
