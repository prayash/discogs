import * as types from '../constants/ActionTypes';

export const fetchReleasess = (user, page) => ({ type: types.RELEASES_FETCH, payload: { user, page } });
export const addShelf = () => ({ type: types.ADD_SHELF });
export const editShelf = (oldId, newId) => ({ type: types.EDIT_SHELF, payload: { oldId, newId } });
export const removeShelf = (id) => ({ type: types.REMOVE_SHELF, payload: { id } })