import React from 'react';
import { StyleSheet, Text } from 'react-native';

const CustomLabel = ({text, size = 25, position = 'center'}) => (
  <Text style={[styles.title, { fontSize: size, textAlign: position }]}>
    {text}
  </Text>
)

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    fontWeight: 'bold',
  },
});

export default CustomLabel;
