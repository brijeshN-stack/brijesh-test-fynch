import axios from 'axios';
import { call, put, select } from 'redux-saga/effects';
import { callApi } from '@/redux/axiosUtil';
import {
  addAdditionalTrip,
  addDefaultTrip,
  addTripSuccessResponse,
  deleteAdditionalTrip,
  deleteDefaultTrip,
  dialogLoadingHandler,
  getEndLocationAddressDetails,
  getGoogleStartLocationAddressSuggestion,
  getGoogleEndLocationAddressSuggestion,
  getMonthlyTrips,
  getStartLocationAddressDetails,
  getTripsByDate,
  updateAdditionalTrip,
  triggerBothAddressCollected,
  getExpenseReport,
  submitExpenseReportSuccess,
  addCarpoolInTripSuccess,
} from '@/redux/slices/tripsSlice';
import {
  ADD_DEFAULT_TRIP,
  MONTH_TRIPS,
  DELETE_TRIPS,
  SUBMIT_EXPENSE,
  TRIPS_BY_DATE,
  UPDATE_TRIP,
  ADD_WFO_DEFAULT_TRIP,
  ADD_BUSINESS_TRIP,
  CREATE_RETURN_BUSINESS_TRIP,
  GET_ADDRESS_SUGGESTION,
  GET_ADDRESS_DETAILS,
  EXPENSE_REPORTS,
  SUBMIT_WPM_EXPENSE_REPORT,
} from '@/utils/url';
import { getFirstAndLastDateOfMonth, triggerErrorMessage, triggerSuccessMessage } from '@/utils/helpers';
import { sagaActions } from '@/redux/actions';
import { successMessages } from '@/utils/constants';
import { handlePageLoading } from '@/redux/slices/pageLoader';

export function* getMonthlyTripSaga(state: any): Generator<any, void, any> {
  const { since_date, until_date } = state;
  const sendData = {
    url: MONTH_TRIPS({ since_date, until_date }),
    method: 'GET',
  };
  try {
    // yield put(calendarLoadingHandler(true))
    yield put(handlePageLoading(true));
    const response = yield call(callApi, sendData);
    const data = response?.data?.items;
    yield put(getMonthlyTrips(data ? data : []));
    // yield put(calendarLoadingHandler(false))
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* getTripsByDateSaga(state: any): Generator<any, void, any> {
  const { date } = state;
  const sendData = {
    url: TRIPS_BY_DATE({ date }),
    method: 'GET',
  };
  try {
    // yield put(addTripSectionLoadingHandler(true))
    yield put(handlePageLoading(true));
    const response = yield call(callApi, sendData);
    const data = response?.data?.items;
    yield put(getTripsByDate(data ? data : []));
    // yield put(addTripSectionLoadingHandler(false))
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* deleteAdditionalTripSaga(state: any): Generator<any, void, any> {
  const tripByDate = yield select(state => state.tripReducer.trips);
  const { trip_id, startDate } = state;
  const sendData = {
    url: DELETE_TRIPS({ trip_id }),
    method: 'DELETE',
  };
  try {
    yield put(handlePageLoading(true));
    yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.trip_deleted_successfully);
    yield put(deleteAdditionalTrip(trip_id));
    if (tripByDate.length === 1) {
      const { formattedFirstDate, formattedLastDate } = getFirstAndLastDateOfMonth(startDate);
      yield put({ type: sagaActions.GET_MONTHLY_TRIPS, since_date: formattedFirstDate, until_date: formattedLastDate });
    }
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* addDefaulTripSaga(state: any): Generator<any, void, any> {
  const { date, data } = state;

  const sendData = {
    url: ADD_DEFAULT_TRIP({ date }),
    method: 'PATCH',
    data,
  };
  try {
    // yield put(calendarLoadingHandler(true))
    yield put(handlePageLoading(true));
    yield call(callApi, sendData);
    const addData = {
      ...data,
      date: date,
    };
    triggerSuccessMessage(successMessages.wfh_is_marked);
    yield put(addDefaultTrip(addData));
    // yield put(calendarLoadingHandler(false))
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* updateDefaultTripSaga(state: any): Generator<any, void, any> {
  const { data, date } = state;

  const sendData = {
    url: ADD_DEFAULT_TRIP({ date }),
    method: 'PATCH',
    data,
  };
  try {
    yield put(handlePageLoading(true));
    yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.wfh_is_unmarked);
    const addData = {
      ...data,
      date: date,
    };
    yield put(deleteDefaultTrip(addData));
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* addDefaultwfoTrip(state: any): Generator<any, void, any> {
  const { date, data } = state;
  const sendData = {
    url: ADD_WFO_DEFAULT_TRIP({ date }),
    method: 'POST',
    data,
  };
  try {
    yield put(handlePageLoading(true));
    yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.wfo_is_marked);
    const addData = {
      ...data,
      date: date,
      wfo: true,
    };
    yield put(addDefaultTrip(addData));
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* deleteDefaultWfoTrip(state: any): Generator<any, void, any> {
  const { date } = state;
  const sendData = {
    url: ADD_WFO_DEFAULT_TRIP({ date }),
    method: 'DELETE',
  };
  try {
    yield put(handlePageLoading(true));
    yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.wfo_is_unmarked);
    const addData = {
      date: date,
      wfo: false,
    };
    yield put(deleteDefaultTrip(addData));
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* addBusinessTripSaga(state: any): Generator<any, void, any> {
  const { data, createReturnTrip, returnTripTime } = state;
  const sendData = {
    url: ADD_BUSINESS_TRIP,
    method: 'POST',
    data,
  };
  try {
    yield put(dialogLoadingHandler(true));
    const response = yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.trip_added_successfully);
    const { data } = response;

    yield put(addAdditionalTrip(data));
    if (createReturnTrip) {
      yield call(createReturnBusinessTripSaga, { data: returnTripTime, trip_id: data.id });
    }
    yield put(addTripSuccessResponse(true));
    yield put(dialogLoadingHandler(false));
  } catch (error: any) {
    triggerErrorMessage(error);
    yield put(dialogLoadingHandler(false));
  }
}

export function* createReturnBusinessTripSaga(state: any): Generator<any, void, any> {
  const { data, trip_id } = state;
  const sendData = {
    url: CREATE_RETURN_BUSINESS_TRIP({ trip_id }),
    method: 'POST',
    data,
  };
  try {
    yield put(dialogLoadingHandler(true));
    const response = yield call(callApi, sendData);
    yield put(addAdditionalTrip(response.data));
    yield put(dialogLoadingHandler(false));
  } catch (error: any) {
    triggerErrorMessage(error);
    yield put(dialogLoadingHandler(false));
  }
}

export function* updateAdditionalTripSaga(state: any): Generator<any, void, any> {
  const { trip_id, data, modality_id } = state;
  const sendData = {
    url: UPDATE_TRIP({ trip_id }),
    method: 'PATCH',
    data,
  };
  try {
    yield put(handlePageLoading(true));
    yield call(callApi, sendData);
    triggerSuccessMessage(successMessages.trip_updated_successfully);
    yield put(addTripSuccessResponse(true));
    const updatedData = {
      ...data,
      vehicle_class_id: data.vehicle_class_id,
      modality_id: modality_id,
      vehicle_id: data?.vehicle_id > 0 ? data?.vehicle_id : null,
    };
    yield put(updateAdditionalTrip({ data: updatedData, id: trip_id }));
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}
export function* addCarpoolInTripSaga(state: any): Generator<any, void, any> {
  const { data, trip_id, dialogLoading, pageLoading } = state;
  const sendData = {
    url: UPDATE_TRIP({ trip_id }),
    method: 'PATCH',
    data,
  };
  try {
    if (dialogLoading) {
      yield put(dialogLoadingHandler(true));
    } else if (pageLoading) {
      yield put(handlePageLoading(true));
    }
    yield call(callApi, sendData);
    yield put(addCarpoolInTripSuccess(true));
    triggerSuccessMessage(successMessages.trip_updated_successfully);
    yield put(updateAdditionalTrip({ data: { ...data }, id: trip_id }));
    if (dialogLoading) {
      yield put(dialogLoadingHandler(false));
    } else if (pageLoading) {
      yield put(handlePageLoading(false));
    }
  } catch (error: any) {
    if (dialogLoading) {
      yield put(dialogLoadingHandler(false));
    }
    triggerErrorMessage(error);
  }
}

export function* getGoogleAutocomplete(state: any): Generator<any, void, any> {
  const { query, startLocation } = state;
  const url = GET_ADDRESS_SUGGESTION(query);
  try {
    const response = yield axios.get(url);
    if (response.data.status === 'OK') {
      const places = response.data.predictions;
      if (startLocation) {
        yield put(getGoogleStartLocationAddressSuggestion(places));
      } else {
        yield put(getGoogleEndLocationAddressSuggestion(places));
      }
    } else {
      if (response.data.hasOwnProperty('error_message')) {
        triggerErrorMessage(null, undefined, response?.data?.error_message);
      }
    }
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}

export function* getPlaceDetailsFromSelectedAddress(state: any): Generator<any, void, any> {
  const { place_id, startLocation } = state;
  const url = GET_ADDRESS_DETAILS(place_id);
  try {
    yield put(dialogLoadingHandler(true));
    const response = yield axios.get(url);
    const details = response?.data?.result?.geometry?.location;
    if (startLocation) {
      yield put(getStartLocationAddressDetails(details));
    } else {
      yield put(getEndLocationAddressDetails(details));
    }
    yield put(dialogLoadingHandler(false));
  } catch (error: any) {
    yield put(dialogLoadingHandler(false));
    triggerErrorMessage(error);
  }
}

export function* collectAddressDetailsFromSelectedAddress(state: any): Generator<any, void, any> {
  yield call(getPlaceDetailsFromSelectedAddress, { place_id: state.startLocationValue.place_id, startLocation: true });
  yield call(getPlaceDetailsFromSelectedAddress, { place_id: state.endLocationValue.place_id });
  yield put(triggerBothAddressCollected(true));
}

export function* getExpenseReportSaga(): Generator<any, void, any> {
  const sendData = {
    url: EXPENSE_REPORTS,
    method: 'GET',
  };
  try {
    yield put(dialogLoadingHandler(true));
    const response = yield call(callApi, sendData);
    const data = response?.data?.items;
    // let data;
    // if (response?.data?.items?.length !== 0) {
    //   data = response?.data?.items;
    // } else {
    //   data = ['2024-05'];
    // }
    yield put(getExpenseReport(data));
    yield put(dialogLoadingHandler(false));
  } catch (error: any) {
    triggerErrorMessage(error);
    yield put(dialogLoadingHandler(false));
  }
}
export function* submitExpenseReportSaga(state: any): Generator<any, void, any> {
  const { license_id, data, dialogLoading, pageLoading } = state;
  const sendData = {
    url: SUBMIT_EXPENSE(license_id),
    method: 'POST',
    data,
  };
  try {
    if (dialogLoading) {
      yield put(dialogLoadingHandler(true));
    } else if (pageLoading) {
      yield put(handlePageLoading(true));
    }
    const response = yield call(callApi, sendData);
    const status = [200, 202];
    if (status.includes(response.status)) {
      triggerSuccessMessage(successMessages.expense_report_submitted);
      yield put(submitExpenseReportSuccess(true));
    }
    if (dialogLoading) {
      yield put(dialogLoadingHandler(false));
    } else if (pageLoading) {
      yield put(handlePageLoading(false));
    }
  } catch (error: any) {
    if (dialogLoading) {
      yield put(dialogLoadingHandler(false));
    }
    triggerErrorMessage(error);
  }
}
export function* submitwpmExpenseReportSaga(state: any): Generator<any, void, any> {
  const { month, year } = state;
  const sendData = {
    url: SUBMIT_WPM_EXPENSE_REPORT(month, year),
    method: 'POST',
  };
  try {
    yield put(handlePageLoading(true));
    yield call(callApi, sendData);
    // const status = [200, 202];
    // if (status.includes(response.status)) {
    triggerSuccessMessage(successMessages.wpm_report_submitted);
    // yield put(submitExpenseReportSuccess(true));
    // }
    yield put(handlePageLoading(false));
  } catch (error: any) {
    triggerErrorMessage(error);
  }
}
