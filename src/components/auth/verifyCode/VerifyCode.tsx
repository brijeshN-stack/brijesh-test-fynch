'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslate } from '@/hooks/useTranslate';
import { RootState, dispatch } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import { useAppSelector } from '@/redux/hooks';
import { doLoginRedirect, selectIsLogin } from '@/redux/slices/authSlice';
import { errorMessages } from '@/utils/constants';
import { VerifyCodeLogoTitleBlockFieldAndActionBlock, VerifyCodeLogoTitleBlock } from '.';
import { StyledMainContainer, StyledStack } from '@/components/auth/style';
import useLocale from '@/hooks/useLocale';
import { saveLocaleToCookies } from '@/app/actions';

export default function VerifyCode() {
  const [locale] = useLocale();
  const isLogin = useAppSelector((state: RootState) => selectIsLogin(state));
  const router = useRouter();

  const [otpValue, setOtpValue] = useState<any>('');
  const [formErrors, setFormErrors] = useState<any>({
    otp: '',
  });
  const [queryValue, setQueryValue] = useState<string | undefined | null>();

  useEffect(() => {
    const url = new URL(window.location.href);
    const emailParams = new URLSearchParams(url.search);
    const getQueryValue = emailParams.get('email');
    setQueryValue(getQueryValue);
  }, []);

  useEffect(() => {
    if (isLogin) {
      router.push(`/${locale}/dashboard`);
      dispatch(doLoginRedirect(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  const intl = useTranslate(locale);

  const commonWidthHeight = {
    width: { sm: '370px', xs: '300px' },
    height: '46px',
  };

  const handleOtpValueChange = (e: any) => {
    setOtpValue(e.target.value.trim());
  };

  const validateForm = () => {
    const field_required = intl?.formatMessage({
      id: `${errorMessages.field_required}`,
    });
    // const invalid_otp = intl?.formatMessage({
    //   id: `${errorMessages.invalid_email}`,
    // });
    let isValid = true;
    const newErrors = { ...formErrors };
    if (!otpValue) {
      newErrors.otp = field_required;
      isValid = false;
    }
    //  else if (!otpValue.match(otpRegex)) {
    //   newErrors.email = invalid_otp;
    //   isValid = false;
    // }
    else {
      newErrors.otp = '';
    }
    setFormErrors(newErrors);
    return isValid;
  };

  const handleVerifyOtp = () => {
    if (validateForm()) {
      const data = {
        email: queryValue,
        code: otpValue,
      };
      saveLocaleToCookies(locale);
      dispatch({ type: sagaActions.VERIFY_USER_SUBSCRIPTIONS, data });
    }
  };

  const handleSignInActionFunction = () => {
    dispatch({ type: sagaActions.DELETE_AUTH_SESSION });
    router.push('/login');
  };

  return (
    <Suspense>
      <StyledMainContainer>
        <StyledStack sx={{ gap: '15px', marginTop: { sm: '96px', xs: '60px' } }}>
          <VerifyCodeLogoTitleBlock
            could_not_match_email={intl?.formatMessage({ id: 'could_not_match_email' })}
            enter_registration_code={intl?.formatMessage({
              id: 'enter_registration_code',
            })}
          />
          <VerifyCodeLogoTitleBlockFieldAndActionBlock
            commonWidthHeight={commonWidthHeight}
            // enter_your_code={renderInputFieldsPlaceholder('enter_your_code', locale)}
            enter_your_code={intl?.formatMessage({ id: 'enter_your_code' })}
            have_an_account={intl?.formatMessage({ id: 'have_an_account' })}
            sign_in={intl?.formatMessage({ id: 'sign_in' })}
            // verify_and_proceed={renderButtonLabel('verify_and_proceed', locale)}
            verify_and_proceed={intl?.formatMessage({ id: 'verify_and_proceed' })}
            email={queryValue}
            handleChange={(e: any) => handleOtpValueChange(e)}
            value={otpValue}
            handleClick={handleVerifyOtp}
            formErrors={formErrors}
            handleSignInActionFunction={handleSignInActionFunction}
          />
        </StyledStack>
      </StyledMainContainer>
    </Suspense>
  );
}
