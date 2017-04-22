import * as types from '../constants/ActionTypes';

const initialState = {}

const pagination = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_SHELF:
      return action.payload.pagination;

    default:
      return state;
  }
};

export default pagination;