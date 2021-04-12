import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../../../config/colors';

const CustomTextButton = ({title, color = colors.white, background = colors.purple, size = 15, onPressButton = () => {}}) => (
  <View style={[styles.buttonView, { backgroundColor: background, borderColor: background }]}>
    <TouchableOpacity
      style={styles.button}
      onPress={onPressButton}>
      <Text style={{ color: color, fontSize: size }}> {title} </Text>
    </TouchableOpacity>
  </View>
)

const styles = StyleSheet.create({
  buttonView: {
    flexDirection:'row',
    borderWidth: 1,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    fontSize: 20,
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: 15,
  },
});

export default CustomTextButton;
