import React, { useState } from 'react';
import { KeyboardAvoidingView, Text, View } from 'react-native';
import TouchID from 'react-native-touch-id';
import { InfoIcon } from '../../../../assets/info.icon';
import { BRoundedTickIcon } from '../../../../assets/rounded-tick.icon';
import AlertModal from "../../../alert-model";
import VirtualCard from '../../card-info-component/components/virtual-card';
import Button from '../../core/button';
import EditableInput from '../../core/editable-textinput';
import useMergeStyle, { CardLimitStyles } from './styles';
export interface CardLimitProps {
    style?: CardLimitStyles;
    onPressGotoHome: () => void;
}

const CardLimitComponent: React.FC<CardLimitProps> = (props) => {
    const {style, onPressGotoHome} = props;
    const styles: CardLimitStyles = useMergeStyle(style);
    const [retailTransactionLimit, setRetailTransactionLimit] = useState(5000);
    const [cashWithdrawalLimit, setCashWithdrawalLimit] = useState(5000);
    const [contactLessLimit, setContactLessLimit] = useState(250);
    const [showAlert, setAlert] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const checkUserAuth = (cb:()=>void) => {
        TouchID.authenticate('Authentication required to proceed', {passcodeFallback: true})
        .then(() => {
          setError(false)
          setAlert(true);
          cb()
        })
        .catch(() => {
            setError(true)
            setAlert(true);
        }); 
    }
  return (
    <KeyboardAvoidingView style={styles.wrapperStyle} keyboardVerticalOffset={0}>
      <Text style={styles.titleStyle}>Card limit</Text>
      <Text style={styles.subTitleStyle}>Please set your preferred limits for each transaction type.</Text>
      <View style={styles.cardContainerStyle}>
        <VirtualCard showEyeIcon cardHolderName='{Nur Aeolanda Binti Mahmud}' />
      </View>
      <View>
        <EditableInput onSave={(e) =>checkUserAuth(() => setRetailTransactionLimit(Number(e))) } value={retailTransactionLimit.toFixed(2).toString()} keyboardType='number-pad' label='Retail transaction daily limit' />
        <EditableInput onSave={(e) => checkUserAuth(() => setCashWithdrawalLimit(Number(e)))} value={cashWithdrawalLimit.toFixed(2).toString()} keyboardType='number-pad' label='Cash withdrawal daily limit'/>
        <EditableInput onSave={(e) => checkUserAuth(() => setContactLessLimit(Number(e)))} value={contactLessLimit.toFixed(2).toString()} keyboardType='number-pad' label='Contactless transaction limit'/>
      </View>
      <View style={styles.buttonContainer}>
        <Button label='Go to Home' onPress={() => {
            onPressGotoHome()
        }}/>
      </View>
      <AlertModal
        isVisible={showAlert}
        position="bottom"
        title={error ? "Unsuccessful!" : "Success!"}
        subtitle={error ? "Error when performing request. Please try again later." :
          "Your card limits have been updated."
        }
        icon={
        <View style={{height: 55, width: 55}}>
          {error ? <InfoIcon color='#00000030'/> : <BRoundedTickIcon color='#00000030'/>}
        </View>
      }
        onCancel={() => {}}
        onConfirmed={() => {}}
        style={{
            containerStyle: {
                borderRadius: 24
            }
        }}
        children={
          <View style={{ paddingHorizontal: 24, width: "100%" }}>
            {error && <View style={{ marginBottom: 10 }}>
              <Button
                labelColor="#1b1b1b"
                background="#ffffff"
                label={"Done"}
                onPress={() => setAlert(false)}
              />
            </View>}
            <Button label={error ? "Retry" : "Done"} onPress={() => 
                setAlert(false)} />
          </View>
        }
      />
    </KeyboardAvoidingView>
  )
}

export default CardLimitComponent