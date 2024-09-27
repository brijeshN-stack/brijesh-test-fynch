import { call, put } from 'redux-saga/effects';
import { sagaActions } from '@/redux/actions';
import { callApi } from '@/redux/axiosUtil';
import { handlePageLoading } from '@/redux/slices/pageLoader';
import {
  addVehicle,
  addVehicleSuccess,
  deleteVehicle,
  deleteVehicleSuccess,
  dialogLoader,
  getLookupVehicleInformation,
  getModalities,
  getVehicleClasses,
  getVehicles,
  setVehiclePriority,
  vehiclesLoader,
} from '@/redux/slices/vehiclesSlice';
import { triggerErrorMessage, triggerSuccessMessage } from '@/utils/helpers';
import { nl, successMessages } from '@/utils/constants';
import {
  DELETE_VEHICLE,
  GET_LOOKUP_VEHICLE_INFORMATION,
  GET_MODALITIES,
  GET_VEHICLE_CLASS,
  VEHICLES_URL,
  VEHICLE_PRIORITY,
} from '@/utils/url';

export function* fetchVehiclesSaga(state: any): Generator<any, void, any> {
  const sendData = {
    url: VEHICLES_URL(),
    method: 'GET',
  };
  try {
    yield put(handlePageLoading(true));
    const response = yield call(callApi, sendData);
    if (response.status === 200) {
      yield put(getVehicles(response?.data?.items));
    }
    yield put(handlePageLoading(false));
  } catch (error) {
    yield put(handlePageLoading(false));
    triggerErrorMessage(error);
  }
}

export function* addVehicleSaga(state: any): Generator<any, void, any> {
  const { vehicleData } = state;
  const sendData = {
    url: VEHICLES_URL(),
    method: 'POST',
    data: vehicleData,
  };
  try {
    yield put(dialogLoader(true));
    const response = yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.vehicle_added_successfully);
    yield put(addVehicle(response?.data));
    yield put(dialogLoader(false));
    yield put(addVehicleSuccess(true));
  } catch (error) {
    yield put(dialogLoader(false));
    triggerErrorMessage(error);
  }
}

export function* deleteVehicleSaga(state: any): Generator<any, void, any> {
  const { vehicle_id } = state;
  const sendData = {
    url: DELETE_VEHICLE(vehicle_id),
    method: 'DELETE',
  };
  try {
    yield put(dialogLoader(true));
    const response = yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.vehicle_deleted_successfully);
    yield put(deleteVehicle(vehicle_id));
    yield put(dialogLoader(false));
    yield put(deleteVehicleSuccess(response?.status));
  } catch (error) {
    yield put(dialogLoader(false));
    triggerErrorMessage(error);
  }
}

export function* vehiclePrioritySaga(state: any): Generator<any, void, any> {
  const { mergedVehiclePriority } = state;
  const sendData = {
    url: VEHICLE_PRIORITY(),
    method: 'PUT',
    data: mergedVehiclePriority,
  };
  try {
    yield put(handlePageLoading(true));
    const response = yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.vehicle_priority_updated_successfully);
    yield put(setVehiclePriority(response.status));
    if (response.status === 204) {
      yield put({ type: sagaActions.GET_VEHICLE_REQUEST });
    }
    yield put(handlePageLoading(false));
  } catch (error) {
    yield put(handlePageLoading(false));
    triggerErrorMessage(error);
  }
}

export function* fetchModalitiesSaga(state: any): Generator<any, void, any> {
  const sendData = {
    url: GET_MODALITIES(),
    method: 'GET',
  };
  try {
    const response = yield call(callApi, sendData);
    if (response.status === 200) {
      yield put(getModalities(response?.data?.items));
    }
  } catch (error) {
    triggerErrorMessage(error);
  }
}

export function* fetchVehicleClassSaga(state: any): Generator<any, void, any> {
  const sendData = {
    url: GET_VEHICLE_CLASS(nl),
    method: 'GET',
  };
  try {
    const response = yield call(callApi, sendData);
    if (response.status === 200) {
      yield put(getVehicleClasses(response?.data?.items));
    }
  } catch (error) {
    triggerErrorMessage(error);
  }
}

export function* fetchLookupVehicleInformationSaga(state: any): Generator<any, void, any> {
  const { registration } = state;
  const sendData = {
    url: GET_LOOKUP_VEHICLE_INFORMATION({ country: 'nl', registration }),
    method: 'GET',
  };
  try {
    yield put(dialogLoader(true));
    const response = yield call(callApi, sendData);
    if (response.status === 200) {
      yield put(getLookupVehicleInformation(response?.data));
    }
    yield put(dialogLoader(false));
  } catch (error) {
    yield put(dialogLoader(false));
    triggerErrorMessage(error);
  }
}
