/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './App';
import SplashScreen from './src/SplashScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => SplashScreen);
