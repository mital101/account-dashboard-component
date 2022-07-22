import { CryptoTransactionDetailsComponentProps } from './types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import useMergeStyles from './styles';
import RowInfo from '../../row-info';
import { UnionDigitalBankIcon } from '../../../assets/images';
import { Button } from 'react-native-theme-component';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';

export type CryptoTransactionDetailsRef = {
  onSave: () => void;
};

const CryptoTransactionDetailsComponent = forwardRef(
  ({ props, style }: CryptoTransactionDetailsComponentProps, ref) => {
    const { id } = props || {};
    const styles = useMergeStyles(style);
    const refViewShot = useRef<ViewShot>(null);

    const hasAndroidPermission = async () => {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    };

    const savePictureToGallery = async (url: string) => {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }

      CameraRoll.save(url, { type: 'photo' }).then(() => {
        Alert.alert('Alert', 'Image have been saved to the gallery', [
          { text: 'OK' },
        ]);
      });
    };

    useImperativeHandle(
      ref,
      (): CryptoTransactionDetailsRef => ({
        onSave: async () => {
          if (refViewShot?.current?.capture) {
            const uri = await refViewShot.current.capture();
            savePictureToGallery(`${uri}`);
          }
        },
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

    return (
      <View style={styles.containerWrapper}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewShot ref={refViewShot} style={styles.container}>
            <Text style={styles.pageTitle}>{'Transaction Details'}</Text>
            <View style={styles.content}>
              <RowInfo
                props={{
                  title: 'Type of Transaction',
                  value: 'Transfer-out (BTC)',
                }}
              />
              <RowInfo props={{ title: 'Amount', value: '0.00038167 BTC' }} />
              <RowInfo props={{ title: 'Network', value: 'Bitcoin' }} />
              <RowInfo
                props={{
                  title: 'Transaction Status',
                  value: 'Pending',
                  copyable: true,
                }}
              />
              <RowInfo
                props={{
                  title: 'Send Crypto From',
                  value: 'My Crypto Pitaka\nBen Santos',
                }}
              />
              <RowInfo
                props={{ title: 'Send Crypto To', value: 'Transfer-out (BTC)' }}
              />
              <RowInfo
                props={{
                  title: 'Transaction Hash',
                  value: '15Jk6oy1yg5mvSFrKgEjgJ3ms7NkY28c9S',
                  copyable: true,
                }}
              />
              <RowInfo
                props={{
                  title: 'Network Fee',
                  value: 'a41f3d39e86331b610048046204d7d557453a809',
                  copyable: true,
                }}
              />
            </View>
            <View>
              <View style={styles.rowBetween}>
                <Text style={styles.infoTitle}>Transaction Date / Time</Text>
                <Text style={styles.infoSubTitle}>Nov 2, 2021 / 07:10 AM</Text>
              </View>
              <View style={styles.rowBetween}>
                <Text style={styles.infoTitle}>Reference No.</Text>
                <Text style={styles.infoSubTitle}>ABCDE12345676789</Text>
              </View>
            </View>
            <View style={styles.logoContainer}>
              <UnionDigitalBankIcon height={40} width={150} />
            </View>
            <View style={styles.marginVertical} />
          </ViewShot>
        </ScrollView>
        <View style={styles.shareContainer}>
          <Button label="Share" onPress={onShare} />
        </View>
      </View>
    );
  }
);

export default CryptoTransactionDetailsComponent;
