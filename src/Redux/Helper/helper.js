import AsyncStorage from '@react-native-async-storage/async-storage';
// import Toast from 'react-native-toast-message';
// import {
//   CHANGE_BUTTON_LOADING, CHANGE_LOADER, IS_LOGIN_HOST
// } from './Store/Actions/types';

function Helper(mail) {
  if (
    /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(
      mail,
    )
  ) {
    return true;
  }
  Toast.show({
    text1: 'OOPS!',
    text2: 'Kindly Enter the Valid Email Address',
    position: 'top',
  });
  return false;
}
const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
const getToken = async () => {
  return await AsyncStorage.getItem('token');
  // const parse = JSON.parse(token);
  // return parse.data.token;
};
const getChannelId = async () => {
  return await AsyncStorage.getItem('channelId');
  // const parse = JSON.parse(token);
  // return parse.data.token;
};
const getFCMToken = async () => {
  let myFCMToken = await messaging()
    .getToken()
    .then(fcmToken => {
      if (fcmToken) {
        return fcmToken;
      } else {
        // return null
      }
    });
  return myFCMToken;
};
const onOtherStatus = (result, dispatch) => {
  dispatch({type: CHANGE_BUTTON_LOADING, payload: false});
  dispatch({type: CHANGE_LOADER, payload: false});
  if (result.status == 500) {
    Toast.show({
      text1: 'Something Went wrong!',
      text2: 'kindly try again later ',
      position: 'top',
    });
  } else if (result.status == 404) {
    Toast.show({
      text1: 'OOPS!',
      text2: result.data.message,
      position: 'top',
    });
  } else if (result.status == 401) {
    dispatch({type: IS_LOGIN_HOST, payload: null});
    Toast.show({
      text1: 'OOPS!',
      text2: 'Session Expired',
      position: 'top',
    });
  }
};
const onRejection = (error, dispatch) => {
  dispatch({type: CHANGE_BUTTON_LOADING, payload: false});
  dispatch({type: CHANGE_LOADER, payload: false});
  // alert('helper')
  if (error.message === 'Network request failed') {
    Toast.show({
      text1: 'Internet',
      text2: 'Kindly Check your Internet Connection',
      position: 'top',
    });
  }
};
const hasPermissionIOS = async () => {
  const openSetting = () => {
    Linking.openSettings().catch(() => {
      Alert.alert('Unable to open settings');
    });
  };
  const status = await Geolocation.requestAuthorization('whenInUse');

  if (status === 'granted') {
    return true;
  }

  if (status === 'denied') {
    Alert.alert('Location permission denied');
  }

  if (status === 'disabled') {
    Alert.alert(
      `Turn on Location Services to allow "${appConfig.displayName}" to determine your location.`,
      '',
      [
        {text: 'Go to Settings', onPress: openSetting},
        {text: "Don't Use Location", onPress: () => {}},
      ],
    );
  }

  return false;
};

const get = async () => {
  if (Platform.OS === 'ios') {
    const hasPermission = await hasPermissionIOS();
    if (hasPermission === true) {
      getCurrentLocation();
      setRequestDenied(false);
    }
  } else {
    try {
      permissionCheck += 1;
      let granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
        setRequestDenied(false);
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        ToastAndroid.show(
          'Location permission denied by user.',
          ToastAndroid.LONG,
        );
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        if (permissionCheck === 3) {
          Linking.openSettings().catch(() => {
            Alert.alert('Unable to open settings');
          });
          permissionCheck = 2;
        }
      }
    } catch (error) {
      console.error('error===>', error);
    }
  }
};

const getCurrentLocation = async () => {
  Geolocation.getCurrentPosition(
    position => {
      getAddress(position.coords.latitude, position.coords.longitude);
    },
    error => {
      console.log('map error: ', error);
    },
  );
};

export {
  Helper,
  capitalizeFirstLetter,
  getToken,
  getFCMToken,
  onOtherStatus,
  onRejection,
};
