'use client';

import React, { useLayoutEffect } from 'react';
import { LOCALE, allowedLocales, en } from '@/utils/constants';
import { saveLocaleToCookies } from '@/app/actions';

export default function DashboardLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  useLayoutEffect(() => {
    if (allowedLocales.includes(locale)) {
      localStorage.setItem(LOCALE, locale);
      saveLocaleToCookies(locale);
    }
  }, [locale]);

  return children;
}
