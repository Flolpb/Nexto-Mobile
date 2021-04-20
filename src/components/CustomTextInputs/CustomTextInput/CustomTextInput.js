import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';

const CustomTextInput = ({value, onChangeTextInput, spaceBetween = 20, isMultiline = 'true', isPassword = 'false', placeholder = '', placeholderColor = colors.inactiveBlack}) => (
  <View style={[styles.field, { marginVertical: spaceBetween }]}>
    <TextInput
      style={styles.textInput}
      multiline={isMultiline === 'true'}
      secureTextEntry={isPassword === 'true'}
      value={value}
      placeholderTextColor={placeholderColor}
      onChangeText={(text) => onChangeTextInput(text)}
      placeholder={placeholder}/>
  </View>
)

const styles = StyleSheet.create({
  field: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 20,
    backgroundColor: colors.lightgrey,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 4,
    fontSize: 15,
    fontFamily: fonts.light,
  },
})

export default CustomTextInput;
