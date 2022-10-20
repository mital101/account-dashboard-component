import { PhysicalCardTransactionStatusComponentProps } from './types';
import React, { Fragment, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import useMergeStyles from './styles';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { Button } from 'react-native-theme-component';
import { UnionDigitalBankIcon, InfoIcon } from '../../../assets/images';

export type PhysicalCardTransactionStatusRef = {
  onShare: () => void;
};

const PhysicalCardTransactionStatusComponent = forwardRef(
  ({ props, style }: PhysicalCardTransactionStatusComponentProps, ref) => {
    const styles = useMergeStyles(style);
    const {onBackToDashboard, onGoToHelpCenter, isSuccess} = props;
    const refViewShot = useRef<ViewShot>(null);

    useImperativeHandle(
      ref,
      (): PhysicalCardTransactionStatusRef => ({
        onShare
      })
    );

    const onShare = async () => {
      if (refViewShot?.current?.capture) {
        const url = await refViewShot.current.capture();
        RNFS.readFile(url, 'base64').then((base64Value) => {
          const options = {
            title: 'Title',
            subject: 'subject',
            url: `data:image/png;base64,${base64Value}`,
            message: 'message',
          };

          Share.open(options);
        });
      }
    };

    if(!isSuccess) {
      return (
        <View style={styles.containerFailed}>
        <View style={styles.errorContentWrapper}>
          <View style={styles.columnBetween}>
            <View>
              <View style={styles.errorTitleWrapper}>
                <View style={styles.iconErrorWrapper}>
                  <InfoIcon width={80} height={80} color={'#E06D6D'} />
                </View>
                <Text style={styles.statusLabel}>Request Unsuccessful</Text>
                <View style={styles.errorMessageWrapper}>
                  <Text style={styles.errorMessageLabel}>
                  Your money has been returned to your UD Bank Account. Please try again later. 
                  </Text>
                </View>
              </View>
              <View style={styles.rowErrorBetween}>
                <Text style={[styles.infoTitle, styles.errorInfoTitleColor]}>
                  Reference No.
                </Text>
                <Text style={[styles.infoSubTitle, styles.errorInfoTitleColor]}>
                  {'ABCDE12345676789'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Button
            label={'Back to Crypto Dashboard'}
            onPress={onBackToDashboard}
          />
          <Button
            label={'Have issues? Visit our Help Center!'}
            onPress={onGoToHelpCenter}
            bgColor={'transparent'}
            style={{
              primaryContainerStyle: styles.btnTransparent,
              primaryLabelStyle: styles.labelBtnTransaprent,
            }}
          />
        </View>
      </View>
      )
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
        <ViewShot ref={refViewShot} style={styles.containerViewShot}>
          <Text style={styles.titleSuccess}>Card delivery request successful!</Text>
          <Text style={styles.subTitle}>You have successfully requested for a physical card! Please expect it to be delivered within 3-5 business days.</Text>
          <View style={styles.cardContainer}>
            <Text style={styles.cardTitle}>Deliver to</Text>
            <Text style={styles.cardSubTitle}>Ben Santos 26 Payapa St. Bagong Diwa Sto. Cristobal Caloocan City, Metro Manila Philippines 1800</Text>
            <View style={styles.verticalSpacing}/>
            <Text style={styles.cardTitle}>Estimated delivery schedule</Text>
            <Text style={styles.cardSubTitle}>Receive by Dec 14 - 20, 2021</Text>
            <View style={styles.verticalSpacing}/>
            <Text style={styles.cardTitle}>Delivery amount - Metro Manila rate</Text>
            <Text style={styles.cardMoney}>₱ 200.00</Text>
          </View>
          <View style={styles.transactionInfo}>
            <View style={styles.rowBetween}>
              <Text>Transaction Date / Time</Text>
              <Text>Nov 2, 2021 / 07:10 AM</Text>
            </View>
            <View style={styles.smallVerticalSpacing}/>
            <View style={styles.rowBetween}>
              <Text>Reference No.</Text>
              <Text>ABCDE12345676789</Text>
            </View>
          </View>
          <View style={styles.logoSection}>
            <UnionDigitalBankIcon width={145} height={100} />
          </View>
        </ViewShot>
        </ScrollView>
        <Fragment>
          <Button label='Back to dashboard' onPress={onBackToDashboard}/>
        </Fragment>
      </View>
    );
  }
);

export default PhysicalCardTransactionStatusComponent;
