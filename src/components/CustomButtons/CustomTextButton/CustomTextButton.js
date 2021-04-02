import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../../../config/colors';

class CustomTextButton extends React.Component {

  render() {
    const { title, onPressButton } = this.props;
    return(
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={styles.button}
          onPress={onPressButton}>
          <Text style={styles.text}> {title} </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonView: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: colors.purple,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.purple,
    color: colors.white,
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
  text: {
    color: colors.white,
    fontSize: 15
  }
});

export default CustomTextButton;
