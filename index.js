/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/index'

const AppRedux = () => (
    <Provider {...{ store }}>
        <SafeAreaProvider>
            <App />
        </SafeAreaProvider>
    </Provider>
);

AppRegistry.registerComponent(appName, () => AppRedux);
