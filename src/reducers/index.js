import { combineReducers } from 'redux';
import loading from './loading';
import shelves from './shelves';
import pagination from './pagination';

export default combineReducers({
  loading,
  shelves,
  pagination
});
