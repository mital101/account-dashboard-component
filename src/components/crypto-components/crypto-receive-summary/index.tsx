import { CryptoReceiveSummaryComponentProps } from './types';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import useMergeStyles from './styles';
import { Button } from 'react-native-theme-component';
import QRCode from 'react-native-qrcode-svg';
import RowInfo from '../../row-info';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import CameraRoll from '@react-native-community/cameraroll';

export type CryptoReceiveSummaryRef = {
  onSaveToGallery: () => void;
};

const CryptoReceiveSummaryComponent = forwardRef(
  ({ props, style }: CryptoReceiveSummaryComponentProps, ref) => {
    const { onBackToDashboard } = props || {};
    const refViewShot = useRef<ViewShot>(null);
    const styles = useMergeStyles(style);

    const hasAndroidPermission = async () => {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    };

    useImperativeHandle(
      ref,
      (): CryptoReceiveSummaryRef => ({
        onSaveToGallery: async () => {
          if (refViewShot?.current?.capture) {
            const uri = await refViewShot.current.capture();
            savePictureToGallery(`${uri}`);
          }
        },
      })
    );

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

    const onShare = async () => {
      if (refViewShot?.current?.capture) {
        const url = await refViewShot.current.capture();
        RNFS.readFile(url, 'base64').then((base64Value: string) => {
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
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewShot ref={refViewShot} style={styles.container}>
            <Text style={styles.pageTitle}>{'Receive BTC'}</Text>
            <View style={styles.pageSubTitleView}>
              <Text style={styles.pageSubTitle}>
                Scan the QR code or share the address to receive the Bitcoin
                (BTC).
              </Text>
            </View>
            <View style={styles.content}>
              <View style={styles.rowCenter}>
                <QRCode value="http://awesome.link.qr" size={170} />
              </View>
              <View style={styles.infoView}>
                <RowInfo
                  props={{
                    title: 'Crypto Address',
                    value: '32ii4zr1P7TACFzZHY62y4Kz8zvGPEmrCl',
                    copyable: true,
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Network',
                    value: 'Bitcoin',
                  }}
                />
              </View>
            </View>
            <View style={styles.noteView}>
              <Text style={styles.noteLabel}>
                NOTE: Please only send Bitcoin (BTC) and its network to this
                address. Sending any other coins may result to permanent loss.
              </Text>
            </View>
          </ViewShot>
          <View style={styles.actionWrapper}>
            <Button label="Share" onPress={onShare} />
            <Button
              label="Back to Crypto Dashboard"
              onPress={onBackToDashboard}
              bgColor={'#FFFFFF'}
              style={{
                primaryContainerStyle: styles.btnBackToDashboard,
                primaryLabelStyle: styles.labelBackToDashboard,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
);

export default CryptoReceiveSummaryComponent;
