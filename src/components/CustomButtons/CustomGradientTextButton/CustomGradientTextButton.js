import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../../config/colors';

const CustomGradientTextButton = ({title, textColor = colors.white, gradientColors = [colors.lightpurple, colors.purple], size = 15, onPressButton = () => {}}) => (
  <LinearGradient
    colors={gradientColors}
    start={{x: 0.0, y: 1.0}} end={{x: 1.0, y: 1.0}}
    style={styles.buttonView}
  >
    <TouchableOpacity
      style={styles.button}
      onPress={onPressButton}>
      <Text style={{ color: textColor, fontSize: size }}> {title} </Text>
    </TouchableOpacity>
  </LinearGradient>
)

const styles = StyleSheet.create({
  buttonView: {
    flexDirection:'row',
    borderRadius: 30,
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

export default CustomGradientTextButton;
