import React from 'react';
import {View, StyleSheet, SafeAreaView, FlatList, Text, Button} from 'react-native';
import {Avatar, Icon, SearchBar} from 'react-native-elements';
import colors from '../../../config/colors';
import CustomSearchBar from '../../../components/CustomSearchBar/CustomSearchBar';
import CustomMediumGradientAvatar
  from '../../../components/CustomAvatars/CustomMediumGradientAvatar/CustomMediumGradientAvatar';
import fonts from '../../../config/fonts';
import LibraryHelper from '../../../helpers/LibraryHelper/LibraryHelper';
import LibraryItem from '../../../components/LibraryItem/LibraryItem';
import {connect} from 'react-redux';
import CustomLabel from '../../../components/CustomLabel/CustomLabel/CustomLabel';
import API from '../../../config/api';

class ListLibraryContainer extends React.Component {

  state = {
    search: '',
    emptyError: true,
    libraries: [],
  }

  componentDidMount() {
    if (this.props.userID) {
      this.getAllUserLibraries();
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    if (prevProps.userID !== this.props.userID) {
      this.getAllUserLibraries();
    }
  }

  getAllUserLibraries = async () => {
    const params = {
      user: this.props.userID,
    };

    LibraryHelper.getAllLibraries(params).then(r => {
      if (!r) {
        this.setKeyValue('emptyError', true);
      } else {
        this.setKeyValue('emptyError', false);
        const action = { type: "STORE_LIBRARIES", libraries: r};
        this.props.dispatch(action);
      }
    });
  }

  deleteLibrary = async (id) => {
    LibraryHelper.deleteLibrary(id).then(r => {
      const action = { type: "REMOVE_LIBRARY", id: id};
      this.props.dispatch(action);
      console.log(this.props.libraries)
    });
  }

  setKeyValue = (key, value) => {
    this.setState({
      [key]: value,
    });
  }

  createEmptyViewList = () => {
      {
        return this.state.emptyError ? (
          <View style={ styles.emptyView }>
            <Text style={ styles.emptyTag }>Erreur de chargement.</Text>
            <CustomMediumGradientAvatar titleOrIcon={{ type: 'icon', value: { name: 'refresh', type: 'material' }}} onPressAvatar={() => this.getAllUserLibraries()} />
          </View>
        ) : (
          <View style={ styles.emptyView }>
            <Icon type="material-community" name="bookshelf" size={75}/>
            <Text style={ styles.emptyTag }>Aucune bibliothèque</Text>
          </View>
        )
      }
  };

  createListHeader = () => {
    const { lastAddedLibrary } = this.props;
    return(
      <>
        { this.createSearchBar() }
        {
          lastAddedLibrary && !this.state.search && (
            <>
              <View style={{ marginHorizontal: 20 }}>
                <CustomLabel text={"Dernière bibliothèque ajoutée"} position="left" />
              </View>
              {
                this.props.selectionFromMessage ? (
                  <LibraryItem item={lastAddedLibrary} onPressItem={() => this.selectLibrary(lastAddedLibrary)} />
                ) : (
                  <LibraryItem item={lastAddedLibrary} />
                )
              }
            </>
          )
        }
        {
          !this.state.search && (
            <View style={{ marginHorizontal: 20 }}>
              <CustomLabel text={"Mes bibliothèques"} position="left" />
            </View>
          )
        }
      </>
    )
  };

  createSearchBar = () => {
    return (
      <CustomSearchBar value={this.state.search} onSearch={this.searchFilter} />
    )
  };

  searchFilter = (text) => {
    if (text) {
      const { libraries } = this.props;
      let filteredLibraries;
      filteredLibraries = libraries.filter(item => {
        return item.name.toUpperCase().indexOf(text.toUpperCase()) > -1;
      });
      this.setState({
        search: text,
        filteredLibraries: filteredLibraries
      });
    } else {
      this.setState({
        search: text,
        filteredLibraries: undefined
      });
    }
  };

  selectLibrary = (library) => {
    this.props.setChosenLibrary(library);
    this.props.navigation.navigate('GlobalMessageContainer');
  }

  render() {
    let { navigation } = this.props;
    const libraries = this.state.filteredLibraries ? this.state.filteredLibraries : this.props.libraries;
    return (
      <>
        <SafeAreaView
          style={styles.container}>
          <FlatList
            initialNumToRender="10"
            maxToRenderPerBatch="10"
            contentContainerStyle={styles.flatList}
            ListHeaderComponent={this.createListHeader}
            ListEmptyComponent={this.createEmptyViewList}
            data={libraries}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item, index}) => {
              return this.props.selectionFromMessage ? (
                <LibraryItem key={index} item={item} onPressItem={() => this.selectLibrary(item)} />
              ) : (
                <LibraryItem key={index} item={item} onPressIconButton={() => this.deleteLibrary(item.id)} />
              )
            }
            }/>
          {
            !this.props.selectionFromMessage && (
              <View style={ styles.createButton }>
                <CustomMediumGradientAvatar titleOrIcon={{ type: 'icon', value: { name: 'add', type: 'material' }}} onPressAvatar={() => navigation.navigate("CreateBibliotheque")} />
              </View>
            )
          }
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGrey,
    flexGrow: 1
  },
  flatList: {
    minHeight: '100%',
  },
  createButton: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  separator: {
    flex: 1,
    marginRight: 30,
    marginLeft: 20,
    borderBottomColor: colors.black,
    borderBottomWidth: 0.35,
  },
  emptyView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTag: {
    fontSize: 30,
    fontFamily: fonts.medium,
    color: colors.black,
    marginVertical: 20,
    paddingHorizontal: 5,
    textAlign: 'center'
  },
  searchBar: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 0,
    borderWidth: 0,
    borderColor: colors.transparent,
    paddingHorizontal: 10,
    color: colors.black
  },
  searchBarInput: {
    backgroundColor: '#E6E4E2',
    borderRadius: 30,
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  field: {
    flexDirection:'row',
    borderWidth: 1,
    borderColor: colors.lightgrey,
    borderRadius: 20,
    backgroundColor: colors.lightgrey,
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  textInput: {
    flex: 4,
    fontSize: 15,
    fontFamily: fonts.light,
  },
})

const mapStateToProps = (state) => {
  return {
    lastAddedLibrary: state.manageLibraries.lastAddedLibrary,
    libraries: state.manageLibraries.libraries,
    userID: state.toggleLogIn.userID,
  }
};

export default connect(mapStateToProps)(ListLibraryContainer);

