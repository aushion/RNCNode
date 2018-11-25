import {
  AppRegistry
} from 'react-native'
import App from './src/screen/entrance';
import {
  name as appName
} from './app.json';
import './src/utils/disableYellowBox';

AppRegistry.registerComponent(appName, () => App);
