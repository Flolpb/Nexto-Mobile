import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import CustomIconButton from '../../CustomButtons/CustomIconButton/CustomIconButton';

const CustomLabelBackgroundButton = ({text, onPressButton, icon, onPressLabel = () => {} }) => (
  <TouchableOpacity style={styles.field} onPress={onPressLabel}>
    <Text style={styles.textInput}> {text} </Text>
    <CustomIconButton icon={icon} onPressButton={onPressButton} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  field: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 20,
    backgroundColor: colors.lightgrey,
    marginVertical: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  textInput: {
    flex: 4,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
})

export default CustomLabelBackgroundButton;
