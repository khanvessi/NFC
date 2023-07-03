import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Pressable, Text, View} from 'react-native';
import EventsScreen from '../screens/EventsScreen';
import Notifications from '../screens/Notifications';
import SubEventsScreen from '../screens/SubEventsScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { selectedNumberOfItems } from './store/cartSlice';
import {MaterialCommuityIcons} from 'react-native-vector-icons';
import Header from '../Header';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  // const numberOfSelectedItems = useSelector(selectedNumberOfItems);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'transparent',
        bordeTopRightRadius: 20,
        borderBottomLeftRadius: 30,
      }}>
      <NavigationContainer>
        <Stack.Navigator
          // screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
          screenOptions={{header: () => null}}>
          <Stack.Screen
            name="EventsScreen"
            component={EventsScreen}
            options={{
              headerTitle: () => <Header name="Events" />,
              headerRight: () => (
                <View>
                  <Pressable style={{marginLeft: 15}}>
                    {/* <MaterialCommuityIcons name='dot -vertical' size={28} color='#000'/> */}
                    <FontAwesome name="ellipsis-vertical" size={28} />
                  </Pressable>
                </View>
              ),
              headerStyle: {
                height: 150,
                bordeTopRightRadius: 50,
                borderTopLeftRadius: 50,
                backgroundColor: '#00e4d0',
                shadowColor: '#000',
                elevation: 25,
              },
            }}
          />
          <Stack.Screen
            name="SubEventsScreen"
            component={SubEventsScreen}

            // options={{ presentation: 'modal' }}
          />
          <Stack.Screen name="Notifications" component={Notifications} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default Navigation;
