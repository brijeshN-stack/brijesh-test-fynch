import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Typography } from '@mui/material';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import app from '@/lib/firebase';
import { regEx, errorMessages } from '@/utils/constants';
import { RootState, dispatch } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import { useAppSelector } from '@/redux/hooks';
import {
  authLoadingHandler,
  callReSubscribe,
  doLoginRedirect,
  emailIsAlreadySent,
  getEmailForCodeVerification,
  getProviderId,
  handleAuthProviderResponse,
  isProviderIdAvailable,
  redirectToVerifyOTP,
  selectEmailForCodeVerification,
  selectEmailSuccess,
  selectIsEmailAlreadySent,
  selectIsLogin,
  selectIsResubscribe,
  selectIsSessionCreated,
  selectIsVerifyOTP,
  selectProviderId,
  sendEmailSuccessResponse,
  sendSessionCreateResponse,
} from '@/redux/slices/authSlice';
import { redirecrUserToDashboard } from '@/app/actions';
import {
  handleLoginWithGoogle,
  triggerErrorMessage,
  handleLoginWithMicrosoft,
  destructurePathValues,
  generateAdditionalPath,
} from '@/utils/helpers';
import { useTranslate } from '@/hooks/useTranslate';
import { StyledFormContainer, StyledMainContainer, StyledStack } from '@/components/auth/style';
import { LoginActionBlock, LoginFieldsBlock } from '.';
import useLocale from '@/hooks/useLocale';
import ProductLogo from '@/components/sharedUi/ProductLogo';
import { defaultStyle } from '@/config/colorConfig';

type LoginFormValue = {
  email: string;
  password: string;
};

export type LoginFormErrors = {
  email: string;
  password: string;
};

export default function Login() {
  const [locale] = useLocale();
  const intl = useTranslate(locale);
  const commonWidthHeight = {
    width: { sm: '370px', xs: '300px' },
    minHeight: '46px',
  };

  const commonPlaceholderStyle = {
    // opacity: "30%",
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
  };

  const router = useRouter();

  const emailSuccess = useAppSelector((state: RootState) => selectEmailSuccess(state));
  const isEmailAlreadySent = useAppSelector((state: RootState) => selectIsEmailAlreadySent(state));
  const isLogin = useAppSelector((state: RootState) => selectIsLogin(state));
  const emailForCodeVerification = useAppSelector((state: RootState) => selectEmailForCodeVerification(state));
  const isVerifyOTP = useAppSelector((state: RootState) => selectIsVerifyOTP(state));
  const isResubscribe = useAppSelector((state: RootState) => selectIsResubscribe(state));
  const isSessionCreated = useAppSelector((state: RootState) => selectIsSessionCreated(state));
  const authProviderResponse = useAppSelector((state: RootState) => isProviderIdAvailable(state));
  const providerId = useAppSelector((state: RootState) => selectProviderId(state));
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [formValues, setFormValues] = useState<LoginFormValue>({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState<LoginFormErrors>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (emailSuccess) {
      const email = emailForCodeVerification || formValues.email || '';
      router.push(`/verifyEmail/?email=${email}`);
      dispatch(sendEmailSuccessResponse(false));
      dispatch(getEmailForCodeVerification(undefined));
    }
    if (isEmailAlreadySent) {
      const email = emailForCodeVerification || formValues.email || '';
      router.push(`/verifyEmail/?email=${email}`);
      dispatch(emailIsAlreadySent(false));
      dispatch(getEmailForCodeVerification(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSuccess, router, isEmailAlreadySent]);
  const emailRef = useRef<{ value: string | undefined }>(null);
  const passwordRef = useRef<{ value: string | undefined }>(null);

  useEffect(() => {
    const handleLogin = async () => {
      if (authProviderResponse === 404) {
        dispatch(handleAuthProviderResponse(undefined));
        const { email, password } = formValues;
        const auth = getAuth(app);
        try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          const idToken = await user.getIdToken();
          // window.localStorage.setItem("token", idToken);
          window.localStorage.setItem('isSessionActive', 'yes');

          if (!user.emailVerified) {
            dispatch({
              type: sagaActions.SEND_VERIFICATION_LINK,
              data: { email },
            });
          } else {
            // saveTokenToCookies(idToken);
            dispatch({ type: sagaActions.CREATE_AUTH_SESSION });
          }
        } catch (e: any) {
          dispatch(authLoadingHandler(false));
          triggerErrorMessage(null, e.code);
        }
      } else if (providerId) {
        dispatch(authLoadingHandler(false));
        dispatch(getProviderId(undefined));
        if (providerId.provider_id === 'google.com') {
          await handleLoginWithGoogle();
        } else if (providerId.provider_id === 'microsoft.com') {
          await handleLoginWithMicrosoft();
        }
      }
    };

    handleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authProviderResponse, providerId]);

  useEffect(() => {
    if (isLogin) {
      dispatch(doLoginRedirect(false));
      const url = new URL(window.location.href);
      const searchParams = new URLSearchParams(url.search);
      const { getwpmValue, getYearValue, getMonthValue } = destructurePathValues(searchParams);
      if (getwpmValue && getMonthValue && getYearValue) {
        const pathValues = {
          wpm: 'wpm',
          month: getMonthValue,
          year: getYearValue,
        };
        const additionalPath = generateAdditionalPath(pathValues);
        redirecrUserToDashboard(locale, additionalPath);
      } else {
        redirecrUserToDashboard(locale);
      }
      // setTimeout(() => {
      //   if (getwpmValue && getMonthValue && getYearValue) {
      //     const pathValues = {
      //       wpm: 'wpm',
      //       month: getMonthValue,
      //       year: getYearValue,
      //     };
      //     const additionalPath = generateAdditionalPath(pathValues);
      //     router.push(`/${locale}/dashboard${additionalPath}`);
      //   } else {
      //     router.push(`/${locale}/dashboard`);
      //   }
      // }, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, router]);

  useEffect(() => {
    if (!formValues.email) {
      setFormValues({
        ...formValues,
        email: emailRef?.current?.value || '',
        password: passwordRef?.current?.value || '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailRef]);

  useEffect(() => {
    if (isSessionCreated) {
      const auth = getAuth(app);
      const user = auth.currentUser;
      if (user) {
        if (!user.emailVerified) {
          dispatch({
            type: sagaActions.SEND_VERIFICATION_LINK,
            data: { email: user.email },
          });
        } else {
          dispatch({ type: sagaActions.GET_SUBSCRIPTION_DETAILS });
        }
      }
      dispatch(sendSessionCreateResponse(false));
    }
  }, [isSessionCreated]);

  useEffect(() => {
    if (isVerifyOTP) {
      const email = emailForCodeVerification || formValues.email || '';
      router.push(`/verifyCode?email=${encodeURIComponent(email)}`);
      dispatch(redirectToVerifyOTP(false));
      dispatch(getEmailForCodeVerification(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVerifyOTP]);
  useEffect(() => {
    if (isResubscribe) {
      const email = emailForCodeVerification || formValues.email || '';
      dispatch(callReSubscribe(false));
      const data = {
        email: email,
      };
      dispatch({ type: sagaActions.RESUBSCRIBE_USING_EMAIL, data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isResubscribe]);

  const handleTogglePassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const handleCreateNewAccount = () => {
    router.push('/register');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value.trim(),
    }));
  };

  const validateForm = (isForgotPassword: boolean) => {
    const field_required = intl?.formatMessage({
      id: `${errorMessages.field_required}`,
    });
    const invalid_email = intl?.formatMessage({
      id: `${errorMessages.invalid_email}`,
    });
    const password_validation = intl?.formatMessage({ id: `${errorMessages.password_validation}` });

    let isValid = true;
    const newErrors = { ...formErrors };

    if (!formValues.email) {
      newErrors.email = field_required;
      isValid = false;
    } else if (!formValues.email.match(regEx.email)) {
      newErrors.email = invalid_email;
      isValid = false;
    } else {
      newErrors.email = '';
    }

    if (!isForgotPassword) {
      if (!formValues.password) {
        newErrors.password = field_required;
        isValid = false;
      } else if (!regEx.password.test(formValues.password)) {
        newErrors.password = password_validation;
        isValid = false;
      } else {
        newErrors.password = '';
      }
    }

    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm(false)) {
      dispatch({
        type: sagaActions.GET_AUTH_PROVIDER,
        email_id: formValues.email,
      });
    }
  };

  const handleForgotPassword = () => {
    if (validateForm(true)) {
      const data = {
        email: formValues.email,
      };
      dispatch({ type: sagaActions.PASSWORD_RESET_LINK, data });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledMainContainer>
        <StyledFormContainer>
          <StyledStack sx={{ gap: '90px' }}>
            {/* <Image src={fynchLogo} alt='Fynch Logo' priority /> */}
            <ProductLogo />
            <Typography variant='title' sx={{ color: defaultStyle.sidebarAndAuthScreenTextColor }}>
              {intl?.formatMessage({ id: 'lets_get_started' })}
            </Typography>
          </StyledStack>
          <LoginFieldsBlock
            emailRef={emailRef}
            passwordRef={passwordRef}
            // enter_registered_email={renderInputFieldsPlaceholder('enter_registered_email', locale)}
            // password={renderInputFieldsPlaceholder('password', locale)}
            enter_registered_email={intl?.formatMessage({ id: 'enter_registered_email' })}
            password={intl?.formatMessage({ id: 'password' })}
            formErrors={formErrors}
            handleOnChange={handleOnChange}
            handleTogglePassword={handleTogglePassword}
            showPassword={showPassword}
            commonWidthHeight={commonWidthHeight}
            commonPlaceholderStyle={commonPlaceholderStyle}
          />
        </StyledFormContainer>
        <LoginActionBlock
          forgot_password={intl?.formatMessage({ id: 'forgot_password' })}
          sign_in={intl?.formatMessage({ id: 'sign_in' })}
          or={intl?.formatMessage({ id: 'or' })}
          create_new_account={intl?.formatMessage({ id: 'create_new_account' })}
          commonWidthHeight={commonWidthHeight}
          handleCreateNewAccount={handleCreateNewAccount}
          handleForgotPassword={handleForgotPassword}
          handleLoginWithMicrosoft={handleLoginWithMicrosoft}
          handleLoginWithGoogle={handleLoginWithGoogle}
          or_signin_with={intl?.formatMessage({ id: 'or_signin_with' })}
          // sign_in={renderButtonLabel('sign_in', locale)}
          // create_new_account={renderButtonLabel('create_new_account', locale)}
        />
      </StyledMainContainer>
    </form>
  );
}
