import { BWarningIcon, ArrowDownIcon } from '../../assets/images';
import { Formik, FormikProps } from 'formik';
import moment from 'moment';
import React, { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { AlertModal, Button, InputField, showMessage } from 'react-native-theme-component';
import CheckBox, { CheckBoxStyle } from './component/check-box';
import ShareDatePicker, { ShareDatePickerStyle } from './component/share-date-picker';
import { ShareInformationData, ShareInformationSchema } from './data/share-information-data';
import useMergeStyle from './theme';
import { WalletContext } from '../../context/wallet-context';
import SelectAccountModal, { SelectAccountModalStyle } from './component/select-account-modal';
import { ThemeContext } from 'react-native-theme-component';
import { Wallet } from '../../model';

export type ShareInformationComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle: StyleProp<ViewStyle>;
  sectionTextStyle?: StyleProp<TextStyle>;
  applyContainerStyle?: StyleProp<ViewStyle>;
  accountNameContainerStyle?: StyleProp<ViewStyle>;
  accountNameTextStyle?: StyleProp<TextStyle>;
  accountWrapperStyle?: StyleProp<ViewStyle>;
  accountNumberTextStyle?: StyleProp<TextStyle>;
  accountContainerStyle?: StyleProp<ViewStyle>;
};

export type ShareInformationComponentProps = {
  userId: string;
  wallet: Wallet;
  checkBoxStyle?: CheckBoxStyle;
  datePickerStyle?: ShareDatePickerStyle;
  style?: ShareInformationComponentStyle;
  onCancel: () => void;
  onSuccess: () => void;
  SelectAccount?: {
    props?: {
      applyTitle?: string;
      activeColor?: string;
      inactiveColor?: string;
    };
    components?: {
      checkedIcon?: ReactNode;
    };
    styles?: SelectAccountModalStyle;
  };
};

const ShareInformationComponent = (props: ShareInformationComponentProps) => {
  const {
    userId,
    onCancel,
    onSuccess,
    checkBoxStyle,
    datePickerStyle,
    style,
    wallet,
    SelectAccount,
  } = props;
  const [fromDate, setFromDate] = useState(moment().subtract(1, 'M').startOf('M').toDate());
  const [toDate, setToDate] = useState(moment().subtract(1, 'M').endOf('M').toDate());
  const [isShareCopy, setShareCopy] = useState(false);
  const [isValidEmail, setValidEmail] = useState(false);
  const formikRef: any = useRef(null);
  const [isConfirmAlert, setConfirmAlert] = useState(false);
  const [isShowSelectAccount, setShowSelectAccount] = useState(false);
  const styles = useMergeStyle(style);
  const { isSharingInformation, shareInformation, isShareSuccessfully, wallets } = useContext(
    WalletContext
  );
  const [selectedWallets, setSelectedWallets] = useState<Wallet[]>([wallet]);
  const { colors, i18n } = useContext(ThemeContext);

  useEffect(() => {
    if (isShareSuccessfully) {
      onSuccess();
      showMessage({
        message:
          i18n?.t('share_information_component.msg_shared_successfully') ??
          'Account Information are sent successfully',
        backgroundColor: '#44ac44',
      });
    }
  }, [isShareSuccessfully]);

  useEffect(() => {
    setTimeout(() => {
      formikRef?.current?.validateForm();
    }, 0);
  }, []);

  const renderInputForm = (formikProps: FormikProps<ShareInformationData>) => {
    setValidEmail(formikProps.isValid);
    return (
      <View>
        <Text style={styles.sectionTextStyle}>
          {i18n?.t('share_information_component.lbl_recipient_email') ?? 'Recipient Email'}
        </Text>
        <InputField
          name='email'
          placeholder={
            i18n?.t('share_information_component.plh_enter_recipient_email') ??
            'Enter recipient email'
          }
          activeBorderColor={'#FOF3F8'}
          keyboardType='email-address'
          autoCapitalize={'none'}
        />
        <Text style={styles.sectionTextStyle}>
          {i18n?.t('share_information_component.lbl_message') ?? 'Message (Optional)'}
        </Text>
        <InputField
          name='message'
          placeholder={i18n?.t('share_information_component.plh_enter_message') ?? 'Enter message'}
          activeBorderColor={'#FOF3F8'}
          multiline={true}
          numberOfLines={4}
          scrollEnabled={true}
          textAlignVertical='top'
          style={{
            containerStyle: {
              marginBottom: 10,
            },
            inputContainerStyle: {
              height: 110,
              alignItems: 'flex-start',
              marginTop: 5,
              paddingTop: 5,
              paddingBottom: 10,
            },
          }}
        />
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.containerStyle}>
        <ScrollView style={styles.mainContainerStyle}>
          <Text style={styles.sectionTextStyle}>
            {i18n?.t('share_information_component.lbl_data_account') ?? 'Account'}
          </Text>

          <View style={styles.accountWrapperStyle}>
            <TouchableOpacity
              style={styles.accountContainerStyle}
              activeOpacity={0.8}
              onPress={() => setShowSelectAccount(true)}
            >
              <View style={innerStyles.accountNames}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.accountNameTextStyle}>
                  {selectedWallets?.length === 0 ? (
                    <Text style={styles.accountNumberTextStyle}>
                      {i18n?.t('share_information_component.lbl_select_account') ??
                        'Select a account '}
                    </Text>
                  ) : selectedWallets?.length === wallets.length ? (
                    i18n?.t('cash_flow.lbl_all_accounts') ?? 'All Accounts'
                  ) : (
                    selectedWallets?.map((w) => w.walletName).join(', ')
                  )}
                </Text>
              </View>
              <ArrowDownIcon size={12} color={colors.primaryColor} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTextStyle}>
            {i18n?.t('share_information_component.lbl_date_range') ?? 'Date Range'}
          </Text>
          <View style={innerStyles.dateRange}>
            <ShareDatePicker
              label={i18n?.t('share_information_component.lbl_from') ?? 'From'}
              date={fromDate}
              maxDate={moment(toDate).subtract(1, 'd').toDate()}
              onSelected={setFromDate}
              style={datePickerStyle}
            />
            <View style={innerStyles.seperatorDate} />
            <ShareDatePicker
              label={i18n?.t('share_information_component.lbl_to') ?? 'To'}
              date={toDate}
              maxDate={new Date()}
              onSelected={(date) => {
                if (moment(date).isSameOrBefore(fromDate, 'd')) {
                  setFromDate(moment(date).subtract(1, 'd').toDate());
                }
                setToDate(date);
              }}
              style={datePickerStyle}
            />
          </View>
          <Formik
            innerRef={formikRef}
            initialValues={ShareInformationData.empty()}
            validationSchema={ShareInformationSchema(
              i18n?.t('share_information_component.val_enter_email') ??
                'Recipient email is required',
              i18n?.t('share_information_component.val_email_invalid') ??
                'Recipient email is invalid'
            )}
            onSubmit={() => {}}
          >
            {renderInputForm}
          </Formik>
          <CheckBox
            style={checkBoxStyle}
            isSelected={isShareCopy}
            label={i18n?.t('share_information_component.lbl_send_copy') ?? 'Send me a copy of this'}
            onPress={() => setShareCopy(!isShareCopy)}
          />
        </ScrollView>
        <View style={styles.applyContainerStyle}>
          <Button
            style={{
              secondaryContainerStyle: {
                flex: 1,
                marginRight: 7,
              },
            }}
            variant='secondary'
            label={i18n?.t('share_information_component.btn_cancel') ?? 'Cancel'}
            onPress={onCancel}
          />
          <Button
            disabled={selectedWallets.length === 0 || !isValidEmail}
            isLoading={isSharingInformation}
            style={{
              primaryContainerStyle: {
                flex: 1,
                marginLeft: 7,
              },
            }}
            label={i18n?.t('share_information_component.btn_share') ?? 'Share'}
            onPress={() => {
              setConfirmAlert(true);
            }}
          />
        </View>
      </SafeAreaView>
      <AlertModal
        isVisible={isConfirmAlert}
        title={i18n?.t('share_information_component.lbl_confirmation') ?? 'Confirmation'}
        cancelTitle={i18n?.t('share_information_component.btn_cancel') ?? 'Cancel'}
        confirmTitle={i18n?.t('share_information_component.btn_continue') ?? 'Continue'}
        isShowClose={false}
        onClose={() => setConfirmAlert(false)}
        onCancel={() => setConfirmAlert(false)}
        leftIcon={<BWarningIcon size={17} color='#FFBB05' />}
        message={
          i18n?.t('share_information_component.msg_confirm_share') ??
          'Are you sure you want to share these sensitive information? Please click “Continue” to proceed.'
        }
        onConfirmed={() => {
          setConfirmAlert(false);
          let selectedWalletIds = selectedWallets.map((a) => a.walletId);
          shareInformation(
            userId,
            selectedWalletIds,
            [formikRef?.current.values['email']],
            moment(fromDate).format('YYYY-MM-DD'),
            moment(toDate).format('YYYY-MM-DD'),
            moment().add(1, 'y').format('YYYY-MM-DD')
          );
        }}
      />
      <SelectAccountModal
        isVisible={isShowSelectAccount}
        wallets={wallets}
        selectedWallets={selectedWallets}
        style={SelectAccount?.styles}
        onClose={() => setShowSelectAccount(false)}
        onApplied={(ws) => {
          setShowSelectAccount(false);
          setSelectedWallets(ws);
        }}
        {...SelectAccount?.components}
        {...SelectAccount?.props}
      />
    </>
  );
};

const innerStyles = StyleSheet.create({
  dateRange: {
    flexDirection: 'row',
  },
  seperatorDate: {
    width: 20,
  },
  accountNames: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 10,
  },
});

export default ShareInformationComponent;
