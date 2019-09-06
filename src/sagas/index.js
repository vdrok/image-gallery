import { all, fork } from 'redux-saga/effects';

import watchGetImagesSaga from './watchers/getImages';

export default function* root() {
  yield all([fork(watchGetImagesSaga)]);
}
