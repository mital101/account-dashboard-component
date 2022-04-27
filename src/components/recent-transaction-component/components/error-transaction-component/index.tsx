import { ChevronsDownIcon, InformationIcon } from '../../../../assets/images';
import React, { useContext } from 'react';
import { RefreshControl, ScrollView, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';
import { ThemeContext } from 'react-native-theme-component';
import useMergeStyles from './styles';

export type ErrorTransactionComponentProps = {
  isRefreshing: boolean;
  onRefresh: () => void;
  style?: ErrorTransactionComponentStyles;
};

export type ErrorTransactionComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  errorTitleStyle?: StyleProp<TextStyle>;
  errorMessageStyle?: StyleProp<TextStyle>;
  swipeActionTextStyle?: StyleProp<TextStyle>;
};

const ErrorTransactionComponent = ({
  style,
  isRefreshing,
  onRefresh,
}: ErrorTransactionComponentProps) => {
  const styles: ErrorTransactionComponentStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={colors.primaryColor}
        />
      }
      style={styles.containerStyle}
      contentContainerStyle={styles.contentContainerStyle}
    >
      <InformationIcon size={78} />
      <Text style={styles.errorTitleStyle}>
        {i18n?.t('error_connect_component.lbl_error_title') ?? 'Something went wrong'}
      </Text>
      <Text style={styles.errorMessageStyle}>
        {i18n?.t('error_connect_component.msg_error_message') ??
          "We're having difficulty trying to\nconnect to our server. Please try again."}
      </Text>
      <Text style={styles.swipeActionTextStyle}>
        {i18n?.t('error_connect_component.btn_swipe_down') ?? 'Swipe down to refresh'}
      </Text>
      <ChevronsDownIcon width={24} height={24} />
    </ScrollView>
  );
};

export default ErrorTransactionComponent;
