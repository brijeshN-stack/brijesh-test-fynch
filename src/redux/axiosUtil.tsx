import axios from 'axios';
import { auth } from '@/lib/firebase';
import { triggerErrorMessage } from '@/utils/helpers';
import { API_URL, LOCALE } from '@/utils/constants';

type callApiProps = {
  url: string;
  method: string;
  data?: any;
};

export const callApi = async ({ url, method, data }: callApiProps) => {
  const mainUrl = `${API_URL}${url}`;
  const locale = window.localStorage.getItem(LOCALE);

  let token;

  if (auth.currentUser) {
    try {
      token = await auth.currentUser.getIdToken();
    } catch (error: any) {
      triggerErrorMessage(null, error?.code);
    }
  }

  if (!token) {
    token = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(async user => {
        if (user) {
          try {
            const userToken = await user.getIdToken();
            resolve(userToken);
          } catch (error: any) {
            reject(error);
            triggerErrorMessage(null, error?.code);
          }
        } else {
          resolve(undefined);
        }
        unsubscribe();
      });
    });
  }

  const headers = {
    Authorization: `Bearer ${token}`,
    'Accept-Language': locale,
  };

  return await axios({
    url: mainUrl,
    method,
    data,
    headers,
  });
};
