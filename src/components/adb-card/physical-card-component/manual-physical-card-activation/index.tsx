import React, { useState } from 'react'
import { Text, View } from 'react-native'
import CardInput from './cardInput'
import { formatCC, formatExpDate } from './helper'
import useMergeStyle, { ManualCardActivationStyles } from './styles'
export interface ManualCardActivationProps {
  style?:ManualCardActivationStyles
}

const ManualCardActivation:React.FC<ManualCardActivationProps> = (props) => {
  const {style} = props
  const styles:ManualCardActivationStyles = useMergeStyle(style);
  const [cardNumber, setCardNumber] = useState("")
  const [isCardInvalid, setCardInvalid] = useState(true);
  const [date, setDate] = useState("")
  const [isExpDateInvalid, setExpDateInvalid] = useState(false);
  const [cvv, setCVV] = useState("")
  return (
    <View style={styles.wrapperStyle}>
      <Text style={styles.titleStyle}>Enter your card details</Text>
      <Text style={styles.subTitleStyle}>Verify and complete your card information.</Text>
      <View style={styles.inputContainerStyle}>
        <CardInput showCardImg label='Card number' value={cardNumber} onChangeText={(e) => {
          const formattedNum = formatCC(e);
          setCardNumber(formattedNum)
        }} error={isCardInvalid} errorLabel='Invalid card number.'/>
        <View style={styles.sensitiveDataContainer}>
          <View style={{width:'48%'}}>
          <CardInput label='Expiry date' value={date} onChangeText={(e) => formatExpDate(e).then((x) => setDate(x))} error={isExpDateInvalid} errorLabel='Invalid expiry date.'/>
          </View>
          <View  style={{width:'48%'}}>
          <CardInput label='CVV' value={cvv} onChangeText={(e) => setCVV(e)} error={cvv.length > 3} errorLabel='Invalid CVV.'/>
          </View>
        </View>
      </View>
    </View>
  )
}

export default ManualCardActivation