export type TripsDataProps = {
  id?: string;
  tripStartLocation?: string;
  tripEndLocation: string;
  vehicle: string;
  returnTripStartLocation?: string;
  returnTripEndLocation?: string;
  returnVehicle?: string;
  info: string;
  date: string | Date;
  wfh: boolean;
  wfo: boolean;
};

export interface AddTripData {
  source: string;
  start_time: string;
  stop_time: string;
  utcoffset: number;
  objective_id: number;
  vehicle_class_id: any;
  start_location_name: any;
  stop_location_name: any;
  start_location: Location | undefined;
  stop_location: Location | undefined;
  vehicle_id?: any; // Optional property
  passenger: boolean;
  passengers: number;
}

export type ValueAndIconProps = {
  value: string;
  icon?: JSX.Element;
  vehicle_class_id?: number;
  modality_id?: number;
};

export interface Location {
  lat: number;
  lng: number;
}

export interface Viewport {
  northeast: Location;
  southwest: Location;
}

export interface Geometry {
  location: Location;
  viewport: Viewport;
}

export interface Place {
  description: string;
  formatted_address: string;
  geometry: Geometry;
  name: string;
}

export type DateProps = {
  date?: Date | undefined;
  hour: number;
  minutes: number;
  seconds: number;
};

export interface LicenseConfiguration {
  allow_weekend_work: boolean;
  allow_wfh_business_trips: boolean;
  expense_deadline_day_of_month: number;
  expense_deadline_months_in_past: number;
}
export interface SelectedMonthProps {
  year: number | undefined;
  month: number | undefined;
}
export type MissingDetailsProps = {
  isAddressesMissing: boolean;
  isDefaultModalityIdMissing: boolean;
  isAllDetailsMissing: boolean;
  isPersonalVehicleNotAdded: boolean;
};

export type SvgIconProps = {
  width?: string;
  fill?: string;
  height?: string;
};

export interface AdditionalPathProps {
  yearValue: string | number | undefined;
  monthValue: string | number | undefined;
}
