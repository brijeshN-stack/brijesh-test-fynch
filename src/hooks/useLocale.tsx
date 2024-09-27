import { saveLocaleToCookies } from '@/app/actions';
import { LOCALE, allowedLocales, nl } from '@/utils/constants';
import { getBrowserLocale } from '@/utils/helpers';
import { useState, useEffect } from 'react';

export default function useLocale() {
  const [locale, setLocale] = useState<any>(null);

  useEffect(() => {
    const browserLocale = getBrowserLocale()?.slice(0, 2);
    const getLocaleFromLocalStorage = localStorage.getItem(LOCALE);
    let getLocale;
    if (getLocaleFromLocalStorage) {
      getLocale = getLocaleFromLocalStorage;
    } else if (allowedLocales.includes(browserLocale)) {
      getLocale = browserLocale;
    }
    setLocale(getLocale || nl);
    saveLocaleToCookies(getLocale || nl);
  }, [locale]);

  return [locale];
}
