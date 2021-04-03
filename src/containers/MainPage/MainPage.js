import React from 'react';
import {Button, Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import colors from '../../config/colors';


function MainPage({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                  source={require('../../assets/images/logoNormal.png')}
                  style={[styles.image, { width: Dimensions.get('window').width - 100 }]} />
            </View>
        </View>
    );
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
