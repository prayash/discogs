import * as types from '../constants/ActionTypes';

export const fetchReleases = (user, page) => ({ type: types.RELEASES_FETCH, payload: { user, page } });
export const fetchPage = (page) => ({ type: types.RELEASES_FETCH_NEXT, payload: { page } });

export const editShelf = (oldId, newId) => ({ type: types.EDIT_SHELF, payload: { oldId, newId } });
export const removeShelf = (id) => ({ type: types.REMOVE_SHELF, payload: { id } });
export const renderShelves = () => ({ type: types.RENDER_SHELVES });

export const isLoading = () => ({ type: types.IS_LOADING });
export const doneLoading = () => ({ type: types.DONE_LOADING });