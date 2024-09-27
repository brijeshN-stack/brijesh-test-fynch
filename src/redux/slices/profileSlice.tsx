import { createSlice } from '@reduxjs/toolkit';
import { Geometry, LicenseConfiguration, Place } from '@/types';
import { RootState } from '@/redux/store';

export interface profileDetailsValues {
  given_name?: string;
  family_name?: string;
  picture?: any;
  language?: string;
  retention_period?: number;
}

interface profileState {
  profile?: profileDetailsValues[];
  subscription: Array<any> | undefined;
  address?: any;
  officeDefaultAddress?: any;
  isProfileLoading: boolean;
  places?: Place[];
  placesLatLng?: any;
  staionAddressLatLng: Geometry | null;
  homeAddress?: any;
  stationPlaceSuggestion: Place[];
  stationAddress: any;
  licenseDetails: LicenseConfiguration | undefined;
}

const initialState: profileState = {
  profile: [],
  subscription: undefined,
  address: null,
  officeDefaultAddress: '',
  isProfileLoading: false,
  places: [],
  homeAddress: null,
  placesLatLng: null,
  staionAddressLatLng: null,
  stationPlaceSuggestion: [],
  stationAddress: null,
  licenseDetails: undefined,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    getProfileDetails(state, action) {
      state.profile = action.payload;
    },
    updateProfileDetails(state, action) {
      state.profile = action.payload;
    },
    getSubscriptionDetails(state, action) {
      state.subscription = action.payload;
    },
    getOfficeAddresses(state, action) {
      state.address = action.payload;
    },
    getOfficeDefaultAddress(state, action) {
      state.officeDefaultAddress = action.payload;
    },
    profileLoader(state, action) {
      state.isProfileLoading = action.payload;
    },
    googlePlacesAutocomplete(state, action) {
      state.places = action.payload;
    },
    googlePlacesAutocompleteLatLng(state, action) {
      state.placesLatLng = action.payload;
    },
    stationAddressAutocompleteLatLng(state, action) {
      state.staionAddressLatLng = action.payload;
    },
    getStationGooglePlaceAutocomplete(state, action) {
      state.stationPlaceSuggestion = action.payload;
    },
    getUserHomeAddress(state, action) {
      state.homeAddress = action.payload;
    },
    getUserStationAddress(state, action) {
      state.stationAddress = action.payload;
    },
    getLicenseConfigDetails(state, action) {
      state.licenseDetails = action.payload;
    },
  },
});

export const {
  getProfileDetails,
  updateProfileDetails,
  getSubscriptionDetails,
  getOfficeAddresses,
  getOfficeDefaultAddress,
  profileLoader,
  googlePlacesAutocomplete,
  googlePlacesAutocompleteLatLng,
  getUserHomeAddress,
  getStationGooglePlaceAutocomplete,
  stationAddressAutocompleteLatLng,
  getUserStationAddress,
  getLicenseConfigDetails,
} = profileSlice.actions;

export const profile = (state: RootState) => state.profileSlice.profile;
export const subscription = (state: RootState) => state.profileSlice.subscription;
export const officeAddress = (state: RootState) => state.profileSlice.address;
export const selectOfficeDefaultAddress = (state: RootState) => state.profileSlice.officeDefaultAddress;
export const profileLoading = (state: RootState) => state.profileSlice.isProfileLoading;
export const placesAutocomplete = (state: RootState) => state.profileSlice.places;
export const placesAutocompleteLatLng = (state: RootState) => state.profileSlice.placesLatLng;
export const homeAddress = (state: RootState) => state.profileSlice.homeAddress;
export const selectStationAddressSuggestion = (state: RootState) => state.profileSlice.stationPlaceSuggestion;
export const selectStatioAddressLatLng = (state: RootState) => state.profileSlice.staionAddressLatLng;
export const selectStationAddress = (state: RootState) => state.profileSlice.stationAddress;
export const selectLicenseConfigDetails = (state: RootState) => state.profileSlice.licenseDetails;

export default profileSlice.reducer;
