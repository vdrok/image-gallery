import { put, takeLatest, call } from 'redux-saga/effects';

import { GET_IMAGES_SAGA } from '../../constants';
import { setImages } from '../../actions';
import getImages from '../../lib/api';

function* workerGetImagesSaga() {
  const images = yield call(getImages);
  yield put(setImages(images));
}

export default function* watchGetImagesSaga() {
  yield takeLatest(GET_IMAGES_SAGA, workerGetImagesSaga);
}
