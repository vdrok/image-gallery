import { put, takeLatest, call, select } from 'redux-saga/effects';

import { GET_IMAGES_SAGA } from '../../constants';
import { setImages, setPageCount } from '../../actions';
import getImages from '../../lib/api';

const getPerPage = state => state.imagesReducer.perPage;

function* workerGetImagesSaga() {
  const images = yield call(getImages);
  const perPage = yield select(getPerPage);
  const pageCount = Math.ceil(images.length / perPage);
  yield put(setPageCount(pageCount));
  yield put(setImages(images));
}

export default function* watchGetImagesSaga() {
  yield takeLatest(GET_IMAGES_SAGA, workerGetImagesSaga);
}
