import {
  CREATE_EVENT,
  SHOW_EVENTS_DETAIL,
  SIGN_IN,
  SIGN_UP,
} from '../../Action/Types/index';
const initialState = {
  eventData: [],
  status: '',
  data: {},
};

export default (state = initialState, {type, payload}) => {
  // console.log('******* FROM REDUCER: ', payload);
  switch (type) {
    case SHOW_EVENTS_DETAIL:
      return {
        ...state,
        eventData: payload,
      };
    case SIGN_UP:
      return {
        ...state,
        status: payload,
      };
    case SIGN_IN:
      return {
        ...state,
        status: payload,
      };
    case CREATE_EVENT:
      return {
        ...state,
        status: payload,
      };
    default:
      return state;
  }
};
