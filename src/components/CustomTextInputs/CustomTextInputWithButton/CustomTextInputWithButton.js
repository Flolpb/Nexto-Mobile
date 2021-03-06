import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import CustomIconButton from '../../CustomButtons/CustomIconButton/CustomIconButton';

const CustomTextInputWithButton = ({value, onChangeTextInput, icon, onPressButton, isMultiline = 'true', isPassword = 'false', placeholder = '', placeholderColor = colors.inactiveBlack}) => (
  <View style={styles.field}>
    <TextInput
      style={styles.textInput}
      multiline={isMultiline === 'true'}
      secureTextEntry={isPassword === 'true'}
      value={value}
      placeholderTextColor={placeholderColor}
      onChangeText={(text) => onChangeTextInput(text)}
      placeholder={placeholder}/>
    <CustomIconButton icon={icon} onPressButton={onPressButton} />
  </View>
)

const styles = StyleSheet.create({
  field: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 20,
    backgroundColor: colors.lightgrey,
    fontSize: 20,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 4,
    fontSize: 15,
    fontFamily: fonts.light,
  },
})

export default CustomTextInputWithButton;
