import { CryptoTransferOutTransactionSuccessComponentProps } from "./types";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import useMergeStyles from "./styles";
import * as Progress from "react-native-progress";
import RowInfo from "../../row-info";
import { Button } from "react-native-theme-component";
import { InfoIcon, UnionDigitalBankIcon } from "../../../assets/images";

const CryptoTransferOutTransactionSuccessComponent = ({
  props,
  style
}: CryptoTransferOutTransactionSuccessComponentProps) => {
  const styles = useMergeStyles(style);
  const { onBackToDashboard, onBackToTransferIn, onGoToHelpCenter } =
    props || {};
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.containerCenter}>
        <View style={styles.content}>
          <Text style={styles.title}>Hang on for a moment</Text>
          <View style={styles.subTitleWrapper}>
            <Text style={styles.subTitle}>
              We’re currently setting up your transaction.
            </Text>
          </View>
          <View style={styles.circleProgressWrapper}>
            <Progress.Circle
              size={60}
              endAngle={0.75}
              indeterminate={true}
              borderWidth={6}
              borderColor={"#3E2D68"}
            />
          </View>
        </View>
      </View>
    );
  }

  if (!isSuccess) {
    return (
      <View style={styles.containerFailed}>
        <View style={styles.errorContentWrapper}>
          <View style={styles.columnBetween}>
            <View>
              <View style={styles.errorTitleWrapper}>
                <View style={styles.iconErrorWrapper}>
                  <InfoIcon width={80} height={80} color={"#E06D6D"} />
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
                <Text style={[styles.infoSubTitle, styles.errorInfoTitleColor]}>
                  ABCDE12345676789
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Button
            label={"Back to Crypto Dashboard"}
            onPress={onBackToDashboard}
          />
          <Button
            label={"Have issues? Visit our Help Center!"}
            onPress={onGoToHelpCenter}
            bgColor={"transparent"}
            style={{
              primaryContainerStyle: styles.btnTransparent,
              primaryLabelStyle: styles.labelBtnTransaprent
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titleSuccess}>Transaction Successful!</Text>
        <View style={styles.subTitleSuccessWrapper}>
          <Text style={styles.subTitleSuccess}>
            #UDidIt! You have successfully transferred money from your Pitaka to
            your Crypto Pitaka. See transaction details below:
          </Text>
        </View>
        <View style={styles.contentSuccess}>
          <RowInfo
            props={{
              title: "Transaction Type",
              value: "PHP transfer-in"
            }}
          />
          <RowInfo
            props={{
              title: "Amount to Send",
              value: "₱ 1,000.00"
            }}
          />
          <RowInfo
            props={{
              title: "Transaction Status ",
              value: "Completed"
            }}
            style={{
              value: styles.completedTextColor
            }}
          />
          <RowInfo
            props={{
              title: "Send Money From",
              value: "My Pitaka\nBen Santos\n1234567890"
            }}
          />
          <RowInfo
            props={{
              title: "Send Money To",
              value: "My Crypto Pitaka\nBen Santos"
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
        <View style={styles.btnActionsWrapper}>
          <Button
            label={"Make Another Transaction"}
            onPress={onBackToTransferIn}
          />
          <Button
            label={"Back to Crypto Dashboard"}
            onPress={onBackToDashboard}
            bgColor={"transparent"}
            style={{
              primaryContainerStyle: styles.btnTransparent,
              primaryLabelStyle: styles.labelBtnTransaprent
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CryptoTransferOutTransactionSuccessComponent;
