import React from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../config/colors';
import {SearchBar} from 'react-native-elements';
import fonts from '../../config/fonts';

const CustomSearchBar = ({value, onSearch}) => (
    <SearchBar
      inputStyle={ styles.searchBar }
      searchIcon={{ name: 'search', color: colors.black }}
      clearIcon={{ name: 'clear', color: colors.black }}
      inputContainerStyle={ [styles.searchBar, styles.searchBarInput] }
      containerStyle={ styles.searchBar }
      selectionColor={ colors.black }
      value={value}
      placeholder="Rechercher ..."
      placeholderTextColor={ colors.inactiveBlack }
      onChangeText={(text) => { onSearch(text) }}
    />
)

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    borderColor: colors.transparent,
    paddingHorizontal: 10,
    color: colors.black,
    fontFamily: fonts.mediumItalic,
  },
  searchBarInput: {
    backgroundColor: colors.lightgrey,
    borderRadius: 15,
    margin: 5,
  },
})

export default CustomSearchBar;
