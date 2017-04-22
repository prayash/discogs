import { call, put, takeLatest } from "redux-saga/effects";
import * as actions from '../constants/ActionTypes';
import { apiService } from '../services';

function mapObject(obj) {
  return obj.map(release =>
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
}

function *fetchPage(action) {
  console.log("Fetching page:", action.payload.page);
  try {

    let apiData;
    const currentPage = JSON.parse(localStorage.getItem('pagination'));

    if (!currentPage || action.payload.page > currentPage.page) {
      apiData = yield call(apiService.fetchCollection, action.payload.page);
    } else {
      apiData = {
        pagination: currentPage,
        releases: JSON.parse(localStorage.getItem('releases'))
      }
    }

    const pagination = apiData.pagination;
    const temp = apiData.releases;
    const releases = mapObject(temp);

    const data = { releases, pagination };
    yield put({ type: actions.DONE_LOADING });
    yield put({ type: actions.ADD_SHELF, payload: data });
  } catch (e) {
    yield put({ type: actions.RELEASES_HAS_ERRORED, hasErrored: true });
  }
}

export default function *rootSagas() {
  yield [
    takeLatest(actions.RELEASES_FETCH_NEXT, fetchPage)
  ]
}
