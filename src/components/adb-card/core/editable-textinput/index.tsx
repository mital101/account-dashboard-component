import React, { useState } from 'react';
import { KeyboardType, Text, TextInput, View } from 'react-native';
import useMergeStyle, { EditableInputStyles } from './styles';

export interface EditableInputProps {
    label: string;
    // onChange: (value:string) => void;
    value:string;
    style?:EditableInputStyles;
    keyboardType?: KeyboardType;
    onSave: (value:string) => void;
}

const EditableInput:React.FC<EditableInputProps> = (props) => {
    const {style, keyboardType, onSave,value, label} = props
    const [isEdit, setEdit] = useState(false);
    const [changedValue, setValue] = useState(value)
    const styles: EditableInputStyles = useMergeStyle(style)
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <View style={{flexDirection: "row", alignItems:'center', marginTop: 5}}>
      <Text style={styles.valueStyle}>RM {" "}</Text>
      <View style={{width:'100%'}}>
        {
            isEdit ? <View style={styles.inputContainerStyle}>
                <TextInput value={changedValue} onChangeText={e => setValue(e)} style={styles.inputStyle} keyboardType={keyboardType}/>
                <Text style={{fontWeight:'600', color: "#000"}} onPress={() => {
                    onSave(changedValue)
                    setEdit(false)
                    }}>Save</Text>
            </View> 
            : <View style={styles.valueContainer}>
                <Text style={styles.valueStyle}>{value}</Text>
                <Text style={{fontWeight:'600',color: "#000"}} onPress={() => setEdit(true)}>Edit</Text>
                </View>
        }
      </View>
      </View>
    </View>
  )
}

export default React.memo(EditableInput)