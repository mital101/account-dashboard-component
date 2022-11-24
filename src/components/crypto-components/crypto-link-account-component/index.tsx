import React, { useContext, useEffect, useState } from "react";
import {
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Button, ThemeContext, CheckBox } from "react-native-theme-component";
import useMergeStyles from "./styles";
import WebView from "react-native-webview";

//createCryptoApplication

// import { AccountLinkingContext } from '@banking-component/account-linking';
import { AuthContext } from "react-native-auth-component";

import {
  WalletCardComponent,
  WalletContext,
  ArrowBack,
  CryptoLinkAccountIcon
} from "@banking-component/account-dashboard-component";

import {
  SuccessVerificationComponent,
  ErrorVerificationComponent
} from "@banking-component/account-dashboard-component/src/components/crypto-components";

// import { AccountOriginationContext } from 'account-origination-component';

import {
  CustomerInvokeContext,
  CustomerInvokeService
} from "customer-invoke-component";

const customerInvokeService = CustomerInvokeService.instance();

export type CryptoLinkAccountComponentProps = {
  style?: CryptoLinkAccountComponentStyles;
  onPressBack: () => void;
  onNext: () => void;
};

export type CryptoLinkAccountComponentStyles = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  footerContainerStyle?: StyleProp<ViewStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
};

const cryptoDummyData = [
  {
    id: 0,
    header: "Investment Goals",
    data: [
      {
        id: "investmentFinancialGoal",
        title: "Primary Objectives in trading cryptocurrency",
        options: [
          {
            id: "Conservative",
            title: "Conservative",
            value: "Conservative"
          },
          {
            id: "Moderate Growth",
            title: "Moderate Growth",
            value: "Moderate Growth"
          },
          {
            id: "Aggressive Growth",
            title: "Aggressive Growth",
            value: "Aggressive Growth"
          }
        ]
      },
      {
        id: "investmentRiskAppetite",
        title:
          "How much risk with your investments are you willing to tolerate or accept? Remember that high rewards often come with higher risks.",
        options: [
          {
            id: "Conservative",
            title: "Conservative",
            value: "Conservative"
          },
          {
            id: "Aggressive",
            title: "Aggressive",
            value: "Aggressive"
          },
          {
            id: "Speculative",
            title: "Speculative",
            value: "Speculative"
          }
        ]
      },
      {
        id: "investmentLiquidityNeeds",
        title:
          "How often will you need to convert withdraw all or parts of your investments to cash?",
        options: [
          {
            id: "Under 6 months",
            title: "Under 6 months",
            value: "Under 6 months"
          },
          {
            id: "6 months to one year",
            title: "6 months to one year",
            value: "6 months to one year"
          },
          {
            id: "More than a year",
            title: "More than a year",
            value: "More than a year"
          }
        ]
      },
      {
        id: "investmentTimePeriod",
        title: "For how long do you plan to use or invest in this account?",
        options: [
          {
            id: "Less than 1 year",
            title: "Less than 1 year",
            value: "Less than 1 year"
          },
          {
            id: "1-3 years",
            title: "1-3 years",
            value: "1-3 years"
          },
          {
            id: "Over 3 years",
            title: "Over 3 years",
            value: "Over 3 years"
          }
        ]
      }
    ]
  },
  {
    id: 1,
    header: "Investment Experience with Cryptocurrencies",
    data: [
      {
        id: "investmentProjectedTrade",
        title: "Projected Trade Transaction volume",
        options: [
          {
            id: "1 to 20 trades transactions per year",
            title: "1 to 20 trades transactions per year",
            value: "1 to 20 trades transactions per year"
          },
          {
            id: "21 to 50 trades transactions per year",
            title: "21 to 50 trades transactions per year",
            value: "21 to 50 trades transactions per year"
          },
          {
            id: "Over 50 trades transactions per year",
            title: "Over 50 trades transactions per year",
            value: "Over 50 trades transactions per year"
          }
        ]
      },
      {
        id: "investmentKnowledgeLevel",
        title: "Level of knowledge",
        options: [
          {
            id: "Low knowledge",
            title: "Low knowledge",
            value: "Low knowledge"
          },
          {
            id: "Good knowledge",
            title: "Good knowledge",
            value: "Good knowledge"
          },
          {
            id: "Extensive knowledge",
            title: "Extensive knowledge",
            value: "Extensive knowledge"
          }
        ]
      },
      {
        id: "investmentNetWorth",
        title: "Percentage of Net Worth",
        options: [
          {
            id: "Less than 10%",
            title: "Less than 10%",
            value: "Less than 10%"
          },
          {
            id: "10% to 25%",
            title: "10% to 25%",
            value: "10% to 25%"
          },
          {
            id: "Over 25%",
            title: "Over 25%",
            value: "Over 25%"
          }
        ]
      }
    ]
  }
];

const CryptoLinkAccountComponent = ({
  style,
  onNext,
  onPressBack
}: CryptoLinkAccountComponentProps) => {
  const styles: CryptoLinkAccountComponentStyles = useMergeStyles(style);
  const { i18n, colors } = useContext(ThemeContext);

  const { profile } = useContext(AuthContext);

  const {
    createCryptoApplication,
    cryptoApplicationDetails,
    cryptoErrorCreateApplication,
    isCryptoCreatingApplication,
    isCryptoCreatedApplication,
    applicationList,
    clearErrors
  } = useContext(CustomerInvokeContext);

  const {
    getCryptoTcData,
    cryptoTC,
    isLoadingCryptoTC,
    getWalletsById
  } = useContext(WalletContext);

  // const [isMount, setIsMount] = useState<boolean>(false);
  const [isSelected1, setSelected1] = useState(false);
  const [isSelected2, setSelected2] = useState(false);
  const [isSelected3, setSelected3] = useState(false);
  const [isAppCreated, setIsAppCreated] = useState(false);
  const [isShowTc, setShowTc] = useState(false);
  const [isShowRiskProfile, setShowRiskProfile] = useState(false);
  const [investmentFinancialGoal, setInvestmentFinancialGoal] = React.useState<
    string
  >();
  const [investmentRiskAppetite, setInvestmentRiskAppetite] = React.useState<
    string
  >();
  const [
    investmentLiquidityNeeds,
    setInvestmentLiquidityNeeds
  ] = React.useState<string>();
  const [investmentTimePeriod, setInvestmentTimePeriod] = React.useState<
    string
  >();
  const [
    investmentProjectedTrade,
    setInvestmentProjectedTrade
  ] = React.useState<string>();
  const [
    investmentKnowledgeLevel,
    setInvestmentKnowledgeLevel
  ] = React.useState<string>();
  const [investmentNetWorth, setInvestmentNetWorth] = React.useState<string>();
  const [
    hasCryptoCreateApplicationError,
    setHasCryptoCreateApplicationError
  ] = React.useState<string>();
  const [existingApplicationId, setExistingApplicationId] = useState(0);

  useEffect(() => {
    getCryptoTcData("pdax-terms-conditions", "UnionDigital", "UD", "HTML");

    if (applicationList.length > 0) {
      applicationList.filter(function(el) {
        if (
          el.productDetails.bankId === "PDAX" &&
          el.productDetails.productType === "CRYPTO" &&
          el.status === "Approved"
        ) {
          setExistingApplicationId(el.applicationId);
          setShowRiskProfile(true);
        }
      });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const firstName = `${profile?.firstName}`.trim();

  useEffect(() => {
    if (isCryptoCreatedApplication) {
      getWalletsById("PDAX");
      setShowRiskProfile(isCryptoCreatedApplication);
    }
  }, [isCryptoCreatedApplication]);

  const createRiskProfile = async () => {
    console.log("sksksksks", existingApplicationId);

    const dataList = {
      investmentProjectedTrade: investmentProjectedTrade,
      investmentKnowledgeLevel: investmentKnowledgeLevel,
      investmentNetWorth: investmentNetWorth,
      investmentFinancialGoal: investmentFinancialGoal,
      investmentRiskAppetite: investmentRiskAppetite,
      investmentLiquidityNeeds: investmentLiquidityNeeds,
      investmentTimePeriod: investmentTimePeriod
    };

    if (
      (cryptoApplicationDetails && cryptoApplicationDetails.applicationId) ||
      existingApplicationId
    ) {
      console.log("wwwwwwwww");

      const applicationId = cryptoApplicationDetails
        ? cryptoApplicationDetails.applicationId
        : existingApplicationId;
      console.log("applicationId ", applicationId);

      const respone = await customerInvokeService.createRiskProfile(
        applicationId,
        dataList
      );

      // customerInvokeService.submitRiskProfile
      const respone2 = await customerInvokeService.submitRiskProfile(
        applicationId
      );

      setTimeout(async () => {
        const respone3 = await customerInvokeService.getApplicationStatus(
          applicationId
        );
        console.log("respone3 ", respone3);
        if (respone3.data.status === "Rejected") {
          setHasCryptoCreateApplicationError(true);
        } else {
          setIsAppCreated(true);
        }
      }, 2000);
    }
  };

  const radioButtonGroup = (data, type) => {
    return data.map((item, index) => {
      return (
        <TouchableOpacity
          key={`${item.title}-${index}`}
          style={styles.radioBtncontainer}
          onPress={() => {
            type === "investmentFinancialGoal"
              ? setInvestmentFinancialGoal(item.value)
              : type === "investmentRiskAppetite"
              ? setInvestmentRiskAppetite(item.value)
              : type === "investmentLiquidityNeeds"
              ? setInvestmentLiquidityNeeds(item.value)
              : type === "investmentTimePeriod"
              ? setInvestmentTimePeriod(item.value)
              : type === "investmentProjectedTrade"
              ? setInvestmentProjectedTrade(item.value)
              : type === "investmentKnowledgeLevel"
              ? setInvestmentKnowledgeLevel(item.value)
              : type === "investmentNetWorth"
              ? setInvestmentNetWorth(item.value)
              : "";
          }}
        >
          <View style={styles.radioRowBetween}>
            <View style={styles.radioRow}>
              <View style={styles.radioRowInfo}>
                <View style={styles.radioRowBetween}>
                  <Text style={styles.radioMainTitle}>{item.title}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.radioBtn}>
            {type === "investmentFinancialGoal" &&
              investmentFinancialGoal === item.value && (
                <View style={styles.selectedRadioBtn} />
              )}
            {type === "investmentRiskAppetite" &&
              investmentRiskAppetite === item.value && (
                <View style={styles.selectedRadioBtn} />
              )}
            {type === "investmentLiquidityNeeds" &&
              investmentLiquidityNeeds === item.value && (
                <View style={styles.selectedRadioBtn} />
              )}
            {type === "investmentTimePeriod" &&
              investmentTimePeriod === item.value && (
                <View style={styles.selectedRadioBtn} />
              )}
            {type === "investmentProjectedTrade" &&
              investmentProjectedTrade === item.value && (
                <View style={styles.selectedRadioBtn} />
              )}
            {type === "investmentKnowledgeLevel" &&
              investmentKnowledgeLevel === item.value && (
                <View style={styles.selectedRadioBtn} />
              )}
            {type === "investmentNetWorth" &&
              investmentNetWorth === item.value && (
                <View style={styles.selectedRadioBtn} />
              )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  if (cryptoErrorCreateApplication || hasCryptoCreateApplicationError) {
    return (
      <ErrorVerificationComponent
        onHome={() => {
          onPressBack();
          clearErrors();
        }}
        retry={() => {
          clearErrors();
          setIsAppCreated(false);
          if (cryptoTC) {
            createCryptoApplication(cryptoTC?.templateId);
            createRiskProfile();
          }
        }}
        name={firstName}
      />
    );
  }

  if (
    isAppCreated &&
    !cryptoErrorCreateApplication &&
    !hasCryptoCreateApplicationError
  ) {
    return (
      <SuccessVerificationComponent
        onNext={() => {
          onNext();
        }}
        name={firstName}
      />
    );
  }

  if (isShowRiskProfile) {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.mainContainerStyle}>
            <TouchableOpacity
              onPress={() => {
                onPressBack();
              }}
              style={styles.header}
            >
              <ArrowBack color={"#fff"} />
            </TouchableOpacity>
            <ScrollView>
              <View style={styles.headerTitle}>
                <Text style={styles.title}>
                  Let's find out a suitable investment strategy for you.
                </Text>
              </View>
              <View style={styles.headerIcon}>
                <Text style={styles.riskHeadersubTitle}>
                  This questionnaire will help you determine your profile and
                  match a investment strategy designed for you.
                </Text>
              </View>
              <>
                {cryptoDummyData.map((obj, k) => {
                  return (
                    <View key={k} style={styles.contentWrapper}>
                      <Text style={styles.riskContentTitle}>{obj.header}</Text>
                      {obj.data.map((obj2, k2) => {
                        return (
                          <View key={k2} style={styles.checkBoxWrapper}>
                            <Text style={styles.riskContentSubTitle}>
                              {obj2.title}
                            </Text>
                            {radioButtonGroup(obj2.options, obj2.id)}
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </>
            </ScrollView>
          </View>

          <View
            style={
              investmentFinancialGoal &&
              investmentRiskAppetite &&
              investmentLiquidityNeeds &&
              investmentTimePeriod &&
              investmentProjectedTrade &&
              investmentKnowledgeLevel &&
              investmentNetWorth
                ? styles.buttonWrapper
                : styles.disableButtonWrapper
            }
          >
            <Button
              label={"Proceed"}
              isLoading={isCryptoCreatingApplication}
              onPress={() => {
                // if (cryptoTC) {
                //   createCryptoApplication(cryptoTC?.templateId)
                // }
                createRiskProfile();
              }}
              disabled={
                investmentFinancialGoal &&
                investmentRiskAppetite &&
                investmentLiquidityNeeds &&
                investmentTimePeriod &&
                investmentProjectedTrade &&
                investmentKnowledgeLevel &&
                investmentNetWorth
                  ? false
                  : true
              }
              disableColor={colors.primaryButtonColor}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  if (isShowTc) {
    return (
      <View style={styles.tcContentWrapper}>
        <SafeAreaView>
          <View style={styles.webViewmainContainerStyle}>
            <TouchableOpacity
              onPress={() => {
                setShowTc(false);
              }}
              style={styles.webViewheader}
            >
              <ArrowBack color={"#3E2D68"} />
            </TouchableOpacity>
            {isLoadingCryptoTC ? (
              <View>
                <Text>Loading</Text>
              </View>
            ) : (
              <WebView
                startInLoadingState
                scalesPageToFit
                originWhitelist={["*"]}
                source={{ html: cryptoTC?.content }}
              />
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.mainContainerStyle}>
            <TouchableOpacity
              onPress={() => {
                onPressBack();
              }}
              style={styles.header}
            >
              <ArrowBack color={"#fff"} />
            </TouchableOpacity>
            <View style={styles.headerTitle}>
              <Text style={styles.title}>Before you proceed...</Text>
            </View>
            <View style={styles.headerIcon}>
              <CryptoLinkAccountIcon width={120} height={120} />
              <Text style={styles.subTitle}>
                Please keep in mind that the price of crypto are volatile and
                may carry a high level of risk.
              </Text>
            </View>
            <View style={styles.contentWrapper}>
              <Text style={styles.contentTitle}>
                Kindly checkout our UnionDigital Bank Crypto Accounts’s Terms
                and Conditions:
              </Text>

              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  title={
                    <Text>
                      This is a place holder for Exchange Terms and Condiition.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                      <Text
                        onPress={() => {
                          setShowTc(true);
                        }}
                        style={styles.tcLink}
                      >
                        Link out to terms and condition
                      </Text>
                    </Text>
                  }
                  isSelected={isSelected1}
                  onChanged={() => {
                    setSelected1(!isSelected1);
                  }}
                  style={styles.checkBoxInputFieldStyle}
                />
              </View>
              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  title={
                    <Text>
                      This is a place holder for Exchange Terms and Condiition.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                      <Text
                        onPress={() => {
                          setShowTc(true);
                        }}
                        style={styles.tcLink}
                      >
                        Link out to terms and condition
                      </Text>
                    </Text>
                  }
                  isSelected={isSelected2}
                  onChanged={() => {
                    setSelected2(!isSelected2);
                  }}
                  style={styles.checkBoxInputFieldStyle}
                />
              </View>
              <View style={styles.checkBoxWrapper}>
                <CheckBox
                  title={
                    <Text>
                      This is a place holder for Exchange Terms and Condiition.
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
                      <Text
                        onPress={() => {
                          setShowTc(true);
                        }}
                        style={styles.tcLink}
                      >
                        Link out to terms and condition
                      </Text>
                    </Text>
                  }
                  isSelected={isSelected3}
                  onChanged={() => {
                    setSelected3(!isSelected3);
                  }}
                  style={styles.checkBoxInputFieldStyle}
                />
              </View>
            </View>
          </View>

          <View
            style={
              isSelected1 && isSelected2 && isSelected3
                ? styles.buttonWrapper
                : styles.disableButtonWrapper
            }
          >
            <Button
              label={"Proceed to activate crypto account"}
              isLoading={isCryptoCreatingApplication}
              onPress={() => {
                if (cryptoTC) {
                  createCryptoApplication(cryptoTC?.templateId);
                }
              }}
              disabled={
                isSelected1 && isSelected2 && isSelected3 ? false : true
              }
              disableColor={colors.primaryButtonColor}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
};

export default CryptoLinkAccountComponent;
