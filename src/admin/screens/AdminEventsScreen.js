import React, {useState} from 'react';
import {
  View,
  FlatList,
  Pressable,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  DatePickerIOS,
  DateTimePickerAndroid,
} from 'react-native';

import {Picker} from '@react-native-picker/picker';

import {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  createUser,
  fetchEventData,
  login,
  createEvent,
} from '../../Redux/Action/EventsActions';
import {requestUserPermission} from '../utils/pushnotification_helper';
import AdminEventComponent from '../../components/AdminEventComponent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

const AdminEventsScreen = ({navigation, ...props}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [timeZone, setTimeZone] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedEndTime, setSelectedEndTime] = useState('');

  const [selectedTimeZone, setSelectedTimeZone] = useState('');

  const formatDate = date => {
    const options = {day: '2-digit', month: 'short', year: 'numeric'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const formatTime = time => {
    const options = {hour: '2-digit', minute: '2-digit', hour12: true};
    return new Intl.DateTimeFormat('en-US', options).format(time);
  };

  const formatDateForAPI = date => {
    console.log('===DATE===', date);
    const monthMap = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12',
    };

    const parts = date.split(' ');
    const day = parts[1].replace(',', '');
    const month = monthMap[parts[0]];
    const year = parts[2];

    // Format the date as YYYY-MM-DDTHH:mm:ss.SSSZ
    const formattedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`);

    return formattedDate.toISOString();
  };

  // // {"address": "adfadf",
  // "description": "adfadfa",
  // "endDate": "2023-07-03T00:00:00.000Z",
  // "endTime": "2023-07-03T13:55:00.000Z",
  // "eventName": "afadfad",
  // "startDate": "2023-07-03T00:00:00.000Z",
  // "startTime": "2023-07-03T13:55:00.000Z",
  // "timeZone": "Africa/Bissua"}

  //  {"address": "adfadf",
  //  "description": "adfadfa",
  //   "endDate": "2023-07-03T00:00:00.000Z",
  //    "endTime": "2023-07-03T13:55:00.000Z",
  //     "eventName": "afadfadee",
  //      "parentEventId": "",
  //      "startDate": "2023-07-03T00:00:00.000Z",
  //       "startTime": "2023-07-03T13:55:00.000Z",
  //  "timezone": "Africa/Bissua"}

  const formatTimeForAPI = timeString => {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);

    let formattedHours = hours;
    if (period === 'PM' && hours !== 12) {
      formattedHours += 12;
    } else if (period === 'AM' && hours === 12) {
      formattedHours = 0;
    }

    const formattedTime = new Date();
    formattedTime.setUTCHours(formattedHours);
    formattedTime.setUTCMinutes(minutes);
    formattedTime.setUTCSeconds(0);
    formattedTime.setUTCMilliseconds(0);
    return formattedTime.toISOString();
  };

  const handleSave = async () => {
    console.log('===DATES===', startDate, endDate, startTime, endTime);
    // const formattedStartDate = formatDateForAPI(startDate);
    // const formattedEndDate = formatDateForAPI(endDate);
    // const formattedStartTime = formatTimeForAPI(startTime);
    // const formattedEndTime = formatTimeForAPI(endTime);
    // Perform save logic here
    const createEventData = {
      eventName,
      // startDate: formattedStartDate,
      startDate: '2022-10-30T19:00:00.000Z',
      // endDate: formattedEndDate,
      endDate: '2022-10-30T19:00:00.000Z',
      // startTime: formattedStartTime,
      startTime: '1899-12-31T09:00:00Z',
      parentEventId: '',
      // endTime: formattedEndTime,
      endTime: '1899-12-31T09:00:00Z',
      timezone: 'Africa/Bissua',
      address: 'adfad',
      description: 'adfadf',
    };

    console.log('---- IN EVENTSCREEN-- ', createEventData);

    props.createEvent(createEventData);

    setModalVisible(false);
  };

  const {eventData, status} = props.event;

  // console.log('---- IN EVENTSCREEN-- ', eventData);

  const timeZones = [
    'GMT',
    'EST',
    'PST',
    // Add more time zone options as needed
  ];

  useEffect(() => {
    console.warn('##### EVENT DATA :');
  }, [eventData]);

  useEffect(() => {
    props.login();
  }, [props.login]);

  useEffect(() => {
    console.log('CALLED FETCHEVENTDATA');
    props.fetchEventData();
  }, [props.event.status]);

  return (
    <>
      {/* DATE PICKER */}
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={(event, date) => {
            if (date) {
              const formattedDate = formatDate(date); // Implement the formatDate function according to your needs
              setSelectedDate(formattedDate);
              setStartDate(formattedDate); // Update the start date state
            }
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)} // Handle cancel event
        />
      )}

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
          onChange={(event, date) => {
            if (date) {
              const formattedDate = formatDate(date); // Implement the formatDate function according to your needs
              setSelectedEndDate(formattedDate);
              setEndDate(formattedDate); // Update the start date state
            }
            setShowDatePicker(false);
          }}
          onCancel={() => setShowDatePicker(false)} // Handle cancel event
        />
      )}

      {/* TIME PICKER */}

      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, time) => {
            if (time) {
              const formattedTime = formatTime(time); // Implement the formatTime function according to your needs
              setSelectedTime(formattedTime);
              setStartTime(formattedTime); // Update the start time state
            }
            setShowTimePicker(false);
          }}
          onCancel={() => setShowTimePicker(false)} // Handle cancel event
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, time) => {
            if (time) {
              const formattedTime = formatTime(time); // Implement the formatTime function according to your needs
              setSelectedEndTime(formattedTime);
              setEndTime(formattedTime); // Update the start time state
            }
            setShowTimePicker(false);
          }}
          onCancel={() => setShowTimePicker(false)} // Handle cancel event
        />
      )}

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        {/* CONTAINER  */}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Event</Text>

            {/* EVENT NAME */}

            <TextInput
              style={styles.input}
              placeholder="Event Name"
              value={eventName}
              onChangeText={text => setEventName(text)}
            />

            {/* DATE */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View
                style={{
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '49%',
                  marginRight: 6,
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  position: 'relative',
                }}>
                <TextInput
                  style={{paddingLeft: 1}}
                  placeholder="Start Date"
                  value={startDate}
                  onChangeText={text => setStartDate(text)}
                />
                <FontAwesome
                  onPress={() => setShowDatePicker(true)}
                  name="calendar"
                  size={17}
                  style={{position: 'absolute', right: 5, color: 'gray'}}
                />
              </View>

              <View
                style={{
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: 'gray',
                  width: '49%',
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  position: 'relative',
                }}>
                <TextInput
                  style={{paddingLeft: 1}}
                  placeholder="End Date"
                  value={endDate}
                  onChangeText={text => setEndDate(text)}
                />
                <FontAwesome
                  onPress={() => setShowDatePicker(true)}
                  name="calendar"
                  size={17}
                  style={{position: 'absolute', right: 5, color: 'gray'}}
                />
              </View>
            </View>

            {/* TIME */}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <View
                style={{
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '49%',
                  marginRight: 6,
                  borderColor: 'gray',
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  position: 'relative',
                }}>
                <TextInput
                  style={{paddingLeft: 1}}
                  placeholder="Start Time"
                  value={startTime}
                  onChangeText={text => setStartTime(text)}
                />
                <FontAwesome
                  onPress={() => setShowTimePicker(true)}
                  name="calendar"
                  size={17}
                  style={{position: 'absolute', right: 5, color: 'gray'}}
                />
              </View>

              <View
                style={{
                  height: 40,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderColor: 'gray',
                  width: '49%',
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingHorizontal: 10,
                  position: 'relative',
                }}>
                <TextInput
                  style={{paddingLeft: 1}}
                  placeholder="End Time"
                  value={endTime}
                  onChangeText={text => setEndTime(text)}
                />
                <FontAwesome
                  onPress={() => setShowTimePicker(true)}
                  name="calendar"
                  size={17}
                  style={{position: 'absolute', right: 5, color: 'gray'}}
                />
              </View>
            </View>

            {/* TIME ZONE */}

            <View style={styles.dropdownContainer}>
              <Picker
                style={styles.dropdown}
                selectedValue={timeZone}
                onValueChange={text => setTimeZone(text)}>
                {timeZones.map(zone => (
                  <Picker.Item key={zone} label={zone} value={zone} />
                ))}
              </Picker>
            </View>

            {/* ADDRESS */}

            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={text => setAddress(text)}
            />

            {/* DESCRIPTION */}
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={text => setDescription(text)}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={{color: 'white'}}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* EVENT DETAILS & CREATE EVENT */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <Text
          style={{
            fontSize: 22,
            color: '#000000',
            fontWeight: 'bold',
            margin: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Event Details
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: 'blue',
            padding: 10,
            borderRadius: 5,
            margin: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            Create Event
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        <FlatList
          style={{
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            backgroundColor: 'transparent',
          }}
          data={eventData}
          renderItem={({item}) => (
            <Pressable
              onPress={() => navigation.navigate('SubEventsScreen', item)}>
              <AdminEventComponent event={item} />
            </Pressable>
          )}
          keyExtractor={item => item._id}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    height: 40,
    marginBottom: 10,
    justifyContent: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 40,
    color: 'black',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  dataInput: {
    height: 40,
    width: '48%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// export default EventsScreen;

const mapStateToProps = ({event}) => ({
  event,
});

export default connect(mapStateToProps, {
  login,
  createUser,
  fetchEventData,
  createEvent,
})(AdminEventsScreen);
