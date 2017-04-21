import { combineReducers } from 'redux';
import shelves from './shelves';
import pagination from './pagination';

export default combineReducers({
  shelves,
  pagination
});
