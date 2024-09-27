'use server';

import { LOCALE } from '@/utils/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function saveTokenToCookies(token: any) {
  cookies().set('token', token, {
    secure: true,
    httpOnly: true,
  });
}

export async function removeTokenFromCookies() {
  cookies().delete('token');
}
export async function saveLocaleToCookies(locale: string) {
  cookies().set(LOCALE, locale);
}
export async function removeLocaleFromCookies() {
  cookies().delete(LOCALE);
}
export async function redirecrUserToDashboard(locale: string, additionalPath?: string) {
  if (additionalPath) {
    redirect(`/${locale}/dashboard${additionalPath}`);
  } else {
    redirect(`/${locale}/dashboard`);
  }
}
