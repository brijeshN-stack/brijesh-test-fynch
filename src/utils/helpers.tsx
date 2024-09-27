"use client";

import AlertToastifyIcon from "@/assets/alertToastifyIcon";
import InfoToastifyIcon from "@/assets/infoToastifyIcon";
import SuccessToastifyIcon from "@/assets/successToastifyIcon";
import { toastr } from "react-redux-toastr";
import {
  getAuth,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { dispatch } from "@/redux/store";
import { sagaActions } from "@/redux/actions";
import app from "@/lib/firebase";
import {
  authLoadingHandler,
  doLogout,
  getEmailForCodeVerification,
} from "@/redux/slices/authSlice";
import { handlePageLoading } from "@/redux/slices/pageLoader";
import { createIntl } from "react-intl";
import enMessages from "../../messages/en.json";
import nlMessages from "../../messages/nl.json";
import { LicenseConfiguration } from "@/types";
import {
  allowedLocales,
  errorMessages,
  LOCALE,
  nl,
  warningMessages,
} from "@/utils/constants";
import { auth } from "@/lib/firebase";

interface Messages {
  [key: string]: { [key: string]: string };
}

const selectMessages: Messages = {
  en: enMessages,
  nl: nlMessages,
};

export const changeDateFormat = (date: any) => {
  const inputDate = new Date(date);

  const day = inputDate.getDate().toString().padStart(2, "0");
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const year = inputDate.getFullYear();

  return `${year}-${month}-${day}`;
};

const baseToastifyOptions = {
  timeOut: 3000,
  showCloseButton: true,
  closeOnToastrClick: true,
};

const successToastifyOptions = {
  ...baseToastifyOptions,
  icon: <SuccessToastifyIcon />,
};

const alertToastrOptions = {
  ...baseToastifyOptions,
  timeOut: 0,
  extendedTimeOut: 0,
  tapToDismiss: false,
  closeOnToastrClick: false,
  removeOnHover: false,
  removeOnHoverTimeOut: 0,
  icon: <AlertToastifyIcon />,
};

const infoToastrOptions = {
  ...baseToastifyOptions,
  timeOut: 0,
  extendedTimeOut: 0,
  tapToDismiss: false,
  closeOnToastrClick: false,
  removeOnHover: false,
  removeOnHoverTimeOut: 0,
  icon: <InfoToastifyIcon />,
};

export const translate = (id: string, values = {}) => {
  const browserLocale = getBrowserLocale()?.slice(0, 2);
  const getLocaleFromLocalStorage = localStorage.getItem(LOCALE);
  let getLocale;
  if (getLocaleFromLocalStorage) {
    getLocale = getLocaleFromLocalStorage;
  } else if (allowedLocales.includes(browserLocale)) {
    getLocale = browserLocale;
  }
  const intl = createIntl({
    locale: getLocale || nl,
    messages: selectMessages[getLocale || ""],
  });
  return intl.formatMessage({ id }, values);
};

export const triggerSuccessMessage = (message: any) => {
  const translatedText = translate(message);
  toastr.success("", translatedText, successToastifyOptions);
};

export const triggerErrorMessage = (
  error: any,
  customMessage?: keyof typeof errorMessages,
  otherMessages?: any,
) => {
  dispatch(handlePageLoading(false));
  const status = error ? error?.response?.data?.status : "";

  let message;
  if (error !== null && status !== 422) {
    message =
      error?.response?.data?.detail ||
      translate(errorMessages["something_went_wrong"]);
  } else if (customMessage) {
    const translatedText = translate(
      errorMessages[customMessage] || errorMessages["something_went_wrong"],
    );
    message = translatedText;
  } else if (otherMessages) {
    message = otherMessages;
  } else {
    message = translate(errorMessages["something_went_wrong"]);
  }
  toastr.success("", message, alertToastrOptions);
  if (status === 401) {
    dispatch(doLogout(true));
  }
};

export const triggerInfoMessage = (message: any) => {
  const translatedText = translate(message);
  toastr.success("", translatedText, infoToastrOptions);
};

export const filterPublicTransport = (data: any) => {
  const sequenceAndAllowedId = [
    1, 2, 3, 4, 5, 8, 9, 10, 33, 17, 18, 20, 28, 29, 14, 26, 30, 31,
  ];
  return sequenceAndAllowedId.reduce((acc: any, id) => {
    const object = data.find((item: any) => item.id === id);
    if (object) {
      acc.push(object);
    }
    return acc;
  }, []);
};

export const getFirstAndLastDateOfMonth = (startDate: Date | undefined) => {
  const now = startDate ? new Date(startDate) : new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const formattedFirstDate = changeDateFormat(firstDayOfMonth);
  const firstDayOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1,
  );
  const formattedLastDate = changeDateFormat(firstDayOfNextMonth);

  return { formattedFirstDate, formattedLastDate };
};

export const handleLoginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const auth = getAuth(app);
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const { user } = userCredential;
    dispatch(getEmailForCodeVerification(user?.email));
    dispatch({ type: sagaActions.CREATE_AUTH_SESSION });
    // await handleLoginWithProvider(user);
  } catch (e: any) {
    triggerErrorMessage(null, e.code);
  }
};

export const handleLoginWithMicrosoft = async () => {
  const provider = new OAuthProvider("microsoft.com");
  provider.setCustomParameters({
    prompt: "select_account",
  });
  const auth = getAuth(app);
  try {
    const userCredential = await signInWithPopup(auth, provider);
    const { user } = userCredential;
    dispatch(getEmailForCodeVerification(user?.email));
    dispatch({ type: sagaActions.CREATE_AUTH_SESSION });
    // await handleLoginWithProvider(user);
  } catch (e: any) {
    dispatch(authLoadingHandler(false));
    triggerErrorMessage(null, e.code);
  }
};
interface AdditionalUrlPath {
  wpm?: string | undefined;
  month?: string | number;
  year?: string | number;
}
export const generateAdditionalPath = (
  additionalUrlPath: AdditionalUrlPath,
) => {
  let queryParams = "";
  if (additionalUrlPath.wpm) {
    queryParams += "?wpm";
  }
  if (additionalUrlPath.month) {
    queryParams += queryParams ? `&month=${additionalUrlPath.month}` : "";
  }
  if (additionalUrlPath.year) {
    queryParams += queryParams ? `&year=${additionalUrlPath.year}` : "";
  }

  return queryParams;
};
export const destructurePathValues = (searchParams: any) => {
  const getwpmValue = searchParams.has("wpm");
  const getYearValue = searchParams.get("year");
  const getMonthValue = searchParams.get("month");
  return { getwpmValue, getYearValue, getMonthValue };
};

export const getMonthStartAndEndDatesForParams = (
  monthValue: number | undefined,
  yearValue: number | undefined,
) => {
  let firstDate;
  let lastDate;
  if (monthValue && yearValue) {
    firstDate = new Date(yearValue, monthValue - 1, 1);
    lastDate = new Date(yearValue, monthValue, 0);
  } else {
    firstDate = undefined;
    lastDate = undefined;
  }
  return { firstDate, lastDate };
};

// we changed the flow of register .so this will be remove once the flow is working perfectly
// const handleLoginWithProvider = async (user: any) => {
//   try {
//     dispatch(authLoadingHandler(true));
//     if (!user.emailVerified) {
//       const userEmail = user?.email;
//       const data = {
//         email: userEmail,
//       };
//       dispatch({
//         type: sagaActions.SEND_VERIFICATION_LINK,
//         data,
//       });
//     } else {
//       // const idToken = await user.getIdToken();
//       // await saveTokenToCookies(idToken);
//       // window.localStorage.setItem("token", idToken);
//       dispatch({ type: sagaActions.CREATE_AUTH_SESSION });
//     }
//   } catch (e: any) {
//     dispatch(authLoadingHandler(false));
//     triggerErrorMessage(null, e.code);
//   }
// };

export const filteredModalitiesOrVehicleClass = (
  data: any[],
  ids: (string | number)[],
) => {
  const filteredData = data?.filter((item) => ids.includes(item.id));
  return filteredData.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
};

export const handleWeekendRestrictions = (
  licenseDetails: LicenseConfiguration | undefined,
  date: Date | undefined,
  restrictBusinessTrip?: boolean,
  selectedPlace?: string | undefined,
) => {
  const isWeekend = (date: Date | undefined) => {
    const day = date && date.getDay();
    return day === 6 || day === 0;
  };
  if (
    (!licenseDetails && isWeekend(date)) ||
    (!licenseDetails && selectedPlace === "home")
  ) {
    triggerInfoMessage(
      restrictBusinessTrip
        ? warningMessages.cannot_addtrips_on_weekend_days
        : warningMessages.cannot_mark_weekend_days,
    );
    return true;
  }
  if (licenseDetails && !licenseDetails.allow_weekend_work && isWeekend(date)) {
    triggerInfoMessage(
      restrictBusinessTrip
        ? warningMessages.cannot_addtrips_on_weekend_days
        : warningMessages.cannot_mark_weekend_days,
    );
    return true;
  }
  if (
    licenseDetails &&
    !licenseDetails.allow_wfh_business_trips &&
    selectedPlace === "home"
  ) {
    triggerInfoMessage(
      restrictBusinessTrip
        ? warningMessages.cannot_addtrips_on_weekend_days
        : warningMessages.cannot_mark_weekend_days,
    );
    return true;
  }
  return false;
};

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}

export function responsiveFontSizes({
  xs,
  sm,
  md,
  lg,
}: {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}) {
  return {
    "@media (min-width:320px)": {
      fontSize: pxToRem(xs),
    },
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
  };
}

export function getBrowserLocale() {
  const browserLocale = navigator.language;
  return browserLocale;
}
export async function getIdToken() {
  if (auth.currentUser) {
    return await auth.currentUser.getIdToken();
  } else if (!auth.currentUser) {
    await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
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
  throw new Error("No current user");
}

// note:we have keep this commented code for the future if it require.if all the things are done then we can remvoe this

// export const renderInputFieldsPlaceholder = (id: string, locale: string) => {
//   const getPlaceholdersfromEnv = process.env.NEXT_PUBLIC_INPUT_FIELDS_PLACE_HOLDER;
//   try {
//     const getDynamicPlaceholders = JSON.parse(getPlaceholdersfromEnv || '{}');
//     const getPlaceholderValue = getDynamicPlaceholders[id];
//     if (getPlaceholderValue) {
//       return getPlaceholderValue[locale];
//     }
//     return translate(id);
//   } catch (e) {
//     return translate(id);
//   }
// };

// export const renderButtonLabel = (id: string, locale: string) => {
//   const getPlaceholdersfromEnv = process.env.NEXT_PUBLIC_BUTTON_LABEL;
//   try {
//     const getDynamicPlaceholders = JSON.parse(getPlaceholdersfromEnv || '{}');
//     const getPlaceholderValue = getDynamicPlaceholders[id];
//     if (getPlaceholderValue) {
//       return getPlaceholderValue[locale];
//     }
//     return translate(id);
//   } catch (e) {
//     return translate(id);
//   }
// };
