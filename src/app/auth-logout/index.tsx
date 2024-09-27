'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { useAppSelector } from '@/redux/hooks';
import { RootState, dispatch } from '@/redux/store';
import { doLogout, selectIsLogout } from '@/redux/slices/authSlice';
import { removeLocaleFromCookies, removeTokenFromCookies } from '@/app/actions';
import { destructurePathValues, generateAdditionalPath, triggerErrorMessage } from '@/utils/helpers';
import { auth } from '@/lib/firebase';
import { SUBSCRIPTION_DETAILS } from '@/utils/constants';

type AuthLogoutProps = {
  children: React.ReactNode;
};

export default function AuthLogout({ children }: AuthLogoutProps) {
  const router = useRouter();

  const isLogout = useAppSelector((state: RootState) => selectIsLogout(state));
  useEffect(() => {
    if (isLogout) {
      const handleLogout = async () => {
        try {
          await signOut(auth);
          await removeTokenFromCookies();
          await removeLocaleFromCookies();
          localStorage.removeItem(SUBSCRIPTION_DETAILS);
          dispatch(doLogout(false));
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
            router.push(`/login${additionalPath}`);
          } else {
            router.push(`/login`);
          }
        } catch (error: any) {
          triggerErrorMessage(null, error?.code);
        }
      };
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogout]);

  return <>{children}</>;
}
