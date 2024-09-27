'use client';

import React from 'react';
import VerifyCode from '@/components/auth/verifyCode/VerifyCode';
import WrapperOfAuthScreen from '@/components/authScreenWrapper/WrapperOfAuthScreen';
import { useAppSelector } from '@/redux/hooks';
import { selectAuthLoading } from '@/redux/slices/authSlice';
import { RootState } from '@/redux/store';
import CircularLoader from '@/components/circularLoader/CircularLoader';

export default function VerifyCodePage() {
  const authLoading = useAppSelector((state: RootState) => selectAuthLoading(state));

  return (
    <>
      {authLoading && <CircularLoader />}
      <WrapperOfAuthScreen>
        <VerifyCode />
      </WrapperOfAuthScreen>
    </>
  );
}
