import {
  CustomerInvokeContext,
  CustomerInvokeService,
} from "customer-invoke-component";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-theme-component";
import { InfoIcon, OncompletedIcon } from "../../../assets/images";
import { WalletService } from "../../../services/wallet-service";
import LoadingSpinner from "../../loading-spinner";
import useMergeStyles from "./styles";
import { ActiveCardRequestProps } from "./types";

const onboardingServices = CustomerInvokeService.instance();
const walletServices = WalletService.instance();

const ActiveCardRequestComponent = ({
  style,
  onFailed,
  onNavigateToMyCard,
  onBackToDashboard,
}: ActiveCardRequestProps) => {
  const styles = useMergeStyles(style);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { submitApplication, vcApplicationDetails } = useContext(
    CustomerInvokeContext
  );

  useEffect(() => {
    submitAndWaitForStatus();
  }, []);

  const onRetry = () => {
    submitAndWaitForStatus();
  };

  const submitAndWaitForStatus = async () => {
    setIsLoading(true);
    await submitApplication();
    if (vcApplicationDetails) {
      console.log("1");
      let timeOutCountDown = 30;
      const getApplicationStatusInterval = setInterval(async () => {
        timeOutCountDown--;
        const respone = await onboardingServices.getVCApplicationStatus(
          vcApplicationDetails?.applicationId
        );
        const euronetStatus = respone.data.applicationStatuses.find(
          (application: any) => application.statusName === "EURONET_ACCOUNT"
        )?.statusValue;
        const dataHubStatus = respone.data.applicationStatuses.find(
          (application: any) => application.statusName === "DATA_HUB_ACCOUNT"
        )?.statusValue;
        if (
          respone.data.status === "Completed" &&
          (euronetStatus !== "Pending" || dataHubStatus !== "Pending")
        ) {
          clearInterval(getApplicationStatusInterval);
          console.log("12");
          if (euronetStatus === "Failed" || dataHubStatus === "Failed") {
            console.log("123");
            setIsLoading(false);
            onFailed();
          } else {
            console.log("124");
            timeOutCountDown = 15;
            const getWalletInfoInterval = setInterval(async () => {
              timeOutCountDown--;
              const respone = await walletServices.getWalletsByWalletType(
                "CARD_WALLET"
              );
              console.log("respone get info", respone.data);
              if (respone.data.length > 0) {
                clearInterval(getWalletInfoInterval);
                setIsSuccess(true);
                setIsLoading(false);
              } else if (timeOutCountDown <= 0) {
                clearInterval(getWalletInfoInterval);
                setIsSuccess(false);
                setIsLoading(false);
              }
            }, 1000);
          }
        } else if (respone.data.status === "Failed" || timeOutCountDown <= 0) {
          clearInterval(getApplicationStatusInterval);
          setIsSuccess(false);
          setIsLoading(false);
        }
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.containerCenter}>
        <View style={styles.content}>
          <Text style={styles.title}>Hang on for a moment</Text>
          <View style={styles.subTitleWrapper}>
            <Text style={styles.subTitle}>We’re setting up your card.</Text>
          </View>
          <View style={styles.circleProgressWrapper}>
            <LoadingSpinner
              props={{
                borderColor: "#FFFFFF",
              }}
            />
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
                {isSuccess ? (
                  <OncompletedIcon width={94} height={94} />
                ) : (
                  <InfoIcon width={94} height={94} color={"#DA5552"} />
                )}
              </View>
              <Text style={styles.statusLabel}>
                {isSuccess
                  ? `#UDidit! You've activated your virtual card!`
                  : "Something went wrong"}
              </Text>
              <View style={styles.errorMessageWrapper}>
                <Text style={styles.errorMessageLabel}>
                  {isSuccess
                    ? "Start using your virtual card right now!"
                    : `We're having difficulty trying to connect to our server. Please try again.`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View>
        {isSuccess ? (
          <Button label={"Take me to my card"} onPress={onNavigateToMyCard} />
        ) : (
          <>
            <Button label={"Retry"} onPress={onRetry} />
            <Button
              label={"Back to Cards"}
              onPress={onBackToDashboard}
              bgColor={"transparent"}
              style={{
                primaryContainerStyle: styles.btnTransparent,
                primaryLabelStyle: styles.labelBtnTransaprent,
              }}
            />
          </>
        )}
      </View>
    </View>
  );
};

export default ActiveCardRequestComponent;
