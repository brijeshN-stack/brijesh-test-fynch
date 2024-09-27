import { NextResponse, NextRequest } from 'next/server';
import { LOCALE, nl } from '@/utils/constants';
import { allowedLocales } from '@/utils/constants';
import { destructurePathValues, generateAdditionalPath } from './utils/helpers';

const rootRoute = ['/'];
const publicRoutes = ['/login', '/register', '/verifyCode', '/verifyEmail'];

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const path = req.nextUrl.pathname;  
  const { searchParams } = req.nextUrl;
  const { getwpmValue, getYearValue, getMonthValue } = destructurePathValues(searchParams);


}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/verifyEmail',
    '/:locale/dashboard',
    '/:locale/dashboard/my-vehicles',
    '/:locale/dashboard/my-address',
  ],
};
// const middlewareConfig = {
//   locales: [en, nl],
//   defaultLocale: DEFAULT_LOCALE,
// };
