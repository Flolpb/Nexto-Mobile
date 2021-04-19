import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';
import CustomIconButton from '../../CustomButtons/CustomIconButton/CustomIconButton';

const CustomLabelBackgroundButton = ({text, onPressButton, icon }) => (
  <View style={styles.field}>
    <Text style={styles.textInput}> {text} </Text>
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
