import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { createIntl } from 'react-intl';
import { en, nl } from './utils/constants';

export const locales: string[] = [en, nl];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();
  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

export async function getIntl(locale: any) {
  return createIntl({
    locale: locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  });
}
