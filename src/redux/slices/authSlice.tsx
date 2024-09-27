'use client';

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

interface authState {
  emailSuccess: boolean;
  isLogin: boolean;
  authProviderResponse: number | undefined;
  providerId: any;
  authLoading: boolean;
  isLogout: boolean;
  isVerifyOTP: boolean;
  isSessionCreated: boolean;
  emailForCodeVerification: string | undefined;
  isEmailAlreadySent: boolean;
  isResubscribe: boolean;
  isDeleteSessionSuccess: boolean;
}

const initialState: authState = {
  emailSuccess: false,
  isLogin: false,
  authProviderResponse: undefined,
  providerId: undefined,
  authLoading: false,
  isLogout: false,
  isVerifyOTP: false,
  isSessionCreated: false,
  emailForCodeVerification: undefined,
  isEmailAlreadySent: false,
  isResubscribe: false,
  isDeleteSessionSuccess: false,
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    sendSessionCreateResponse(state, action) {
      state.isSessionCreated = action.payload;
    },
    doLoginRedirect(state, action) {
      state.isLogin = action.payload;
    },
    sendEmailSuccessResponse(state, action) {
      state.emailSuccess = action.payload;
      state.authLoading = false;
    },
    handleAuthProviderResponse(state, action) {
      state.authProviderResponse = action.payload;
    },
    getProviderId(state, action) {
      state.providerId = action.payload;
    },
    authLoadingHandler(state, action) {
      state.authLoading = action.payload;
    },
    doLogout(state, action) {
      state.isLogout = action.payload;
    },
    callReSubscribe(state, action) {
      state.isResubscribe = action.payload;
    },
    redirectToVerifyOTP(state, action) {
      state.isVerifyOTP = action.payload;
    },
    getEmailForCodeVerification(state, action) {
      state.emailForCodeVerification = action.payload;
    },
    emailIsAlreadySent(state, action) {
      state.isEmailAlreadySent = action.payload;
    },
    deleteAuthSessionSuccess(state, action) {
      state.isDeleteSessionSuccess = action.payload;
    },
  },
});

export const {
  sendEmailSuccessResponse,
  sendSessionCreateResponse,
  handleAuthProviderResponse,
  getProviderId,
  authLoadingHandler,
  doLogout,
  redirectToVerifyOTP,
  doLoginRedirect,
  getEmailForCodeVerification,
  emailIsAlreadySent,
  callReSubscribe,
  deleteAuthSessionSuccess,
} = authSlice.actions;

export const selectEmailSuccess = (state: RootState) => state.authSlice.emailSuccess;
export const selectIsLogin = (state: RootState) => state.authSlice.isLogin;
export const selectIsSessionCreated = (state: RootState) => state.authSlice.isSessionCreated;
export const isProviderIdAvailable = (state: RootState) => state.authSlice.authProviderResponse;
export const selectProviderId = (state: RootState) => state.authSlice.providerId;
export const selectAuthLoading = (state: RootState) => state.authSlice.authLoading;
export const selectIsLogout = (state: RootState) => state.authSlice.isLogout;
export const selectIsVerifyOTP = (state: RootState) => state.authSlice.isVerifyOTP;
export const selectEmailForCodeVerification = (state: RootState) => state.authSlice.emailForCodeVerification;
export const selectIsEmailAlreadySent = (state: RootState) => state.authSlice.isEmailAlreadySent;
export const selectIsResubscribe = (state: RootState) => state.authSlice.isResubscribe;
export const selectIsSessionDeleted = (state: RootState) => state.authSlice.isDeleteSessionSuccess;

export default authSlice.reducer;
