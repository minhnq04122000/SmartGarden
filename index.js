import { registerRootComponent } from 'expo';
import { Constants } from 'react-native-unimodules';

import App from './App';
import Home from './src/screens/HomePage';
import Login from './src/screens/LoginScreen';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
