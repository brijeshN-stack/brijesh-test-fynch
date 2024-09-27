import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

export interface VehicleFormValues {
  modality_id: any;
  vehicle_class: any;
  id?: any;
  licensePlate: string | undefined;
  name: string;
  selectedOption: string;
  co2_g_km_tailpipe: string;
  vehicleIcon?: any;
  priority?: number;
  vehicle_class_id?: number;
}

export interface VehicleFormErros {
  licensePlate: string;
  name: string;
  selectedOption: string;
  co2_g_km_tailpipe: string;
}

interface VehicleState {
  vehicles: VehicleFormValues[];
  modalities: any;
  vehicleClasses: any;
  vehiclePriority: string;
  lookupVehicleInfo: any;
  loading: boolean;
  error: string | null;
  isVehiclesLoading: boolean;
  isDialogLoading: boolean;
  addVehicleSuccessResponse: boolean;
  deleteVehicleSuccessResponse: any;
}

const initialState: VehicleState = {
  vehicles: [],
  modalities: [],
  vehicleClasses: [],
  vehiclePriority: '',
  lookupVehicleInfo: null,
  loading: false,
  error: null,
  isVehiclesLoading: false,
  isDialogLoading: false,
  addVehicleSuccessResponse: false,
  deleteVehicleSuccessResponse: null,
};

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {
    getVehicles(state, action) {
      state.vehicles = action.payload;
    },
    addVehicle(state, action) {
      state.vehicles.push(action.payload);
    },
    deleteVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter(vehicle => vehicle.id !== action.payload);
    },
    getModalities(state, action) {
      state.modalities = action.payload;
    },
    getVehicleClasses(state, action) {
      state.vehicleClasses = action.payload;
    },
    setVehiclePriority(state, action) {
      state.vehiclePriority = action.payload;
    },
    getLookupVehicleInformation(state, action) {
      state.lookupVehicleInfo = action.payload;
    },
    vehiclesLoader(state, action) {
      state.isVehiclesLoading = action.payload;
    },
    dialogLoader(state, action) {
      state.isDialogLoading = action.payload;
    },
    addVehicleSuccess(state, action) {
      state.addVehicleSuccessResponse = action.payload;
    },
    deleteVehicleSuccess(state, action) {
      state.deleteVehicleSuccessResponse = action.payload;
    },
  },
});

export const {
  addVehicle,
  deleteVehicle,
  getVehicles,
  getModalities,
  getVehicleClasses,
  setVehiclePriority,
  getLookupVehicleInformation,
  vehiclesLoader,
  dialogLoader,
  addVehicleSuccess,
  deleteVehicleSuccess,
} = vehicleSlice.actions;

export const vehicles = (state: RootState) => state.vehiclesSlice.vehicles;
export const modalities = (state: RootState) => state.vehiclesSlice.modalities;
export const vehiclePriority = (state: RootState) => state.vehiclesSlice.vehiclePriority;
export const vehicleClasses = (state: RootState) => state.vehiclesSlice.vehicleClasses;
export const lookupVehicleInfo = (state: RootState) => state.vehiclesSlice.lookupVehicleInfo;
export const vehiclesLoading = (state: RootState) => state.vehiclesSlice.loading;
export const vehiclesError = (state: RootState) => state.vehiclesSlice.error;
export const vehicleLoader = (state: RootState) => state.vehiclesSlice.isVehiclesLoading;
export const dialogLoading = (state: RootState) => state.vehiclesSlice.isDialogLoading;
export const selectAddVehicleSuccess = (state: RootState) => state.vehiclesSlice.addVehicleSuccessResponse;
export const deletedVehicleSuccess = (state: RootState) => state.vehiclesSlice.deleteVehicleSuccessResponse;

export default vehicleSlice.reducer;
