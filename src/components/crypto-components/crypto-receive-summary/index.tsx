import { CryptoReceiveSummaryComponentProps } from './types';
import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useContext,
  useEffect } from 'react';
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

import LoadingSpinner from '../../loading-spinner';
import { WalletService } from '../../../services/wallet-service';
import { WalletContext } from '../../../context/wallet-context';

import {
  UnionDigitalBankIcon,
  InfoIcon
} from '../../../assets/images';

export type CryptoReceiveSummaryRef = {
  onSaveToGallery: () => void;
};
const walletService = WalletService.instance();

const CryptoReceiveSummaryComponent = forwardRef(
  ({ props, style }: CryptoReceiveSummaryComponentProps, ref) => {
    const { onBackToDashboard,onGoToHelpCenter,defaultData,isWithError } = props || {};
    const refViewShot = useRef<ViewShot>(null);
    const styles = useMergeStyles(style);
    const [isLoadingValidation, setIsLoadingValidation] =
    useState<boolean>(false);
    const [cryptoInResponse, setCryptoInResponse] =useState<any>();
    const [isFailed, setIsFailed] = useState<boolean>(false);

    const { cryptoWallet } = useContext(WalletContext);

    const hasAndroidPermission = async () => {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

      const hasPermission = await PermissionsAndroid.check(permission);
      if (hasPermission) {
        return true;
      }

      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    };

    useEffect(() => {
        handleOnTransferCrypto();
    }, []);

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

    const handleOnTransferCrypto = async () => {
      setIsLoadingValidation(true);
      setIsFailed(false);
      if ( cryptoWallet) {
        try {

          const result =  await walletService.cryptoInValidation(
            defaultData.code,
            cryptoWallet?.bankAccount.accountNumber
          )

          if (result.Data) {
            setCryptoInResponse(result.Data)
          }else{
            isWithError();
            setIsFailed(true)
          }
        } catch (error) {
          isWithError();
          setIsFailed(true)
        }

      }

      setIsLoadingValidation(false);
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

    if(isLoadingValidation) {
      return (
        <View style={styles.containerCenter}>
          <View style={styles.loadingContent}>
            <Text style={styles.title}>Hang on for a moment</Text>
            <View style={styles.subTitleWrapper}>
              <Text style={styles.subTitle}>
                We’re setting up your card.
              </Text>
            </View>
            <View style={styles.circleProgressWrapper}>
              <LoadingSpinner />
            </View>
          </View>
        </View>
      );
    }

    if (isFailed) {
      return (
        <View style={styles.containerFailed}>
          <View style={styles.errorContentWrapper}>
            <View style={styles.columnBetween}>
              <View>
                <View style={styles.errorTitleWrapper}>
                  <View style={styles.iconErrorWrapper}>
                    <InfoIcon width={80} height={80} color={'#E06D6D'} />
                  </View>
                  <Text style={styles.statusLabel}>Transfer Unsuccessful</Text>
                  <View style={styles.errorMessageWrapper}>
                    <Text style={styles.errorMessageLabel}>
                      We’ve encountered a problem with your transaction. Your
                      crypto has been returned to your crypto pitaka. Please try
                      again later.
                    </Text>
                  </View>
                </View>
                <View style={styles.rowErrorBetween}>
                  <Text style={[styles.infoTitle, styles.errorInfoTitleColor]}>
                    Reference No.
                  </Text>
                  {/*<Text style={[styles.infoSubTitle, styles.errorInfoTitleColor]}>
                    {'refNumber'}
                  </Text>*/}
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
      );
    }

    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ViewShot ref={refViewShot} style={styles.container}>
            <Text style={styles.pageTitle}>{`Receive ${defaultData.code}`}</Text>
            <View style={styles.pageSubTitleView}>
              <Text style={styles.pageSubTitle}>{`Scan the QR code or share the address to receive the ${defaultData.code}.
              `}</Text>
            </View>
            <View style={styles.content}>
              {cryptoInResponse && <View style={styles.rowCenter}>
                <QRCode value={cryptoInResponse.Initiation.CreditorAccount.SecondaryIdentification} size={170} />
              </View>}
              <View style={styles.infoView}>
                <RowInfo
                  props={{
                    title: 'Crypto Address',
                    value: cryptoInResponse?cryptoInResponse.Initiation.CreditorAccount.SecondaryIdentification:'...',
                    copyable: true,
                  }}
                />
                <RowInfo
                  props={{
                    title: 'Network',
                    value: defaultData.code,
                  }}
                />
              </View>
            </View>
            <View style={styles.noteView}>
              <Text style={styles.noteLabel}>{`NOTE: Please only send ${defaultData.code} and its network to this address. Sending any other coins may result to permanent loss.`}</Text>
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
