import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {deleteEvent} from '../Redux/Action/EventsActions';

const COLORS = {
  white: '#fff',
  dark: '#000',
  red: '#F52A2A',
  light: '#F1F1F1',
  green: '#00B761',
  cardColor: '#FAF9FF',
};

const AdminEventComponent = ({event, ...props}) => {
  const handleFeedbackClick = () => {
    console.warn('you clicked me!');
  };

  // Extracting data from the event prop
  const {
    eventName,
    _id,
    description,
    startTime,
    endTime,
    startDate,
    endDate,
    address,
    summary,
  } = event;

  const data = {
    eventId: _id,
  };

  const formattedStartTime = formatTime(startTime);

  const formattedEndTime = formatTime(endTime);

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

  // console.log('---- SUMMARY --- ', summary[0].totalUser);

  function formatTime(time) {
    const date = new Date(time);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  function formatDate(date) {
    const options = {day: 'numeric', month: 'short', year: 'numeric'};
    return new Date(date).toLocaleDateString(undefined, options);
  }

  return (
    <View style={styles.card}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 17,
            marginTop: 10,
            marginRight: 4,
            color: 'blue',
          }}>
          {eventName}
        </Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Confirmation',
              'Are you sure you want to delete this event?',
              [
                {
                  text: 'No',
                  style: 'cancel',
                },
                {
                  text: 'Yes',
                  style: 'destructive',
                  onPress: () => props.deleteEvent(data),
                },
              ],
            );
          }}>
          <FontAwesome
            name="trash"
            size={14}
            style={{
              fontWeight: 'bold',
              marginTop: 10,
            }}
          />
        </TouchableOpacity>
      </View>
      <Text style={{marginTop: 10}}>{description}</Text>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', marginEnd: 5}}>
          <FontAwesome5 name="clock" size={18} style={{marginEnd: 5}} />
          <Text style={{fontWeight: 'bold', fontSize: 12}}>
            {formattedStartTime} - {formattedEndTime}
          </Text>
        </View>
        <View style={{flexDirection: 'row', marginEnd: 30}}>
          <FontAwesome name="calendar" size={18} style={{marginEnd: 5}} />
          <Text style={{fontWeight: 'bold', fontSize: 12}}>
            {formattedStartDate} - {formattedEndDate}
          </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', margin: 5}}>
        <FontAwesome5 name="map-pin" size={18} style={{marginEnd: 5}} />
        <Text style={{fontWeight: 'bold', fontSize: 12}}>{address}</Text>
      </View>

      <View style={styles.btnContainer}>
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryLabel}>Admin</Text>
          <Text style={styles.summaryValue}>
            {summary && summary[0] && summary[0].Admin !== undefined
              ? summary[0].Admin
              : 0}
          </Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryLabel}>Attendees</Text>
          <Text style={styles.summaryValue}>
            {summary && summary[0] && summary[0].Admin !== undefined
              ? summary[0].Attendees
              : 0}
          </Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text style={styles.summaryLabel}>Total</Text>
          <Text style={styles.summaryValue}>
            {summary && summary[0] && summary[0].Admin !== undefined
              ? summary[0].totalUser
              : 0}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          margin: 14,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 12,
          }}>
          Send Message
        </Text>
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.text}>Tap to see user feedback!</Text>
        <TouchableOpacity onPress={handleFeedbackClick}>
          <Text style={styles.clickableText}>View Feedback</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ... styles and other constants ...

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 56,
    marginTop: 3,
  },
  text: {
    fontSize: 12,
    marginRight: 5,
  },
  clickableText: {
    color: 'blue',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  button: {
    flex: 1,
    backgroundColor: '#E5F2FF',
    borderRadius: 8,
    paddingVertical: 12,
    marginHorizontal: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },

  card: {
    backgroundColor: COLORS.cardColor,
    width: '98%',
    marginHorizontal: 4,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    alignSelf: 'flex-start',
    alignSelf: 'baseline',
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 17,
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  summaryLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  summaryValue: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});

const mapStateToProps = ({}) => ({});

export default connect(mapStateToProps, {
  deleteEvent,
})(AdminEventComponent);
