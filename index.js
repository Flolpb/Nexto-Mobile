/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import SyncAdapter from 'react-native-sync-adapter';
import {Component} from 'react';
import PushNotification from 'react-native-push-notification'
import {Platform} from 'react-native';


PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
    {
        channelId: "localId", // (required)
        channelName: "Local channel", // (required)
        channelDescription: "A channel to categorise your local notifications", // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
);

AppRegistry.registerComponent(appName, () => App);

class Root extends Component {
    componentDidMount() {SyncAdapter.init({
        syncInterval: 5000,
        syncFlexTime: 5000
    });
    }
}

AppRegistry.registerHeadlessTask('TASK_SYNC_ADAPTER', () => SyncShowsTask);
