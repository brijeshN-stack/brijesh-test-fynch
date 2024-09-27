import { all } from 'redux-saga/effects';
import { dashboardSaga } from './dashboardSaga';
import { authSaga } from './authSaga';
import { vehicleSaga } from './vehicleSaga';
import { profileSaga } from './profileSaga';

export default function* rootSaga() {
  yield all([dashboardSaga(), authSaga(), vehicleSaga(), profileSaga()]);
}
