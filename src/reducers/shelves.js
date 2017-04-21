import React from 'react';
import * as types from '../constants/ActionTypes';

const initialState = {}

const shelves = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_SHELF:
      const shelfIndex = state.length + 1;
      const newShelf = { id: 'SHELF #' + shelfIndex, rows: [] }

      return [
        ...state,
        newShelf
      ];

    case types.EDIT_SHELF:      
      let newState = state;
      newState.forEach((obj) => {
        if (obj.id === action.payload.oldId) {
          obj.id = action.payload.newId;
        }
      });

      return newState;
    
    case types.REMOVE_SHELF:
      return state;
    
    case types.RELEASES_FETCH_SUCCESS:
      console.log("Fetched releases: \n", action.payload);
      
      let newShelves = state;

      const objects = action.payload.releases.map(release =>
        ({
          id: release.id,
          content: (
            <div className="release">
              <div className='heavy'>{release.title}</div>
              <div className='light'>Artist(s): {release.artists}</div>
              <div className='light'>Label: {release.label}</div>
              <div className='light'>Year: {release.year}</div>
              <div className='light'>Formats: {release.formats}</div>
            </div>
          ),
        })
      );

      newShelves[0].rows = objects;
      newShelves[1].rows = objects;

      return newShelves;

    default:
      return state;
  }
};

export default shelves;