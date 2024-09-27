import { useEffect, useState } from 'react';
import { dispatch, RootState } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import { StyledMainContainer } from '@/components/auth/style';
import { VerificationActionBlock, VerificationBlock } from '.';
import { auth } from '@/lib/firebase';
import { useAppSelector } from '@/redux/hooks';
import {
  callReSubscribe,
  doLoginRedirect,
  getEmailForCodeVerification,
  redirectToVerifyOTP,
  selectEmailForCodeVerification,
  selectIsLogin,
  selectIsResubscribe,
  // selectIsSessionCreated,
  selectIsVerifyOTP,
  // sendSessionCreateResponse,
} from '@/redux/slices/authSlice';
import { useRouter } from 'next/navigation';
import { useTranslate } from '@/hooks/useTranslate';
import useLocale from '@/hooks/useLocale';
import { reload, getIdToken } from 'firebase/auth';
import { triggerErrorMessage } from '@/utils/helpers';
import { errorMessages } from '@/utils/constants';
import { User } from 'firebase/auth';

export default function VerifyEmail() {
  const [locale] = useLocale();

  const intl = useTranslate(locale);
  const [queryValue, setQueryValue] = useState<string | undefined | null>();
  // const isSessionCreated = useAppSelector((state: RootState) => selectIsSessionCreated(state));
  const isVerifyOTP = useAppSelector((state: RootState) => selectIsVerifyOTP(state));
  const emailForCodeVerification = useAppSelector((state: RootState) => selectEmailForCodeVerification(state));
  const isLogin = useAppSelector((state: RootState) => selectIsLogin(state));
  const isResubscribe = useAppSelector((state: RootState) => selectIsResubscribe(state));

  const router = useRouter();

  useEffect(() => {
    const url = new URL(window.location.href);
    const emailParams = new URLSearchParams(url.search);
    const getQueryValue = emailParams.get('email');
    setQueryValue(getQueryValue);
  }, []);
  // useEffect(() => {
  //   if (isSessionCreated) {
  //     dispatch({ type: sagaActions.GET_SUBSCRIPTION_DETAILS });
  //     dispatch(sendSessionCreateResponse(false));
  //   }
  // }, [isSessionCreated]);
  useEffect(() => {
    if (isVerifyOTP) {
      const email = emailForCodeVerification || queryValue || '';
      router.push(`/verifyCode?email=${encodeURIComponent(email)}`);
      dispatch(redirectToVerifyOTP(false));
      dispatch(getEmailForCodeVerification(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifyOTP]);
  useEffect(() => {
    if (isResubscribe) {
      const email = emailForCodeVerification || queryValue || '';
      dispatch(callReSubscribe(false));
      const data = {
        email: email,
      };
      dispatch({ type: sagaActions.RESUBSCRIBE_USING_EMAIL, data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResubscribe]);
  useEffect(() => {
    if (isLogin) {
      router.push(`/${locale}/dashboard`);
      dispatch(doLoginRedirect(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const handleResendEmail = () => {
    const data = {
      email: queryValue,
    };
    dispatch({ type: sagaActions.SEND_VERIFICATION_LINK, data });
  };
  const handleContinueAction = async () => {
    const user = await new Promise<User | undefined>((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(async user => {
        if (user) {
          try {
            await reload(user);
            await getIdToken(user, true);
            resolve(user);
          } catch (error: any) {
            reject(error);
            triggerErrorMessage(null, error?.code);
          }
        } else {
          resolve(undefined);
        }
        unsubscribe();
      });
    });
    if (user) {
      if (!user.emailVerified) {
        triggerErrorMessage(null, errorMessages.please_verify_your_email);
      } else if (user.emailVerified) {
        // dispatch({ type: sagaActions.CREATE_AUTH_SESSION });
        dispatch({ type: sagaActions.GET_SUBSCRIPTION_DETAILS });
      }
    }
  };

  return (
    <StyledMainContainer>
      <VerificationBlock getQueryValue={queryValue} />
      <VerificationActionBlock
        intl={intl}
        locale={locale}
        handleResendEmail={handleResendEmail}
        handleContinueAction={handleContinueAction}
      />
    </StyledMainContainer>
  );
}
