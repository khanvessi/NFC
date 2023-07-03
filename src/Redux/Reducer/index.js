import { combineReducers } from 'redux';
import event from './EventsSlice/index'


const RootReducer = combineReducers({
  event,
});

export default (state, action) =>
  RootReducer(state, action);
