import React from 'react';
import * as types from '../constants/ActionTypes';

const initialState = {}

const pagination = (state = initialState, action) => {
  switch (action.type) {

    case types.RELEASES_FETCH_SUCCESS:
      return action.payload.pagination;

    default:
      return state;
  }
};

export default pagination;