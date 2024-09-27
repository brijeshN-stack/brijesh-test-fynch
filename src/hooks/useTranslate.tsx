import { useEffect, useState } from 'react';
import { getIntl } from '@/i18n';
import { handlePageLoading } from '@/redux/slices/pageLoader';
import { dispatch } from '@/redux/store';
import { triggerErrorMessage } from '@/utils/helpers';

export function useTranslate(locale: string) {
  const [intl, setIntl] = useState<any>(null);

  useEffect(() => {
    async function fetchIntl() {
      dispatch(handlePageLoading(true));
      try {
        if (locale) {
          const intlObject = await getIntl(locale);
          setIntl(intlObject);
        }
      } catch (error: any) {
        dispatch(handlePageLoading(false));
        triggerErrorMessage(error);
      } finally {
        dispatch(handlePageLoading(false));
      }
    }

    fetchIntl();
  }, [locale]);

  return intl;
}
