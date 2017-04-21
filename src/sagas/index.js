import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../constants/ActionTypes';
import { apiService } from '../services';

// Worker Saga: will be fired on TODOS_FETCH actions
function *fetchReleases() {
  try {
    // Only hit the API if the data isn't already stored in localStorage!
    if (!localStorage.getItem('releases')) {
      console.info('Retrieving data from Discogs API.');

      const releases = yield call(apiService.fetchCollection);
      yield put({ type: actions.RELEASES_FETCH_SUCCESS, payload: releases });
    } else {
      console.info('Retrieving data from local storage.');

      const pagination = JSON.parse(localStorage.getItem('pagination'));
      const temp = JSON.parse(localStorage.getItem('releases'));

      const releases = temp.map(release =>
        ({
          id: release.id,
          title: release.basic_information.title,
          artists: release.basic_information.artists.reduce((acc, artist, index, arr) =>
            acc
            + artist.name
            + (index + 1 === arr.length ? '' : ', '), ''),
          label: release.basic_information.labels[0].name,
          year: release.basic_information.year,
          formats: release.basic_information.formats.reduce((acc, format, index, arr) =>
            acc
            + format.name
            + (index + 1 === arr.length ? '' : ', '), '')
        })
      );

      const data = { releases, pagination };

      yield put({ type: actions.RELEASES_FETCH_SUCCESS, payload: data })
    }
  } catch (e) {
    yield put({ type: actions.RELEASES_HAS_ERRORED, hasErrored: true });
  }
}

export default function *rootSagas() {
  yield [
    takeLatest(actions.RELEASES_FETCH, fetchReleases),
  ]
}
