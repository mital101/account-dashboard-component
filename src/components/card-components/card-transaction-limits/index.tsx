import { CardUpdateTransactionLimitsComponentProps } from './types';
import React, { useEffect, useRef, useState, useContext } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import useMergeStyles from './styles';
import { Button, useCurrencyFormat } from 'react-native-theme-component';
import AlertModal from '../../alert-model';
import { WalletContext } from '../../../context/wallet-context';

const CardUpdateTransactionLimitsComponent = ({
  props,
  style,
}: CardUpdateTransactionLimitsComponentProps) => {
  const styles = useMergeStyles(style);
  const maximumLimit = 250000;
  const { isLoadingGetTransactionLimit, transactionLimitsOverall } = useContext(WalletContext);
  const { onCancelUpdateTransactionLimits, onDismissAlert, isShowConfirmALert, onConfirm } = props;
  const [stepLength, setStepLength] = useState<number>();
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(transactionLimitsOverall?.limitValue ? transactionLimitsOverall?.limitValue : 0);
  const position = useRef(new Animated.ValueXY()).current;
  const positionCurrent = useRef<number>(transactionLimitsOverall?.limitValue ? maximumLimit / transactionLimitsOverall?.limitValue : 0 );
  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      if(stepLength) {
        const step = Math.round((gestureState.moveX + 10) / stepLength) - 1;
        if(step >= 0 && step <= 10 && step !== positionCurrent.current) {
          position.setValue({x: step  * stepLength - 10, y: gestureState.dy});
          positionCurrent.current = step;
          setAmount(Math.round(maximumLimit * (step / 10)));
          setIsUpdated(true);
        }
      }
    },
  }), [stepLength]);
  
  const amountFormatted = useCurrencyFormat(amount, 'PHP');

  useEffect(() => {
    if(transactionLimitsOverall && stepLength) {
      setAmount(transactionLimitsOverall.limitValue);
      const xPosition = (transactionLimitsOverall.limitValue / maximumLimit * 10) * stepLength - 10;
      console.log('x - value', xPosition);
      position.setValue({x: xPosition, y: 0});
    }
  }, [stepLength, transactionLimitsOverall]);


  console.log('render - > transactionLimitsOverall', transactionLimitsOverall, amount);
  console.log('valid', !transactionLimitsOverall && stepLength);
  
  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>{'Update transaction limits'}</Text>
      <Text style={styles.pageSubtite}>{'Use the sliders to adjust the transaction limits.'}</Text>
      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>Total daily card limit</Text>
          <Text style={styles.subTitle}>Total transaction amount per day</Text>
        </View> 
        <View style={styles.dragSection} onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setStepLength(width / 10);
          }}>
        {stepLength &&
          <View>
            <View style={styles.row}>
              <View style={styles.amountRow} />
              <Animated.View style={[styles.processRow, {width: position.x}]}/>
              <Animated.View {...panResponder.panHandlers}
              style={[styles.circleAmount, {left: position.x}]}/>
              <Animated.View style={[styles.viewAmountNumber, { left: position.x, transform: [{ translateX: amount === maximumLimit ? -65 : -`${amount}`.length * 5.5 }] }]} >
                <Text style={[styles.amountNumber, {color: '#FFFFFF'}]}>{`${amountFormatted}`}</Text>
              </Animated.View>
            </View>
            <View style={styles.amountLineSection}>
              <View style={{position: 'absolute', left: 0}}>
                <View style={styles.bigLineColumnAmount}/>
                <Text style={styles.amountNumber}>0</Text>
              </View>
              <View style={[styles.lineAmount, {left: stepLength}]} />
              <View style={[styles.lineAmount, {left: stepLength * 2}]} />
              <View style={[styles.lineAmount, {left: stepLength * 3}]} />
              <View style={[styles.lineAmount, {left: stepLength * 4}]} />
              <View style={[styles.bigLineColumnAmount, {left: stepLength * 5}]} />
              <View style={[styles.lineAmount, {left: stepLength * 6}]} />
              <View style={[styles.lineAmount, {left: stepLength * 7}]} />
              <View style={[styles.lineAmount, {left: stepLength * 8}]} />
              <View style={[styles.lineAmount, {left: stepLength * 9}]} />
              <View style={{position: 'absolute', left: stepLength * 10}}>
                <View style={styles.bigLineColumnAmount}/>
                <Text style={[styles.amountNumber, { transform: [{translateX: -25},] }]}>250k</Text>
              </View>
            </View>
          </View>} 
        </View>

      </View>
      <View style={styles.actionWrapper}>
        <Button
          label="Confirm"
          onPress={() => onConfirm(amount)}
          isLoading={isLoadingGetTransactionLimit}
          disabled={!isUpdated}
          disableColor={'#ECECEC'}
        />
      </View>
      <AlertModal 
        isVisible={isShowConfirmALert} 
        title={'Cancel changes?'}
        onConfirmed={onCancelUpdateTransactionLimits}
        onCancel={onDismissAlert} 
        iconColor={'#FBC02D'}
        subtitle={'Do you wish to cancel this changes in limits? All changes will not be saved if you cancel.'}
        btnLabel={'Yes, cancel changes in limits'} 
        secondaryBtnLabel={'No, continue'}
      />
    </View>
  );
};

export default CardUpdateTransactionLimitsComponent;
