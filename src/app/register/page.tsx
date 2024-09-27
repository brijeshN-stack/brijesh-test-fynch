'use client';

import React from 'react';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import WrapperOfAuthScreen from '@/components/authScreenWrapper/WrapperOfAuthScreen';
import Register from '@/components/auth/register';
import CircularLoader from '@/components/circularLoader/CircularLoader';
import { selectAuthLoading } from '@/redux/slices/authSlice';

export default function RegisterPage() {
  const authLoading = useAppSelector((state: RootState) => selectAuthLoading(state));

  return (
    <>
      {authLoading && <CircularLoader />}
      <WrapperOfAuthScreen>
        <Register />
      </WrapperOfAuthScreen>
    </>
  );
}
