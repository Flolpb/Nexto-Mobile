import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import colors from '../../../config/colors';
import fonts from '../../../config/fonts';

const CustomLabelButton = ({ text, size = 16, spaceBetween = 10}) => (
  <View style={[styles.field, { marginVertical: spaceBetween }]}>
    <Text style={[styles.text, { fontSize: size }]}> {text} </Text>
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
  text: {
    flex: 4,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
})

export default CustomLabelButton;
