import { takeLatest } from 'redux-saga/effects';
import { sagaActions } from '@/redux/actions';
import {
  getMonthlyTripSaga,
  deleteAdditionalTripSaga,
  getTripsByDateSaga,
  addDefaulTripSaga,
  updateDefaultTripSaga,
  addDefaultwfoTrip,
  deleteDefaultWfoTrip,
  addBusinessTripSaga,
  updateAdditionalTripSaga,
  getGoogleAutocomplete,
  collectAddressDetailsFromSelectedAddress,
  getPlaceDetailsFromSelectedAddress,
  getExpenseReportSaga,
  submitExpenseReportSaga,
  addCarpoolInTripSaga,
  submitwpmExpenseReportSaga,
} from '@/redux/sagas/dashboardSaga/sagas';

export function* dashboardSaga() {
  yield takeLatest(sagaActions.GET_MONTHLY_TRIPS, getMonthlyTripSaga);
  yield takeLatest(sagaActions.ADD_DEFAULT_TRIP_FROM_CALENDAR, addDefaulTripSaga);
  yield takeLatest(sagaActions.ADD_WFO_DEFAULT_TRIP, addDefaultwfoTrip);
  yield takeLatest(sagaActions.DELETE_WFO_DEFAULT_TRIP, deleteDefaultWfoTrip);
  yield takeLatest(sagaActions.UPDATE_DEFAULT_TRIP, updateDefaultTripSaga);
  yield takeLatest(sagaActions.ADD_BUSINESS_TRIP_ACTION, addBusinessTripSaga);
  yield takeLatest(sagaActions.GET_TRIPS_BY_DATE, getTripsByDateSaga);
  yield takeLatest(sagaActions.DELETE_USER_TRIP, deleteAdditionalTripSaga);
  yield takeLatest(sagaActions.UPDATE_ADDITIONAL_TRIP, updateAdditionalTripSaga);
  yield takeLatest(sagaActions.ADD_CARPOOL_IN_TRIP, addCarpoolInTripSaga);
  yield takeLatest(sagaActions.GET_GOOGLE_AUTOCOMPLETE, getGoogleAutocomplete);
  yield takeLatest(sagaActions.GET_BOTHSIDE_GOOGLE_ADDRESS_DETAILS, collectAddressDetailsFromSelectedAddress);
  yield takeLatest(sagaActions.GET_SINGLESIDE_GOOGLE_ADDRESS_DETAILS, getPlaceDetailsFromSelectedAddress);
  yield takeLatest(sagaActions.GET_EXPENSE_REPORTS, getExpenseReportSaga);
  yield takeLatest(sagaActions.SUBMIT_EXPENSE_REPORTS, submitExpenseReportSaga);
  yield takeLatest(sagaActions.SUBMIT_WPM_EXPENSES, submitwpmExpenseReportSaga);
}
