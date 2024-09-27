import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { defaultStyle } from '@/config/colorConfig';
import app from '@/lib/firebase';
import { nl, regEx, errorMessages } from '@/utils/constants';
import { handleLoginWithGoogle, handleLoginWithMicrosoft, triggerErrorMessage, triggerInfoMessage } from '@/utils/helpers';
import { sagaActions } from '@/redux/actions';
import { RootState, dispatch } from '@/redux/store';
import { useAppSelector } from '@/redux/hooks';
import {
  authLoadingHandler,
  callReSubscribe,
  doLoginRedirect,
  getEmailForCodeVerification,
  getProviderId,
  handleAuthProviderResponse,
  isProviderIdAvailable,
  redirectToVerifyOTP,
  selectEmailForCodeVerification,
  selectEmailSuccess,
  selectIsLogin,
  selectIsResubscribe,
  selectIsSessionCreated,
  selectIsVerifyOTP,
  selectProviderId,
  sendEmailSuccessResponse,
  sendSessionCreateResponse,
} from '@/redux/slices/authSlice';
import { useTranslate } from '@/hooks/useTranslate';
import { RegisterActionBlock, RegisterFieldsBlock, RegisterLogoTitleBlock, RegisterTermsAndConditionBlock } from '.';
import { StyledMainContainer, StyledStack } from '@/components/auth/style';
import useLocale from '@/hooks/useLocale';

type RegisterFormValue = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterFormErrors = {
  email: string;
  password: string;
  confirmPassword: string;
  termsOfUse: string;
};

export default function Register() {
  const [locale] = useLocale();

  const intl = useTranslate(locale);

  const router = useRouter();

  const authProviderResponse = useAppSelector((state: RootState) => isProviderIdAvailable(state));
  const emailSuccess = useAppSelector((state: RootState) => selectEmailSuccess(state));
  const isLogin = useAppSelector((state: RootState) => selectIsLogin(state));
  const providerId = useAppSelector((state: RootState) => selectProviderId(state));
  const isSessionCreated = useAppSelector((state: RootState) => selectIsSessionCreated(state));
  const isVerifyOTP = useAppSelector((state: RootState) => selectIsVerifyOTP(state));
  const emailForCodeVerification = useAppSelector((state: RootState) => selectEmailForCodeVerification(state));
  const isResubscribe = useAppSelector((state: RootState) => selectIsResubscribe(state));

  useEffect(() => {
    if (isLogin) {
      router.push(`/${locale}/dashboard`);
      dispatch(doLoginRedirect(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const [formValues, setFormValues] = useState<RegisterFormValue>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState<RegisterFormErrors>({
    email: '',
    password: '',
    confirmPassword: '',
    termsOfUse: '',
  });

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const handleRegister = async () => {
      if (authProviderResponse === 404) {
        dispatch(handleAuthProviderResponse(undefined));
        const { email, password } = formValues;
        const auth = getAuth(app);

        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const { user } = userCredential;
          if (user) {
            dispatch({ type: sagaActions.CREATE_AUTH_SESSION });
          }
          // if (!user.emailVerified) {
          //   dispatch({
          //     type: sagaActions.SEND_VERIFICATION_LINK,
          //     data: { email },
          //   });
          // }
        } catch (e: any) {
          // if (e.message && e.message.includes('auth/email-already-in-use')) {
          dispatch(authLoadingHandler(false));
          triggerErrorMessage(null, e?.code);
          //   const newErrors = { ...formErrors };
          //   newErrors.email = intl?.formatMessage({ id: `${errorMessages.email_exists}` });
          //   setFormErrors(newErrors);
          // } else {
          //   console.error('Error while signing in:', e?.message);
          // }
        }
      } else if (providerId) {
        dispatch(authLoadingHandler(false));
        dispatch(getProviderId(undefined));
        if (providerId.provider_id === 'google.com') {
          handleLoginWithGoogle();
        } else if (providerId.provider_id === 'microsoft.com') {
          handleLoginWithMicrosoft();
        }
      }
    };

    handleRegister();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authProviderResponse, providerId]);

  useEffect(() => {
    if (emailSuccess) {
      const email = emailForCodeVerification || formValues.email || '';
      router.push(`/verifyEmail/?email=${email}`);
      dispatch(sendEmailSuccessResponse(false));
      dispatch(getEmailForCodeVerification(undefined));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailSuccess, router]);

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
  const commonWidthHeight = {
    width: { sm: '370px', xs: '300px' },
    minHeight: '46px',
  };

  const commonPlaceholderStyle = {
    // opacity: "30%",
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    color: defaultStyle.whiteColor,
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const field_required = intl?.formatMessage({ id: `${errorMessages.field_required}` });
    const invalid_email = intl?.formatMessage({ id: `${errorMessages.invalid_email}` });
    const password_validation = intl?.formatMessage({ id: `${errorMessages.password_validation}` });
    const password_match = intl?.formatMessage({ id: `${errorMessages.password_match}` });
    const agree_to_terms_of_use = intl?.formatMessage({ id: `${errorMessages.agree_to_terms_of_use}` });
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

    if (!formValues.password) {
      newErrors.password = field_required;
      isValid = false;
    } else if (!regEx.password.test(formValues.password)) {
      newErrors.password = password_validation;
      isValid = false;
    } else {
      newErrors.password = '';
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = field_required;
      isValid = false;
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = password_match;
      isValid = false;
    } else {
      newErrors.confirmPassword = '';
    }
    if (!checked) {
      newErrors.termsOfUse = agree_to_terms_of_use;
      isValid = false;
    } else {
      newErrors.termsOfUse = '';
    }
    setFormErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch({
        type: sagaActions.GET_AUTH_PROVIDER,
        email_id: formValues.email,
      });
    }
  };
  const doLoginWithMicrosoft = () => {
    !checked ? triggerInfoMessage(errorMessages.agree_to_terms_of_use) : handleLoginWithMicrosoft();
  };
  const doLoginWithGoogle = () => {
    !checked ? triggerInfoMessage(errorMessages.agree_to_terms_of_use) : handleLoginWithGoogle();
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledMainContainer>
        <StyledStack sx={{ marginTop: '96px' }}>
          <RegisterLogoTitleBlock create_business_account={intl?.formatMessage({ id: 'create_business_account' })} />
          <RegisterFieldsBlock
            // enter_your_business_email={renderInputFieldsPlaceholder('enter_your_business_email', locale)}
            enter_your_business_email={intl?.formatMessage({ id: 'enter_your_business_email' })}
            // password={renderInputFieldsPlaceholder('password', locale)}
            password={intl?.formatMessage({ id: 'password' })}
            // confirm_password={renderInputFieldsPlaceholder('confirm_password', locale)}
            confirm_password={intl?.formatMessage({ id: 'password' })}
            formErrors={formErrors}
            handleOnChange={handleOnChange}
            commonPlaceholderStyle={commonPlaceholderStyle}
            commonWidthHeight={commonWidthHeight}
          />
          <RegisterTermsAndConditionBlock
            i_agree={intl?.formatMessage({ id: 'i_agree' })}
            terms_of_use={intl?.formatMessage({ id: 'terms_of_use' })}
            agree_to_terms_of_use={intl?.formatMessage({ id: 'agree_to_terms_of_use' })}
            checked={checked}
            setChecked={setChecked}
            locale={locale}
            formErrors={formErrors}
          />
        </StyledStack>
        <RegisterActionBlock
          // create_your_account={renderButtonLabel('create_your_account', locale)}
          create_your_account={intl?.formatMessage({ id: 'create_your_account' })}
          or_signup_with={intl?.formatMessage({ id: 'or_signup_with' })}
          have_an_account={intl?.formatMessage({ id: 'have_an_account' })}
          sign_in={intl?.formatMessage({ id: 'sign_in' })}
          handleLoginWithMicrosoft={doLoginWithMicrosoft}
          handleLoginWithGoogle={doLoginWithGoogle}
          commonWidthHeight={commonWidthHeight}
        />
      </StyledMainContainer>
    </form>
  );
}
