import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

class CustomDropdownModal extends React.Component {

  state = {
    modalVisible: false,
  }

  render() {
    const { visible, setKeyValue, title, vars, onSelectOption } = this.props;
    return(
      <Portal>
        <Modal visible={visible}
               onDismiss={() => setKeyValue('modalVisible', false)}
               contentContainerStyle={styles.container}>
          <FlatList
            ListHeaderComponent={ <Text style={styles.title}> {title} </Text> }
            data={vars}
            keyExtractor={(item, index) => index.toString() }
            renderItem={({item, index}) => (
              <TouchableOpacity style={styles.item} onPress={() => {
                onSelectOption(item.value);
                setKeyValue('modalVisible', false);
              }}>
                <Text style={styles.textItem}> {item.label} </Text>
              </TouchableOpacity>
            )}/>
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
  item: {
    paddingVertical: 13,
  },
  textItem: {
    fontSize: 18
  },
});

export default CustomDropdownModal;
