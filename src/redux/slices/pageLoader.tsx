'use client';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

interface authState {
  isLoading: boolean;
}

const initialState: authState = {
  isLoading: false,
};

const pageLoaderSlice = createSlice({
  name: 'loaderSlice',
  initialState,
  reducers: {
    handlePageLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { handlePageLoading } = pageLoaderSlice.actions;

export const selectIsLoading = (state: RootState) => state.pageLoaderSlice.isLoading;

export default pageLoaderSlice.reducer;
