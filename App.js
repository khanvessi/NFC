/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import Header from './src/Header';
import AdminNavigation from './src/admin/navigators/admin_navigation';
import {View, Text} from 'react-native';

const App = () => {
  return (
    <>
      <View style={{backgroundColor: 'blue'}}>
        <Header />
      </View>

      <AdminNavigation />
    </>
  );
};

export default App;
