import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const COLORS = {
  white: '#fff',
  dark: '#000',
  red: '#F52A2A',
  light: '#F1F1F1',
  green: '#00B761',
  cardColor: '#FAF9FF',
};

const Event = ({event}) => {
  const handleFeedbackClick = () => {
    console.warn('you clicked me!');
  };

  // Extracting data from the event prop
  const {
    eventName,
    description,
    startTime,
    endTime,
    startDate,
    endDate,
    address,
  } = event;

  const formattedStartTime = formatTime(startTime);

  const formattedEndTime = formatTime(endTime);

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);

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
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 17,
          marginTop: 10,
          color: 'blue',
        }}>
        {eventName}
      </Text>
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
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Interested</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Maybe</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.text}>How was your experience?</Text>
        <TouchableOpacity onPress={handleFeedbackClick}>
          <Text style={styles.clickableText}>Give Feedback</Text>
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
    marginTop: 16,
  },
  text: {
    fontSize: 12,
    marginRight: 8,
  },
  clickableText: {
    color: 'blue',
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 16,
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
    height: 270,
    backgroundColor: COLORS.cardColor,
    width: '98%',
    marginHorizontal: 4,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});

export default Event;
