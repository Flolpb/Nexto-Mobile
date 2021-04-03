import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import colors from '../../../config/colors';
import {Icon} from 'react-native-elements';

class CustomTextModal extends React.Component {

  state = {
    modalVisible: false,
  }

  render() {
    const { visible, setKeyValue, title, icon } = this.props;
    return(
      <Portal>
        <Modal visible={visible}
               onDismiss={() => setKeyValue('modalVisible', false)}
               contentContainerStyle={styles.container}>
          {
            icon && (
              <Icon type="material" name={icon} color={colors.black} size={100}/>
            )
          }
          <Text style={styles.title}> {title} </Text>
        </Modal>
      </Portal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white'
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomTextModal;
