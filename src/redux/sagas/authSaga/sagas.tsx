import { call, put } from 'redux-saga/effects';
import { callApi } from '@/redux/axiosUtil';
import { AUTH_PROVIDER, AUTH_SESSION, EMAIL_VERIFY, RESET_PASSWORD, USER_SUBSCRIPTIONS } from '@/utils/url';
import {
  authLoadingHandler,
  deleteAuthSessionSuccess,
  doLoginRedirect,
  emailIsAlreadySent,
  getProviderId,
  handleAuthProviderResponse,
  redirectToVerifyOTP,
  sendEmailSuccessResponse,
  sendSessionCreateResponse,
} from '@/redux/slices/authSlice';
import { getIdToken, triggerErrorMessage, triggerSuccessMessage } from '@/utils/helpers';
import { saveTokenToCookies } from '@/app/actions';
import { successMessages } from '@/utils/constants';
import { profileLoader } from '@/redux/slices/profileSlice';

export function* getAuthProviderSaga(state: any): Generator<any, void, any> {
  const { email_id } = state;
  const sendData = {
    url: AUTH_PROVIDER(email_id),
    method: 'GET',
  };
  try {
    yield put(authLoadingHandler(true));
    const response = yield call(callApi, sendData);
    const data = response?.data;
    yield put(getProviderId(data));
    // yield put(authLoadingHandler(false));
  } catch (error: any) {
    const status = error?.response?.status;
    if (status !== 404) {
      yield put(authLoadingHandler(false));
      triggerErrorMessage(error);
    }
    if (status === 404) {
      yield put(handleAuthProviderResponse(404));
    }
  }
}
export function* createAuthSessionSaga(state: any): Generator<any, void, any> {
  const sendData = {
    url: AUTH_SESSION,
    method: 'POST',
  };
  try {
    // yield put(authLoadingHandler(true));
    const response = yield call(callApi, sendData);
    const status = [200, 201, 303];
    if (status.includes(response.status)) {
      yield put(sendSessionCreateResponse(true));
    }
    // yield put(authLoadingHandler(false));
  } catch (error: any) {
    yield put(authLoadingHandler(false));
    triggerErrorMessage(error);
  }
}

export function* sendEmailVerificationLinkSaga(state: any): Generator<any, void, any> {
  const { data } = state;
  const sendData = {
    url: EMAIL_VERIFY,
    method: 'POST',
    data,
  };
  try {
    yield put(authLoadingHandler(true));
    const response = yield call(callApi, sendData);
    if (response.status === 202) {
      yield put(sendEmailSuccessResponse(true));
    }
    yield put(authLoadingHandler(false));
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 429) {
      yield put(emailIsAlreadySent(true));
    }
    yield put(authLoadingHandler(false));
    triggerErrorMessage(error);
  }
}
export function* deleteAuthSessionSaga(): Generator<any, void, any> {
  const sendData = {
    url: AUTH_SESSION,
    method: 'DELETE',
  };
  try {
    yield put(authLoadingHandler(true));
    yield put(profileLoader(true));
    yield call(callApi, sendData);
    yield put(deleteAuthSessionSuccess(true));
    yield put(authLoadingHandler(false));
    yield put(profileLoader(false));
  } catch (error: any) {
    yield put(profileLoader(false));
    yield put(authLoadingHandler(false));
    triggerErrorMessage(error);
  }
}

export function* sendPasswordResetLinkSaga(state: any): Generator<any, void, any> {
  const { data } = state;
  const sendData = {
    url: RESET_PASSWORD,
    method: 'POST',
    data,
  };
  try {
    yield put(authLoadingHandler(true));
    yield call(callApi, sendData);
    yield put(authLoadingHandler(false));
    triggerSuccessMessage(successMessages.reset_email_is_sent);
  } catch (error: any) {
    yield put(authLoadingHandler(false));
    triggerErrorMessage(error);
  }
}

const saveToken = (token: any) => {
  return new Promise<void>(resolve => {
    saveTokenToCookies(token);
    resolve();
  });
};
export function* verifyUserSubscriptionByOTP(state: any): Generator<any, void, any> {
  const { data } = state;
  const sendData = {
    url: USER_SUBSCRIPTIONS,
    method: 'POST',
    data,
  };
  try {
    yield put(authLoadingHandler(true));
    const response = yield call(callApi, sendData);
    const status = [201, 303];
    if (status.includes(response.status)) {
      const token = yield call(getIdToken);
      yield call(saveToken, token);
      yield put(doLoginRedirect(true));
    }
    yield put(authLoadingHandler(false));
  } catch (error: any) {
    yield put(authLoadingHandler(false));
    triggerErrorMessage(error);
  }
}

export function* reSubscribeUser(state: any): Generator<any, void, any> {
  const { data } = state;
  const sendData = {
    url: USER_SUBSCRIPTIONS,
    method: 'POST',
    data,
  };
  try {
    yield put(authLoadingHandler(true));
    const response = yield call(callApi, sendData);
    const status = [201, 303];
    if (status.includes(response.status)) {
      const token = yield call(getIdToken);
      yield call(saveToken, token);
      yield put(doLoginRedirect(true));
    }
    yield put(authLoadingHandler(false));
  } catch (error: any) {
    yield put(authLoadingHandler(false));
    const status = error?.response?.status;
    if (status === 404) {
      yield put(redirectToVerifyOTP(true));
    }
    if (status !== 404) {
      triggerErrorMessage(error);
    }
  }
}
