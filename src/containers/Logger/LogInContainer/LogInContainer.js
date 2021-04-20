import React from 'react'
import {
    StyleSheet,
    View,
    Image,
    Dimensions, Text, PermissionsAndroid,
} from 'react-native';
import colors from '../../../config/colors';
import CustomGradientTextButton from '../../../components/CustomButtons/CustomGradientTextButton/CustomGradientTextButton';
import CustomTextInput from '../../../components/CustomTextInputs/CustomTextInput/CustomTextInput';
import CustomLabel from '../../../components/CustomLabel/CustomLabel/CustomLabel';

class LogInContainer extends React.Component{

    constructor(props)
    {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.askPermission();
    }

    setKeyValue = (key, value) => {
        this.setState({
            [key]: value,
        });
    };

    askPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS
            );
            const grantedWrite = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS
            );
            const grantedSendSMS = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.SEND_SMS,
                {
                    title: 'Nexto Send SMS Permission',
                    message: 'Nexto needs access to send sms',
                }
            );

        } catch (err) {
            console.warn(err)
        }
    };

    render(){
        const { navigation } = this.props;
        return(
          // <ImageBackground
          //   style={{ width: Dimensions.get('window').width, }}
          //   imageStyle={{ opacity: 0.80 }}
          //   source={require('../../assets/images/fond.png')}>
            <View style={styles.mainContainer}>
                <View style={styles.imageContainer}>
                    <Image
                      source={require('../../../assets/images/logov2.png')}
                      style={[styles.image, { width: Dimensions.get('window').width - 50 }]} />
                </View>

                <View style={styles.subContainer}>
                    <CustomTextInput value={this.state.username} placeholder="Identifiant" isMultiline="false"
                                     onChangeTextInput={(text) => this.setKeyValue('username', text)} />

                    <CustomTextInput value={this.state.mail} placeholder="Adresse-mail" isMultiline="false"
                                     onChangeTextInput={(text) => this.setKeyValue('mail', text)} />

                    <View style={{marginTop: 20}}>
                        <CustomGradientTextButton title="Connexion"
                                                  onPressButton={() => this.props.onLogIn(this.state.username)}
                        />
                    </View>

                    <CustomLabel
                      text="Vous n’avez pas de compte ? Inscrivez-vous"
                      fontType="light"
                      size={16}
                      additionalStyle={{
                          fontStyle: 'italic', textDecorationLine: 'underline'
                      }}
                      onPressLabel={() => navigation.navigate('NewAccountContainer')} />
                </View>
            </View>
          // </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexGrow: 1,
        justifyContent: 'space-evenly',
        backgroundColor: colors.backGrey,
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
    subContainer: {
        flex: 1,
        paddingHorizontal: 30,
        marginVertical: 20,
    },
});

export default LogInContainer
