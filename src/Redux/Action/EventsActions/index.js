import Toast from 'react-native-toast-message';
// import store from '..';
import {baseUrl} from '../../../Config/config';
import {getToken, getChannelId} from '../../Helper/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CHANGE_LOADER, SHOW_EVENTS_DETAIL, SIGN_IN, SIGN_UP} from '../Types';
import store from '../../Store';
export const fetchUserData = () => {
  return async dispatch => {
    try {
      console.warn('It was okay!');
      var requestOptions = {
        method: 'GET',
      };

      // var requestOptions = {
      //     method: 'GET',
      //     headers: {
      //       Authorization: 'Bearer ' + token,
      //     },
      //   };

      let eventData = await fetch(baseUrl + 'posts', requestOptions).then(
        response =>
          response.json().then(data => ({status: response.status, data})),
      );

      // let eventData = await fetch(
      //     baseUrl + 'api/host/booked-ads',
      //   requestOptions,
      // ).then(response =>
      //   response.json().then(data => ({ status: response.status, data })),
      // );
      let arr = eventData; //will check my respone
      dispatch({type: SHOW_EVENTS_DETAIL, payload: eventData});
      if (arr != null) {
        console.warn('It was okay!');
        dispatch({type: SHOW_EVENTS_DETAIL, payload: arr});
      }
      if (eventData.status == 200) {
        console.warn('It was okay!');
        dispatch({type: SHOW_EVENTS_DETAIL, payload: arr});
      } else {
        //   onOtherStatus(userData, dispatch);
        console.warn('Something wrong happened');
      }
      // dispatch({ type: CHANGE_LOADER, payload: false });
    } catch (error) {
      // onRejection(error, dispatch);
      console.warn('Some Exception occured');
    }
  };
};

export const createUser = () => {
  var data = {
    userName: 'khan.vessi',
    organization: 'khankhan',
    email: 'khan.vesss2@gmail.com',
    password: 'khankhan',
    confirmPassword: 'khankhan',
    roleId: '63218c8b35d3c25e4a9f44f2',
    channelId: '632193d3ec65d553a4df3bda',
    isMarketingConsent: false,
    tagName: '5AED9315AED9315AED9315AED9315AED9315AED931',
  };

  return async dispatch => {
    // let token = await getToken();
    try {
      // dispatch({ type: CHANGE_BUTTON_LOADING, payload: true });

      // var formdata = new FormData();
      // formdata.append('userName', "khan.vessi");
      // formdata.append('organization', "khankhan");
      // formdata.append('email', "khan.vessi2@gmail.com");
      // formdata.append('password', "khankhan");
      // formdata.append('confirmPassword', "khankhan");
      // formdata.append('roleId', "63218c8b35d3c25e4a9f44f2");
      // formdata.append('channelId', "632193d3ec65d553a4df3bda");
      // formdata.append('isMarketingConsent', false);
      // formdata.append('tagName', "5AED9315AED9315AED9315AED9315AED9315AED931");

      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Optionally, you can add the authorization header here if needed
          // 'Authorization': 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      };

      let userData = await fetch(
        baseUrl + 'auth/create-account',
        requestOptions,
      ).then(response =>
        response.json().then(data => ({status: response.status, data})),
      );

      console.log('===== USER DATA ===== : ', userData);
      if (userData.status >= 200) {
        if (userData?.success == false) {
          console.log('signup error');
        } else {
          console.warn('created user');
          dispatch({type: SIGN_UP, payload: userData?.success});
        }
      } else {
        // onOtherStatus(userData, dispatch);
        console.warn('STATUS WAS NOT 200 OR ABOVE');
      }
    } catch (error) {
      console.warn(error);
    }
  };
};

export const fetchEventData = () => {
  // console.log('CALLED FETCHEVENTDATA AGAIN');

  var data = {
    page: 1,
    limit: 100,
  };
  return async dispatch => {
    // console.log('CALLED FETCHEVENTDATA AGAIN AGAIN');
    let token = await getToken();
    // console.log('STORED TOKEN -> ', token);

    try {
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify(data),
      };

      let eventData = await fetch(
        baseUrl + 'event/get-all-events',
        requestOptions,
      ).then(response =>
        response.json().then(data => ({status: response.status, data})),
      );

      // console.log('===== EVENT DATA ===== : ', eventData);
      if (eventData.status >= 200) {
        const dataArray = eventData.data.data.data;
        // console.log(dataArray);

        if (eventData?.success == false) {
          console.log('signup error');
        } else {
          dispatch({
            type: SHOW_EVENTS_DETAIL,
            payload: eventData?.data?.data?.data,
          });
        }
      } else {
        // onOtherStatus(eventData, dispatch);
        console.warn('STATUS WAS NOT 200 OR ABOVE');
      }
    } catch (error) {
      console.log(error);
      // console.warn(error)
    }
  };
};

export const createEvent = eventData => {
  return async dispatch => {
    let token = await getToken();

    let channelId = await AsyncStorage.getItem('channelId');
    try {
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          channelId: channelId,
        },
        body: JSON.stringify(eventData),
      };
      // console.log('just data', JSON.stringify(eventData));
      // console.log('sam', requestOptions);

      let response = await fetch(
        baseUrl + 'event/create-event',
        requestOptions,
      ).then(response =>
        response.json().then(data => ({status: response.status, data})),
      );

      // console.log('===== CREATE EVENT DATA ===== : ', response);
      if (response.status >= 200) {
        if (response?.success == false) {
          console.log('create event error!');
        } else {
          let temp = store.getState().event.eventData;
          let temp1 = response?.data?.data;
          console.log('--- RESULT FROM CREATING EVENT' + JSON.stringify(temp));

          console.log('--- RESULT FROM CREATING EVENT 22' + temp1);

          console.log('--- COMBINED RESULT FROM CREATING EVENT 2222' + temp);

          temp.unshift(temp1);

          console.log('Updated Array:::', temp);

          const parsedData = JSON.parse(temp);

          // console.log(
          //   '--- COMBINED RESULT FROM CREATING EVENT 2222' + dataArray,
          // );
          dispatch({
            type: SHOW_EVENTS_DETAIL,
            payload: parsedData,
          });
        }
      } else {
        // onOtherStatus(eventData, dispatch);
        console.warn('STATUS WAS NOT 200 OR ABOVE');
      }
    } catch (error) {
      console.log(error);
      // console.warn(error)
    }
  };
};

export const deleteEvent = eventData => {
  return async dispatch => {
    let token = await getToken();

    let channelId = await AsyncStorage.getItem('channelId');
    try {
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          channelId: channelId,
        },
        body: JSON.stringify(eventData),
      };

      let response = await fetch(
        baseUrl + 'event/delete-event',
        requestOptions,
      ).then(response =>
        response.json().then(data => ({status: response.status, data})),
      );

      console.log('===== DELETED EVENT DATA ===== : ', response);
      if (response.status >= 200) {
        if (response?.success == false) {
          console.log('create event error!');
        } else {
          console.log('event deleted');

          let temp = store.getState().event.eventData;
          let deletedEvent = response?.data?.data;
          temp = temp.filter(event => event._id !== deletedEvent._id);
          // console.log('--- RESULT FROM CREATING EVENT' + JSON.stringify(temp));

          // console.log('--- RESULT FROM CREATING EVENT 22' + temp1);

          // console.log('--- COMBINED RESULT FROM CREATING EVENT 2222' + temp);

          // temp.unshift(temp1);

          console.log('Updated Array:::', temp);

          // const parsedData = JSON.parse(temp);

          // console.log(
          //   '--- COMBINED RESULT FROM CREATING EVENT 2222' + dataArray,
          // );
          dispatch({
            type: SHOW_EVENTS_DETAIL,
            payload: temp,
          });
        }
      } else {
        // onOtherStatus(eventData, dispatch);
        console.warn('STATUS WAS NOT 200 OR ABOVE');
      }
    } catch (error) {
      console.log(error);
      // console.warn(error)
    }
  };
};

export const login = () => {
  var data = {
    email: 'khan.vess3@gmail.com',
    password: 'khankhan',
    fcmToken: '',
  };
  return async dispatch => {
    try {
      var requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      let userData = await fetch(
        baseUrl + 'auth/authenticate',
        requestOptions,
      ).then(response =>
        response.json().then(data => ({status: response.status, data})),
      );

      console.log('===== LOGIN DATA ===== : ', userData);
      if (userData.status >= 200) {
        if (userData?.success == false) {
          console.log('signup error');
        } else {
          await AsyncStorage.setItem(
            'token',
            userData?.data?.data?.access_token,
          );
          console.log(
            'CHANNEL ID: ===>> ',
            userData?.data?.data?.user?.channel?._id,
          );
          await AsyncStorage.setItem(
            'channelId',
            userData?.data?.data?.user?.channel?._id,
          );
          console.log('==== TOKEN =====', userData?.data?.data?.access_token);
          dispatch({
            type: SIGN_IN,
            payload: userData?.data?.data?.access_token,
          });
        }
      } else {
        // onOtherStatus(userData, dispatch);
        console.warn('STATUS WAS NOT 200 OR ABOVE');
      }
    } catch (error) {
      console.warn(error);
    }
  };
};
