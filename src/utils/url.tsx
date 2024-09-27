import {
  USER,
  TRIPS,
  AUTH,
  SESSION,
  PROVIDER,
  VEHICLES,
  MODALITIES,
  PROFILE,
  ADDRESS,
  SUBSCRIPTIONS,
} from "@/utils/constants";

// Trips URL
export const DELETE_TRIPS = ({ trip_id }: any) =>
  `/${USER}/${TRIPS}/${trip_id}`;
export const AUTH_SESSION = `/${AUTH}/${SESSION}`;
export const AUTH_PROVIDER = (email_id: any) =>
  `/${AUTH}/${PROVIDER}?email=${email_id}`;
export const EMAIL_VERIFY = `/${AUTH}/email/verify`;
export const RESET_PASSWORD = `/${AUTH}/email/reset`;
export const MONTH_TRIPS = ({ since_date, until_date }: any) =>
  `/${USER}/days?since=${since_date}&until=${until_date}`;
export const TRIPS_BY_DATE = ({ date }: any) => `/${USER}/${TRIPS}/day/${date}`;
export const ADD_DEFAULT_TRIP = ({ date }: any) => `/${USER}/days/${date}`;
export const CREATE_RETURN_BUSINESS_TRIP = ({ trip_id }: any) =>
  `/${USER}/${TRIPS}/${trip_id}/return`;
export const ADD_WFO_DEFAULT_TRIP = ({ date }: any) =>
  `/${USER}/app/${TRIPS}/wfo/${date}`;
export const ADD_BUSINESS_TRIP = `/${USER}/${TRIPS}`;
export const UPDATE_TRIP = ({ trip_id }: any) =>
  `/${USER}/app/${TRIPS}/${trip_id}`;
export const SUBMIT_EXPENSE = (license_id: any) =>
  `/${USER}/reports/expenses/${license_id}`;
export const EXPENSE_REPORTS = `/${USER}/app/reports/timeframe`;
export const SUBMIT_WPM_EXPENSE_REPORT = (month: number, year: number) =>
  `/${USER}/days/wpm?year=${year}&month=${month}`;

// Vehicles URL
export const VEHICLES_URL = () => `/${USER}/${VEHICLES}`;
export const DELETE_VEHICLE = (vehicle_id: any) =>
  `/${USER}/${VEHICLES}/${vehicle_id}`;
export const VEHICLE_PRIORITY = () => `/${USER}/${VEHICLES}/order`;
export const GET_LOOKUP_VEHICLE_INFORMATION = ({
  country,
  registration,
}: {
  country: string;
  registration: string;
}) => `/${USER}/${VEHICLES}/lookup/${country}/${registration}`;

// Modalities URL
export const GET_MODALITIES = () =>
  `/${MODALITIES}?&timestamp=${new Date().getTime()}`;
export const GET_VEHICLE_CLASS = (country: string) =>
  `/${MODALITIES}/vehicleclasses/${country}?&timestamp=${new Date().getTime()}`;

// Profile URL
export const PROFILE_URL = () => `/${USER}/${PROFILE}`;
export const USER_PRIMARY_SUBSCRIPTIONS_URL = `/${USER}/${SUBSCRIPTIONS}/primary`;
export const USER_SUBSCRIPTIONS = `/${USER}/${SUBSCRIPTIONS}`;
export const GET_OFFICE_ADDRESS_URL = () => `/${USER}/${ADDRESS}/offices`;
export const GET_OFFICE_DEFAULT_ADDRESS_URL = (address_id: any) =>
  `/${USER}/${ADDRESS}/${address_id}`;
export const USER_ADDRESSES = (typeOfAddress?: any) => {
  if (typeOfAddress) {
    return `/${USER}/${ADDRESS}?type=${typeOfAddress}`;
  }
  return `/${USER}/${ADDRESS}`;
};
export const DELETE_USER_ADDRESS = (address_id: any) =>
  `/${USER}/${ADDRESS}/${address_id}`;
export const GET_ADDRESS_SUGGESTION = (query: string) =>
  `/api/addressSuggestion?query=${query}`;
export const GET_ADDRESS_DETAILS = (place_id: string) =>
  `/api/addressDetails?place_id=${place_id}`;
