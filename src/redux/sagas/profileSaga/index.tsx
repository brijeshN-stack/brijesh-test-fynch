import { takeEvery, takeLatest } from 'redux-saga/effects';
import { sagaActions } from '@/redux/actions';
import {
  addHomeAddressesSaga,
  deleteAddressSaga,
  fetchGooglePlaceAutocompleteLatLngSaga,
  fetchGooglePlaceAutocompleteSaga,
  fetchHomeAddressesSaga,
  fetchOfficeAddress,
  fetchOfficeDefaultAddress,
  fetchProfileDetails,
  fetchSubscriptionDetails,
  updateProfileDetailsSaga,
} from '@/redux/sagas/profileSaga/sagas';

export function* profileSaga() {
  yield takeLatest(sagaActions.GET_PROFILE_DETAILS, fetchProfileDetails);
  yield takeLatest(sagaActions.GET_SUBSCRIPTION_DETAILS, fetchSubscriptionDetails);
  yield takeLatest(sagaActions.UPDATE_PROFILE, updateProfileDetailsSaga);
  yield takeLatest(sagaActions.GET_OFFICE_ADDRESS, fetchOfficeAddress);
  yield takeLatest(sagaActions.GET_OFFICE_DEFAULT_ADDRESS, fetchOfficeDefaultAddress);
  yield takeLatest(sagaActions.GET_GOOGLE_PLACES_AUTOCOMPLETE_SUGGESTION, fetchGooglePlaceAutocompleteSaga);
  yield takeLatest(sagaActions.GET_GOOGLE_PLACES_AUTOCOMPLETE_LAT_LNG, fetchGooglePlaceAutocompleteLatLngSaga);
  yield takeLatest(sagaActions.ADD_HOME_ADDRESS, addHomeAddressesSaga);
  yield takeEvery(sagaActions.GET_HOME_ADDRESS, fetchHomeAddressesSaga);
  yield takeLatest(sagaActions.DELETE_USER_ADDRESS, deleteAddressSaga);
}
