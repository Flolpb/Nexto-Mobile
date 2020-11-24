import SmsAndroid from 'react-native-get-sms-android';

module.exports = async (taskData) => {
    sendAutoSMS();
};

function sendAutoSMS() {
    SmsAndroid.autoSend(
        '0623256356',
        'test hein',
        (fail) => {
            console.log('failed with error: '+ fail);
        },
        (success) => {
            console.log('SMS sent successfully');
        }
    );
}
