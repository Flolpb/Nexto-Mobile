import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../../../config/colors';

const CustomIconButton = ({icon, color = colors.black, size = 20, onPressButton, index = null}) => (
    <TouchableOpacity
      style={styles.insideButton}
      onPress={() => { onPressButton(index) }}>
      <Icon type={icon.type} name={icon.name} color={color} size={size}/>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
  insideButton: {
    flex: 0.5,
    alignItems:'center',
    justifyContent:'center',
  },
});

export default CustomIconButton;
