import * as types from '../constants/ActionTypes';

const initialState = true;

const loading = (state = initialState, action) => {
  switch (action.type) {

    case types.IS_LOADING:
      return true;

    case types.DONE_LOADING:
      return false;

    default:
      return state;
  }
};

export default loading;
