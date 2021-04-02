import React from 'react';
import {Menu} from 'react-native-paper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import colors from '../../config/colors';
import VARS from '../../config/vars';
import {Icon} from 'react-native-elements';

class CustomDropdownButton extends React.Component {

  state = {
    menuVisible: false,
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  render() {
    const { index, vars, onPressOption } = this.props;
    return(
      <View style={styles.insideButton}>
        <Menu style={styles.menu}
              visible={this.state.menuVisible}
              onDismiss={() => {this.setKeyValue('menuVisible', false)}}
              anchor={
                <View>
                  <TouchableOpacity
                    onPress={() => { this.setKeyValue('menuVisible', true) }}>
                    <Icon type="material" name="more-vert" color={colors.black} size={20}/>
                  </TouchableOpacity>
                </View>
              }
        >
          {
            vars.map((item) => {
              return <Menu.Item
                title={item.label}
                key={item.value}
                disabled={!item.value}
                onPress={() => {
                  onPressOption(index, item.value);
                  this.setKeyValue('menuVisible', false);
                }}
              />
            })
          }
        </Menu>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  menu: {
    paddingTop: 65,
    alignContent: 'center',
  },
  menuItem: {
    width: 200,
  },
  insideButton: {
    flex: 0.5,
    alignItems:'center',
    justifyContent:'center',
  },
});

export default CustomDropdownButton;
