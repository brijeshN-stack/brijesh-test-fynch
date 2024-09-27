import { takeLatest } from 'redux-saga/effects';
import { sagaActions } from '@/redux/actions';
import {
  createAuthSessionSaga,
  deleteAuthSessionSaga,
  getAuthProviderSaga,
  reSubscribeUser,
  sendEmailVerificationLinkSaga,
  sendPasswordResetLinkSaga,
  verifyUserSubscriptionByOTP,
} from '@/redux/sagas/authSaga/sagas';

export function* authSaga() {
  yield takeLatest(sagaActions.CREATE_AUTH_SESSION, createAuthSessionSaga);
  yield takeLatest(sagaActions.DELETE_AUTH_SESSION, deleteAuthSessionSaga);
  yield takeLatest(sagaActions.GET_AUTH_PROVIDER, getAuthProviderSaga);
  yield takeLatest(sagaActions.SEND_VERIFICATION_LINK, sendEmailVerificationLinkSaga);
  yield takeLatest(sagaActions.PASSWORD_RESET_LINK, sendPasswordResetLinkSaga);
  yield takeLatest(sagaActions.VERIFY_USER_SUBSCRIPTIONS, verifyUserSubscriptionByOTP);
  yield takeLatest(sagaActions.RESUBSCRIBE_USING_EMAIL, reSubscribeUser);
}
