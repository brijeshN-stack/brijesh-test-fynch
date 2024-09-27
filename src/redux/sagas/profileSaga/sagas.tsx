import { call, put } from 'redux-saga/effects';
import { sagaActions } from '@/redux/actions';
import { callApi } from '@/redux/axiosUtil';
import { authLoadingHandler, callReSubscribe, doLoginRedirect, redirectToVerifyOTP } from '@/redux/slices/authSlice';
import {
  getOfficeAddresses,
  getOfficeDefaultAddress,
  getProfileDetails,
  updateProfileDetails,
  getSubscriptionDetails,
  profileLoader,
  getUserHomeAddress,
  googlePlacesAutocomplete,
  googlePlacesAutocompleteLatLng,
  getStationGooglePlaceAutocomplete,
  stationAddressAutocompleteLatLng,
  getUserStationAddress,
  getLicenseConfigDetails,
} from '@/redux/slices/profileSlice';
import { getIdToken, triggerErrorMessage, triggerSuccessMessage } from '@/utils/helpers';
import { SUBSCRIPTION_DETAILS, successMessages } from '@/utils/constants';
import {
  DELETE_USER_ADDRESS,
  GET_ADDRESS_DETAILS,
  GET_ADDRESS_SUGGESTION,
  GET_OFFICE_ADDRESS_URL,
  GET_OFFICE_DEFAULT_ADDRESS_URL,
  PROFILE_URL,
  USER_ADDRESSES,
  USER_PRIMARY_SUBSCRIPTIONS_URL,
} from '@/utils/url';
import axios from 'axios';
import { handleSubmitExpenseVisibility } from '@/redux/slices/tripsSlice';
import { removeTokenFromCookies, saveTokenToCookies } from '@/app/actions';

export function* fetchProfileDetails(state: any): Generator<any, void, any> {
  const sendData = {
    url: PROFILE_URL(),
    method: 'GET',
  };
  try {
    yield put(profileLoader(true));
    const response = yield call(callApi, sendData);
    yield put(getProfileDetails(response?.data));
    yield put(profileLoader(false));
  } catch (error) {
    triggerErrorMessage(error);
    yield put(profileLoader(false));
  }
}

export function* updateProfileDetailsSaga(state: any): Generator<any, void, any> {
  const { profileDetailsData } = state;
  const sendData = {
    url: PROFILE_URL(),
    method: 'PATCH',
    data: profileDetailsData,
  };
  try {
    yield put(profileLoader(true));
    const response = yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.profile_updated_successfully);
    yield put(updateProfileDetails(response?.data));
    if (response.status === 204) {
      yield put({ type: sagaActions.GET_PROFILE_DETAILS });
    }
    yield put(profileLoader(false));
  } catch (error) {
    yield put(profileLoader(false));
    triggerErrorMessage(error);
  }
}

const removeToken = () => {
  return new Promise<void>(resolve => {
    removeTokenFromCookies();
    resolve();
  });
};

const saveToken = (token: any) => {
  return new Promise<void>(resolve => {
    saveTokenToCookies(token);
    resolve();
  });
};
export function* fetchSubscriptionDetails(state: any): Generator<any, void, any> {
  const sendData = {
    url: USER_PRIMARY_SUBSCRIPTIONS_URL,
    method: 'GET',
  };

  try {
    // yield put(authLoadingHandler(true));
    const response = yield call(callApi, sendData);
    if (response.data.hasOwnProperty('license')) {
      if (response?.data?.license && Object.keys(response.data.license).length !== 0 && response.data.license.constructor === Object) {
        const token = yield call(getIdToken);
        yield call(saveToken, token);
        yield put(doLoginRedirect(true));
        const allowedType = ['bundle', 'api', 'manual'];
        if (allowedType.includes(response?.data?.license?.expense_report)) {
          yield put(handleSubmitExpenseVisibility(true));
        }
      }
    }
    yield put(getSubscriptionDetails(response?.data));
    localStorage.setItem(SUBSCRIPTION_DETAILS, JSON.stringify(response?.data));
    if (
      response?.data?.license?.config &&
      Object.keys(response.data.license.config).length !== 0 &&
      response.data.license.config.constructor === Object
    ) {
      yield put(getLicenseConfigDetails(response.data.license.config));
    }
    yield put(authLoadingHandler(false));
  } catch (error: any) {
    yield put(authLoadingHandler(false));
    const status = error?.response?.status;
    if (status === 404) {
      yield call(removeToken);
      // yield put(redirectToVerifyOTP(true));
      yield put(callReSubscribe(true));
    }
    if (status !== 404) {
      triggerErrorMessage(error);
    }
  }
}

export function* fetchOfficeAddress(state: any): Generator<any, void, any> {
  const sendData = {
    url: GET_OFFICE_ADDRESS_URL(),
    method: 'GET',
  };
  try {
    yield put(profileLoader(true));
    const response = yield call(callApi, sendData);
    yield put(getOfficeAddresses(response?.data?.items));
    yield put(profileLoader(false));
  } catch (error) {
    yield put(profileLoader(false));
    triggerErrorMessage(error);
  }
}

export function* fetchOfficeDefaultAddress(state: any): Generator<any, void, any> {
  const { addressId } = state;
  const sendData = {
    url: GET_OFFICE_DEFAULT_ADDRESS_URL(addressId),
    method: 'GET',
  };
  try {
    yield put(profileLoader(true));
    const response = yield call(callApi, sendData);
    yield put(getOfficeDefaultAddress(response?.data));
    yield put(profileLoader(false));
  } catch (error: any) {
    const status = error?.response?.status;
    yield put(profileLoader(false));
    if (status !== 404) {
      triggerErrorMessage(error);
    }
  }
}

export function* fetchGooglePlaceAutocompleteSaga(state: any): Generator<any, void, any> {
  const { query, typeHome, typeStation } = state;
  const url = GET_ADDRESS_SUGGESTION(query);
  try {
    const response = yield axios.get(url);
    if (response.data.hasOwnProperty('error_message')) {
      triggerErrorMessage(null, undefined, response?.data?.error_message);
    } else if (typeHome) {
      yield put(googlePlacesAutocomplete(response?.data?.predictions));
    } else if (typeStation) {
      yield put(getStationGooglePlaceAutocomplete(response?.data?.predictions));
    }
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}
export function* fetchGooglePlaceAutocompleteLatLngSaga(state: any): Generator<any, void, any> {
  const { placeId, typeHome, typeStation } = state;
  const url = GET_ADDRESS_DETAILS(placeId);
  try {
    const response = yield axios.get(url);
    if (typeHome) {
      yield put(googlePlacesAutocompleteLatLng(response?.data?.result?.geometry));
    } else if (typeStation) {
      yield put(stationAddressAutocompleteLatLng(response?.data?.result?.geometry));
    }
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* addHomeAddressesSaga(state: any): Generator<any, void, any> {
  const { addressObj } = state;
  const { type } = addressObj;
  const sendData = {
    url: USER_ADDRESSES(),
    method: 'POST',
    data: addressObj,
  };
  try {
    const response = yield call(callApi, sendData);
    if (type === 'home') {
      yield put(getUserHomeAddress([response?.data]));
      yield put(googlePlacesAutocompleteLatLng(null));
    } else if (type === 'station') {
      yield put(getUserStationAddress([response?.data]));
      yield put(stationAddressAutocompleteLatLng(null));
    }
  } catch (error) {
    triggerErrorMessage(error);
  }
}

export function* fetchHomeAddressesSaga(state: any): Generator<any, void, any> {
  const { typeOfAddress } = state;
  const sendData = {
    url: USER_ADDRESSES(typeOfAddress),
    method: 'GET',
  };
  try {
    const response = yield call(callApi, sendData);
    if (typeOfAddress === 'home') {
      yield put(getUserHomeAddress(response?.data?.items));
    } else if (typeOfAddress === 'station') {
      yield put(getUserStationAddress(response?.data?.items));
    }
  } catch (error) {
    triggerErrorMessage(error);
  }
}

export function* deleteAddressSaga(state: any): Generator<any, void, any> {
  const { addressObj } = state;
  const { addressId, type } = addressObj;
  const sendData = {
    url: DELETE_USER_ADDRESS(addressId),
    method: 'DELETE',
  };
  try {
    const response = yield call(callApi, sendData);
    if (type === 'home') {
      yield put(getUserHomeAddress(response?.data));
    } else if (type === 'station') {
      yield put(getUserStationAddress(response?.data));
    }
  } catch (error) {
    triggerErrorMessage(error);
  }
}
