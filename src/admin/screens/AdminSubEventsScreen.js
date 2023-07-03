const {View, FlatList, Text} = require('react-native');
import AdminEventComponent from '../../components/AdminEventComponent';

const AdminSubEventsScreen = ({navigation, route}) => {
  const event = route.params;

  const children = event?.childrens;
  console.log('--- EVENT DETAILS  --', event);
  console.log('--- CHILD EVENT  --', children);
  return (
    <>
      <AdminEventComponent event={event} />

      {children && children.length > 0 ? (
        <View>
          <Text>SubEvents</Text>
        </View>
      ) : (
        <View>
          <Text>No SubEvents</Text>
        </View>
      )}

      <View>
        <FlatList
          style={{
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: 'transparent',
          }}
          data={children}
          renderItem={({item}) => <AdminEventComponent event={item} />}
          keyExtractor={item => item._id}
        />
      </View>
    </>
  );
};

export default AdminSubEventsScreen;
