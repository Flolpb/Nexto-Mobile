import React from 'react';
import {Button, Dimensions, Image, PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';


class MainPage extends React.Component {
    constructor(props){
        super(props);
    }



    render(){
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require('../../assets/images/logov2.png')}
                        style={[styles.image, { width: Dimensions.get('window').width - 10 }]} />
                </View>
            </View>
        );
    }

}
const styles = StyleSheet.create({
    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        marginVertical: 20,
    },
    container: {
        backgroundColor: colors.backGrey,
        height: '100%',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        resizeMode: 'contain',
    },
});

export default MainPage;
