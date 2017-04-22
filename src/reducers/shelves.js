import React from 'react';
import * as types from '../constants/ActionTypes';

const initialState = [];

const shelves = (state = initialState, action) => {
  switch (action.type) {

    case types.ADD_SHELF:
      const shelfIndex = state.length + 1;
      const newShelf = { id: 'DISCOGS SHELF #' + shelfIndex, rows: [] };
      const addedShelfContent = action.payload.releases.map(release =>
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
      
      newShelf.rows = addedShelfContent;

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
      console.log(action.payload.id);
      return state.filter(shelf => shelf.id !== action.payload.id);

    default:
      return state;
  }
};

export default shelves;