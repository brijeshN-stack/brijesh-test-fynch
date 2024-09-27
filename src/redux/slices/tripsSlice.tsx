import { createSlice } from '@reduxjs/toolkit';
import { TripsDataProps, Place, Location } from '@/types';
import { RootState } from '@/redux/store';

export interface Trip {
  startLocation?: string;
  endLocation: string;
  selectedOption: string;
  date: string;
  info: string;
}

interface TripState {
  trips: TripsDataProps[];
  loading: boolean;
  error: string | null;
  monthlyTrips: any;
  addTripSuccess: boolean;
  isCalendarLoading: boolean;
  isDialogLoading: boolean;
  isAddTripSectionLoading: boolean;
  startLocationSuggestion: Place[];
  endLocationSuggestion: Place[];
  startLocationAddressDetails: Location | undefined;
  endLocationAddressDetails: Location | undefined;
  bothAddressCollected: boolean;
  expenseReports: string[];
  expenseReportStatus: boolean;
  submitExpenseVisibility: boolean;
  isCarpoolSuccess: boolean;
}

const initialState: TripState = {
  trips: [],
  loading: false,
  error: null,
  monthlyTrips: [],
  addTripSuccess: false,
  isCalendarLoading: false,
  isDialogLoading: false,
  isAddTripSectionLoading: false,
  startLocationSuggestion: [],
  endLocationSuggestion: [],
  startLocationAddressDetails: undefined,
  endLocationAddressDetails: undefined,
  bothAddressCollected: false,
  expenseReports: [],
  expenseReportStatus: false,
  submitExpenseVisibility: false,
  isCarpoolSuccess: false,
};

const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    calendarLoadingHandler(state, action) {
      state.isCalendarLoading = action.payload;
    },
    dialogLoadingHandler(state, action) {
      state.isDialogLoading = action.payload;
    },
    addTripSectionLoadingHandler(state, action) {
      state.isAddTripSectionLoading = action.payload;
    },
    addAdditionalTrip(state, action) {
      state.trips.push(action.payload);
    },
    addTripSuccessResponse(state, action) {
      state.addTripSuccess = action.payload;
    },
    getMonthlyTrips(state, action) {
      state.monthlyTrips = action.payload;
    },
    getTripsByDate(state, action) {
      state.trips = action.payload;
    },
    addDefaultTrip(state, action) {
      state.monthlyTrips = state.monthlyTrips.map((item: any) => {
        if (item.date === action.payload.date) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });

      const dateExists = state.monthlyTrips.some((item: any) => item.date === action.payload.date);
      if (!dateExists) {
        state.monthlyTrips.push(action.payload);
      }
    },
    deleteDefaultTrip(state, action) {
      state.monthlyTrips = state.monthlyTrips.map((item: any) => {
        if (item.date === action.payload.date) {
          return {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    },
    deleteAdditionalTrip(state, action) {
      state.trips = state.trips.filter(trip => trip.id !== action.payload);
    },
    updateAdditionalTrip(state, action) {
      state.trips = state.trips.map((item: any) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            ...action.payload.data,
          };
        }
        return item;
      });
    },
    getGoogleStartLocationAddressSuggestion(state, action) {
      state.startLocationSuggestion = action.payload;
    },
    getGoogleEndLocationAddressSuggestion(state, action) {
      state.endLocationSuggestion = action.payload;
    },
    getStartLocationAddressDetails(state, action) {
      state.startLocationAddressDetails = action.payload;
    },
    getEndLocationAddressDetails(state, action) {
      state.endLocationAddressDetails = action.payload;
    },
    triggerBothAddressCollected(state, action) {
      state.bothAddressCollected = action.payload;
    },
    getExpenseReport(state, action) {
      state.expenseReports = action.payload;
    },
    submitExpenseReportSuccess(state, action) {
      state.expenseReportStatus = action.payload;
    },
    handleSubmitExpenseVisibility(state, action) {
      state.submitExpenseVisibility = action.payload;
    },
    addCarpoolInTripSuccess(state, action) {
      state.isCarpoolSuccess = action.payload;
    },
  },
});

export const {
  addAdditionalTrip,
  deleteAdditionalTrip,
  getTripsByDate,
  getMonthlyTrips,
  addDefaultTrip,
  addTripSuccessResponse,
  updateAdditionalTrip,
  deleteDefaultTrip,
  calendarLoadingHandler,
  dialogLoadingHandler,
  addTripSectionLoadingHandler,
  getGoogleStartLocationAddressSuggestion,
  getGoogleEndLocationAddressSuggestion,
  getStartLocationAddressDetails,
  getEndLocationAddressDetails,
  triggerBothAddressCollected,
  getExpenseReport,
  submitExpenseReportSuccess,
  handleSubmitExpenseVisibility,
  addCarpoolInTripSuccess,
} = tripSlice.actions;

export const selectTrips = (state: RootState) => state.tripReducer.trips;
export const selectLoading = (state: RootState) => state.tripReducer.loading;
export const selectError = (state: RootState) => state.tripReducer.error;
export const selectMonthlyTrips = (state: RootState) => state.tripReducer.monthlyTrips;
export const selectAddTripSuccessResponse = (state: RootState) => state.tripReducer.addTripSuccess;
export const selectCalendarLoading = (state: RootState) => state.tripReducer.isCalendarLoading;
export const selectDialogLoading = (state: RootState) => state.tripReducer.isDialogLoading;
export const selectAddTripSectionLoading = (state: RootState) => state.tripReducer.isAddTripSectionLoading;
export const selectStartAddressSuggestion = (state: RootState) => state.tripReducer.startLocationSuggestion;
export const selectEndAddressSuggestion = (state: RootState) => state.tripReducer.endLocationSuggestion;
export const selectStartLocationAddressDetails = (state: RootState) => state.tripReducer.startLocationAddressDetails;
export const selectEndLocationAddressDetails = (state: RootState) => state.tripReducer.endLocationAddressDetails;
export const selectBothAddressSelected = (state: RootState) => state.tripReducer.bothAddressCollected;
export const selectMonthsOfExpenseReports = (state: RootState) => state.tripReducer.expenseReports;
export const selectExpenseReportStatus = (state: RootState) => state.tripReducer.expenseReportStatus;
export const selectSubmitExpenseVisibility = (state: RootState) => state.tripReducer.submitExpenseVisibility;
export const selectIsCarpoolSuccess = (state: RootState) => state.tripReducer.isCarpoolSuccess;

export default tripSlice.reducer;
