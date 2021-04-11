import React from 'react';
import { StyleSheet, Text } from 'react-native';
import fonts from '../../config/fonts';

const CustomLabel = ({text, size = 25, fontType = 'bold', position = 'center',
                       spaceBetween = 10, additionalStyle = {}, onPressLabel = () => {}}) => (
  <Text
    style={[{ marginVertical: spaceBetween, textAlign: position, fontSize: size, fontFamily: fonts[fontType] }, additionalStyle]}
    onPress={onPressLabel}>
    {text}
  </Text>
)

export default CustomLabel;
