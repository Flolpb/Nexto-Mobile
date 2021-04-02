import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../../config/colors';

class CustomIconButton extends React.Component {

  render() {
    const { icon, index, onPressButton } = this.props;
    return(
      <TouchableOpacity
        style={styles.insideButton}
        onPress={() => { onPressButton(index) }}>
        <Icon type={icon.type} name={icon.name} color={colors.black} size={20}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  insideButton: {
    flex: 0.5,
    alignItems:'center',
    justifyContent:'center',
  },
});

export default CustomIconButton;
