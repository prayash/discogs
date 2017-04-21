import * as types from '../constants/ActionTypes';

export const fetchReleasess = () => ({ type: types.RELEASES_FETCH });
export const addShelf = () => ({ type: types.ADD_SHELF });
export const editShelf = (oldId, newId) => ({ type: types.EDIT_SHELF, payload: { oldId, newId } });