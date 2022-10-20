import { PhysicalCardConfirmComponentProps } from './types';
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import useMergeStyles from './styles';
import { images } from '../../../assets/images';
import { Button, CheckBox } from 'react-native-theme-component';

const PhysicalCardConfirmComponent = ({
  props,
  style,
}: PhysicalCardConfirmComponentProps) => {
  const styles = useMergeStyles(style);
  const {onConfirm} = props;
  const [isAgreedShareMobilePhone, setIsAgreedShareMobilePhone] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
      <View style={styles.headerWrapper}>
        <Text style={styles.pageTitle}>{'The UD Bank Physical Card'}</Text>
        <View style={styles.pcCardPreviewImgWrapper}>
          <Image source={images.pcCardPreview2} style={styles.image} resizeMode={'cover'}/>
        </View>
      </View>
        <Text style={styles.title}>Your Card on the Go!</Text>
        <Text style={styles.subTitle}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel aliquet nunc, id vulputate massa. In non lectus rutrum, semper odio ut, iaculis massa.</Text>
      </View>
      <View style={styles.footer}>
        <View style={styles.cbContainer}>
        <CheckBox title={'I agree to share my mobile number to the courier for delivery notifications. (Optional)'}  
          isSelected={isAgreedShareMobilePhone} onChanged={() => setIsAgreedShareMobilePhone(!isAgreedShareMobilePhone)} 
          style={{
            selectedBoxStyle: {backgroundColor: '#FFFFFF'},
            unSelectedBoxStyle: {backgroundColor: 'transparent', borderWidth: 2, borderColor: '#FFFFFF'},
            titleStyle: [styles.subTitle, {flex: 1}],
          }}
          activeIconColor={'#020000'}
          />
        </View>
          <Button onPress={onConfirm} label={'Proceed'} disabled={!isAgreedShareMobilePhone} disableColor={'rgba(0, 0, 0, 0.2)'} style={{
            primaryLabelStyle: {color: isAgreedShareMobilePhone ? '#FFFFFF' : '#FFFFFF'}
          }}  />
      </View>
    </View>
  );
};

export default PhysicalCardConfirmComponent;
