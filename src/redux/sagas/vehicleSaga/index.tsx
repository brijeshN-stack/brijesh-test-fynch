import { takeLatest } from 'redux-saga/effects';
import { sagaActions } from '@/redux/actions';
import {
  addVehicleSaga,
  deleteVehicleSaga,
  fetchLookupVehicleInformationSaga,
  fetchModalitiesSaga,
  fetchVehicleClassSaga,
  fetchVehiclesSaga,
  vehiclePrioritySaga,
} from '@/redux/sagas/vehicleSaga/sagas';

export function* vehicleSaga() {
  yield takeLatest(sagaActions.GET_VEHICLE_REQUEST, fetchVehiclesSaga);
  yield takeLatest(sagaActions.ADD_VEHICLE_REQUEST, addVehicleSaga);
  yield takeLatest(sagaActions.DELETE_VEHICLE, deleteVehicleSaga);
  yield takeLatest(sagaActions.SET_VEHICLE_PRIORITY, vehiclePrioritySaga);
  yield takeLatest(sagaActions.GET_MODALITIES_REQUEST, fetchModalitiesSaga);
  yield takeLatest(sagaActions.GET_VEHICLE_CLASS, fetchVehicleClassSaga);
  yield takeLatest(sagaActions.GET_LOOKUP_VEHICLE_INFORMATION, fetchLookupVehicleInformationSaga);
}
