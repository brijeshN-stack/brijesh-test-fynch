'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import WrapperOfAuthScreen from '@/components/authScreenWrapper/WrapperOfAuthScreen';
import VerifyEmail from '@/components/auth/verifyEmail';
import { selectAuthLoading } from '@/redux/slices/authSlice';
import CircularLoader from '@/components/circularLoader/CircularLoader';

export default function VerifyEmailPage() {
  const authLoading = useAppSelector((state: RootState) => selectAuthLoading(state));
  return (
    <>
      {authLoading && <CircularLoader />}
      <WrapperOfAuthScreen>
        <VerifyEmail />
      </WrapperOfAuthScreen>
    </>
  );
}
