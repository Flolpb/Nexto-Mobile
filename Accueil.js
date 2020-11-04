import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';


function Accueil({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Nexto</Text>
            <Button
                title="Go to Message..."
                onPress={() => navigation.navigate('Message')}
            />
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
        backgroundColor: 'rgba(0,0,0,0.8)',
        height: '100%',
    },
});

export default Accueil;
