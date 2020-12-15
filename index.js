/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import SyncAdapter from 'react-native-sync-adapter';
import {Component} from 'react';

AppRegistry.registerComponent(appName, () => App);

class Root extends Component {
    componentDidMount() {SyncAdapter.init({
        syncInterval: 5000,
        syncFlexTime: 5000
    });
    }
}

AppRegistry.registerHeadlessTask('TASK_SYNC_ADAPTER', () => SyncShowsTask);
