import {View, FlatList, Pressable} from 'react-native';
import {useEffect} from 'react';
import Event from '../components/Event';
import {connect} from 'react-redux';
import {createUser, fetchEventData, login} from '../Redux/Action/EventsActions';
import {requestUserPermission} from '../utils/pushnotification_helper';

const EventsScreen = ({navigation, ...props}) => {
  const {eventData, status} = props.event;

  console.log('---- IN EVENTSCREEN-- ', eventData);

  // useEffect(() => {
  //   props.fetchUserData();
  //   requestUserPermission();
  // }, [props.fetchUserData]);
  useEffect(() => {
    props.login();
  }, [props.login]);

  useEffect(() => {
    console.log('CALLED FETCHEVENTDATA');
    props.fetchEventData();
  }, [props.event.status]);

  // useEffect(() => {
  //   console.log("called 2");
  //   if(status != true){
  //     console.warn("SIGNED UP!")
  //   }
  // }, [status]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'yellow',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
      }}>
      <FlatList
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: 'transparent',
        }}
        data={eventData?.data}
        renderItem={({item}) => (
          <Pressable
            onPress={() => navigation.navigate('SubEventsScreen', item)}>
            <Event event={item} />
          </Pressable>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

// export default EventsScreen;

const mapStateToProps = ({event}) => ({
  event,
});

export default connect(mapStateToProps, {login, createUser, fetchEventData})(
  EventsScreen,
);
