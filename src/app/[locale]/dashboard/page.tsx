'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { getAuth } from 'firebase/auth';
import { ref as dbRef, get } from 'firebase/database';
import Calendar from '@/components/calendar/Calendar';
import Statistics from '@/components/statistics/Statistics';
import AddTripSection from '@/components/addTripSection/AddTripSection';
import SubmitExpenseDialog from '@/components/tripExpense/SubmitExpenseDialog';
import MonthPicker from '@/components/monthPicker';
import { dispatch } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import { useAppSelector } from '@/redux/hooks';
import { RootState } from '@/redux/store';
import { selectMonthlyTrips, selectSubmitExpenseVisibility, selectTrips } from '@/redux/slices/tripsSlice';
import {
  changeDateFormat,
  destructurePathValues,
  getFirstAndLastDateOfMonth,
  getMonthStartAndEndDatesForParams,
  handleWeekendRestrictions,
  triggerInfoMessage,
} from '@/utils/helpers';
import app, { db } from '@/lib/firebase';
import { useTranslate } from '@/hooks/useTranslate';
import { homeAddress, selectLicenseConfigDetails, subscription } from '@/redux/slices/profileSlice';
import {
  days,
  defaultRequireModalities,
  getRequiredModalitiesFromEnv,
  LOCALE,
  months,
  nl,
  SUBSCRIPTION_DETAILS,
  warningMessages,
} from '@/utils/constants';
import RestrictUserDialog from '@/components/restrictUserDialog/RestrictUserDialog';
import { vehicles } from '@/redux/slices/vehiclesSlice';

export default function Dashboard() {
  const [monthAndYearValueFromParams, setMonthAndYearValueFromParams] = useState<any>({
    monthValue: undefined,
    yearValue: undefined,
  });
  console.log(process.env.NODE_ENV, '+++');

  const [locale, setLocale] = useState<any>(null);
  const [licenseDataFromLocal, setLicensetDataFromLocal] = useState<any>();
  const [submitExpenseButtonVisibility, setSubmitExpenseButtonVisibility] = useState<boolean>(false);
  const [startDate, setStartDate] = useState(new Date());

  useEffect(() => {
    const getLocale: any = localStorage.getItem(LOCALE);
    setLocale(getLocale);
  }, [locale]);

  const intl = useTranslate(locale);

  const customLocale = {
    localize: {
      day: (n: number) => {
        if (intl) {
          return intl.formatMessage({ id: days[n] });
        }
      },
      month: (n: number) => {
        if (intl) {
          return intl.formatMessage({ id: months[n] });
        }
      },
    },
    formatLong: {
      date: () => 'mm/dd/yyyy',
    },
  };

  useEffect(() => {
    const { formattedFirstDate, formattedLastDate } = getFirstAndLastDateOfMonth(undefined);
    dispatch({
      type: sagaActions.GET_MONTHLY_TRIPS,
      since_date: formattedFirstDate,
      until_date: formattedLastDate,
    });
    dispatch({ type: sagaActions.GET_VEHICLE_REQUEST });
    dispatch({ type: sagaActions.GET_VEHICLE_CLASS });
    dispatch({ type: sagaActions.GET_HOME_ADDRESS, typeOfAddress: 'home' });
    const getSubscriptionDataFromLocal = JSON.parse(localStorage.getItem(SUBSCRIPTION_DETAILS) || '{}');
    if (getSubscriptionDataFromLocal) {
      setLicensetDataFromLocal(getSubscriptionDataFromLocal);
    }
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const { getwpmValue, getYearValue, getMonthValue } = destructurePathValues(searchParams);
    if (getwpmValue && getMonthValue && getYearValue) {
      setMonthAndYearValueFromParams({
        monthValue: getMonthValue,
        yearValue: getYearValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useMemo(() => {
    const { firstDate } = getMonthStartAndEndDatesForParams(monthAndYearValueFromParams.monthValue, monthAndYearValueFromParams.yearValue);
    if (firstDate) {
      setStartDate(firstDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthAndYearValueFromParams.monthValue]);
  const licenseDetails = useAppSelector((state: RootState) => selectLicenseConfigDetails(state));
  const subscriptionDetails = licenseDetails || (licenseDataFromLocal && licenseDataFromLocal?.license?.config);
  const getSubscriptionDetails: any = useAppSelector((state: RootState) => subscription(state));

  const getSubmitExpenseVisibility = useAppSelector((state: RootState) => selectSubmitExpenseVisibility(state));

  useEffect(() => {
    if (licenseDataFromLocal) {
      const allowedType = ['bundle', 'api', 'manual'];
      const isExpenseReportTypeAllowed = licenseDataFromLocal?.license?.expense_report;
      if (allowedType.includes(isExpenseReportTypeAllowed)) {
        setSubmitExpenseButtonVisibility(true);
      } else {
        setSubmitExpenseButtonVisibility(false);
      }
    }
  }, [licenseDataFromLocal]);

  const getHomeAddress = useAppSelector((state: RootState) => homeAddress(state));
  const getVehicles = useAppSelector((state: RootState) => vehicles(state));
  const [selectedPlaceInCalendar, setSelectedPlaceInCalendar] = useState<string | undefined>();
  const [selectedPlaceInTripSection, setSelectedPlaceInTripSection] = useState<string | undefined>();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [restrictUserDialog, setRestrictUserDialog] = useState<boolean>(false);
  const [showMissingDetails, setShowMissingDetails] = useState({
    isAddressesMissing: false,
    isDefaultModalityIdMissing: false,
    isAllDetailsMissing: false,
    isPersonalVehicleNotAdded: false,
  });
  const [selectMonthDialogOpen, setSelectMonthDialogOpen] = useState<boolean>(false);
  const [buttonHovered, setButtonHovered] = useState<boolean>(false);
  const [dateSelectedInCalendar, setDateSelectedInCalendar] = useState<Date | undefined>();

  const fullMonth = startDate && startDate.toLocaleString('default', { month: 'long' });
  const fullYear = startDate && startDate.getFullYear();
  const fullMonthOfSelectedInCalendar = dateSelectedInCalendar && dateSelectedInCalendar.toLocaleString('default', { month: 'long' });
  const monthAsPerLocale =
    intl && fullMonthOfSelectedInCalendar && intl.formatMessage({ id: fullMonthOfSelectedInCalendar?.toLowerCase() }).slice(0, 3);
  const day = dateSelectedInCalendar && dateSelectedInCalendar.getDate();
  const dayAndMonth = `${day} ${monthAsPerLocale}`;
  const trips = useAppSelector((state: RootState) => selectTrips(state));
  const monthlyTrips = useAppSelector((state: RootState) => selectMonthlyTrips(state));

  const handleMouseEnter = () => {
    setButtonHovered(true);
  };

  const handleMouseLeave = () => {
    setButtonHovered(false);
  };

  const handleSubmitExpense = () => {
    if ((Array.isArray(getHomeAddress) && getHomeAddress.length === 0) || !getHomeAddress) {
      triggerInfoMessage(warningMessages.submit_expense_validation);
    } else if (monthAndYearValueFromParams.monthValue && monthAndYearValueFromParams.yearValue) {
      const selectedYear = parseInt(monthAndYearValueFromParams.yearValue);
      const selectedMonth = parseInt(monthAndYearValueFromParams.monthValue, 10);
      dispatch({
        type: sagaActions.SUBMIT_WPM_EXPENSES,
        year: selectedYear,
        month: selectedMonth,
      });
    } else {
      setDialogOpen(true);
      dispatch({ type: sagaActions.GET_EXPENSE_REPORTS });
    }
  };

  const handleMonthDialogClose = () => {
    setSelectMonthDialogOpen(false);
  };

  const handleDateChangeInCalendar = async (date: Date) => {
    const auth = getAuth(app);
    const { currentUser } = auth;
    const userId = currentUser?.uid;

    setDateSelectedInCalendar(date);
    const formattedDate = changeDateFormat(date);
    const userRef = dbRef(db, `users-info/${userId}`);
    const snapshot = await get(userRef);
    const getOffsetInSeconds = new Date().getTimezoneOffset() * 60;

    const data = {
      wfh: true,
    };

    const getDefaultOfficeId = snapshot?.val()?.default_office_id;
    const getDefaultModalityId = snapshot?.val()?.default_modality_id;
    const wfoData = {
      office_address_id: getDefaultOfficeId || '',
      utcoffset: -getOffsetInSeconds,
      modality_id: getDefaultModalityId || '',
      country: nl,
    };
    const isTripAvailable = monthlyTrips.find((day: any) => day.date === formattedDate);
    if (isTripAvailable && isTripAvailable.wfh) {
      setSelectedPlaceInTripSection('home');
    } else if (isTripAvailable && isTripAvailable.wfo) {
      setSelectedPlaceInTripSection('office');
    } else if (!isTripAvailable || (isTripAvailable && (!isTripAvailable.wfh || !isTripAvailable.wfo))) {
      setSelectedPlaceInTripSection(undefined);
    }

    const handleWFHTrip = () => {
      // setDateSelectedInCalendar(undefined);
      if (isTripAvailable?.wfh) {
        dispatch({
          type: sagaActions.UPDATE_DEFAULT_TRIP,
          date: formattedDate,
          data: { wfh: false },
        });
      } else {
        if (isTripAvailable?.wfo) {
          triggerInfoMessage(warningMessages.wfo_already_selected);
        } else if (!handleWeekendRestrictions(subscriptionDetails, date)) {
          dispatch({
            type: sagaActions.ADD_DEFAULT_TRIP_FROM_CALENDAR,
            date: formattedDate,
            data,
          });
        }
      }
    };

    const handleWFOTrip = () => {
      // setDateSelectedInCalendar(undefined);
      if (isTripAvailable?.wfo) {
        dispatch({
          type: sagaActions.DELETE_WFO_DEFAULT_TRIP,
          date: formattedDate,
        });
      } else {
        if (isTripAvailable?.wfh) {
          triggerInfoMessage(warningMessages.wfh_already_selected);
        } else if (!handleWeekendRestrictions(subscriptionDetails, date)) {
          dispatch({
            type: sagaActions.ADD_WFO_DEFAULT_TRIP,
            date: formattedDate,
            data: wfoData,
          });
        }
      }
    };
    let missingDetails = {
      isAddressesMissing: false,
      isDefaultModalityIdMissing: false,
      isAllDetailsMissing: false,
      isPersonalVehicleNotAdded: false,
    };
    const isPersonalVehicleAvailable = () => {
      let modalitiesId;
      try {
        if (getRequiredModalitiesFromEnv) {
          modalitiesId = JSON.parse(getRequiredModalitiesFromEnv);
        } else {
          modalitiesId = defaultRequireModalities;
        }
      } catch (e) {
        modalitiesId = defaultRequireModalities;
      }

      const requiredModalitiesId: {
        2: number[];
        3: number[];
        21: number[];
        11: number[];
      } = modalitiesId;

      let isValid = false;
      const defaultModalitiesId = [3, 21, 11, 2];
      const isGroupOfVehicleExists = requiredModalitiesId[getDefaultModalityId as 2 | 3 | 11 | 21];
      const isPersonalVehicleExist = getVehicles.some((item: any) => isGroupOfVehicleExists?.includes(item.modality_id));
      if (defaultModalitiesId.includes(getDefaultModalityId) && !isPersonalVehicleExist) {
        isValid = true;
      }
      return isValid;
    };

    if (selectedPlaceInCalendar === 'home') {
      setDateSelectedInCalendar(undefined);
      handleWFHTrip();
    } else if (selectedPlaceInCalendar === 'office') {
      setDateSelectedInCalendar(undefined);
      switch (true) {
        case !getDefaultModalityId &&
          !getDefaultOfficeId &&
          ((Array.isArray(getHomeAddress) && getHomeAddress.length === 0) || !getHomeAddress):
          setShowMissingDetails({
            ...missingDetails,
            isAllDetailsMissing: true,
          });
          setRestrictUserDialog(true);
          break;
        case (Array.isArray(getHomeAddress) && getHomeAddress.length === 0) || !getHomeAddress || !getDefaultOfficeId:
          setShowMissingDetails({
            ...missingDetails,
            isAddressesMissing: true,
          });
          setRestrictUserDialog(true);
          break;
        case !getDefaultModalityId:
          setShowMissingDetails({
            ...missingDetails,
            isDefaultModalityIdMissing: true,
          });
          setRestrictUserDialog(true);
          break;
        case isPersonalVehicleAvailable():
          setShowMissingDetails({
            ...missingDetails,
            isPersonalVehicleNotAdded: true,
          });
          setRestrictUserDialog(true);
          break;
        default:
          handleWFOTrip();
      }
    } else {
      dispatch({ type: sagaActions.GET_TRIPS_BY_DATE, date: formattedDate });
    }
  };

  useEffect(() => {
    const { formattedFirstDate, formattedLastDate } = getFirstAndLastDateOfMonth(startDate);
    dispatch({
      type: sagaActions.GET_MONTHLY_TRIPS,
      since_date: formattedFirstDate,
      until_date: formattedLastDate,
    });
    setSelectMonthDialogOpen(false);
    setDateSelectedInCalendar(undefined);
    setSelectedPlaceInCalendar(undefined);
  }, [startDate]);
  const handleMonthChange = (date: Date) => {
    setStartDate(date);
  };
  // const appLinks = {
  //   androidLink: process?.env?.NEXT_PUBLIC_ANDROID_APP_DOWNLOAD_LINK,
  //   iosLink: process?.env?.NEXT_PUBLIC_IOS_APP_DOWNLOAD_LINK,
  // };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { sm: 'center', lg: 'normal' },
          height: `calc(100% - 79px)`,
          padding: { xs: '15px 38px 75px', sm: '15px 48px 75px' },
          overflowY: 'scroll',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            border: '4px solid #E1E1E1',
            borderRadius: '10px',
          },
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: {
              md: 'center !important',
              xl: 'flex-start !important',
            },
            '@media (max-width: 899px)': {
              alignItems: 'center',
            },
            width: '100%',
          }}>
          <Stack
            gap={1.75}
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'left' },
            }}>
            <Calendar
              handleMonthChange={handleMonthChange}
              setSelectMonthDialogOpen={setSelectMonthDialogOpen}
              customLocale={customLocale}
              fullYear={fullYear}
              fullMonth={intl?.formatMessage({ id: fullMonth.toLowerCase() })}
              calendar_button_suggestion={intl?.formatMessage({ id: 'calendar_button_suggestion' })}
              // work_from_home={renderButtonLabel('work_from_home', locale)}
              // work_from_office={renderButtonLabel('work_from_office', locale)}
              work_from_home={intl?.formatMessage({ id: 'work_from_home' })}
              work_from_office={intl?.formatMessage({ id: 'work_from_office' })}
              work_from_home_suggestion={intl?.formatMessage({ id: 'work_from_home_suggestion' })}
              work_from_office_suggestion={intl?.formatMessage({ id: 'work_from_office_suggestion' })}
              tripsData={monthlyTrips}
              selectedDate={dateSelectedInCalendar}
              startDate={startDate}
              selectedPlaceInCalendar={selectedPlaceInCalendar}
              setSelectedPlaceInCalendar={setSelectedPlaceInCalendar}
              setSelectedDate={setDateSelectedInCalendar}
              handleDateChangeInCalendar={handleDateChangeInCalendar}
              monthAndYearValueFromParams={monthAndYearValueFromParams}
            />
            <AddTripSection
              selectedPlaceInCalendar={selectedPlaceInCalendar}
              select_date_from_calendar={intl?.formatMessage({
                id: monthAndYearValueFromParams.monthValue ? 'submit_the_registration' : 'select_date_from_calendar',
              })}
              work_from_home={intl?.formatMessage({ id: 'work_from_home' })}
              no_data_available={intl?.formatMessage({ id: 'no_data_available' })}
              work_from_office={intl?.formatMessage({ id: 'work_from_office' })}
              add_trip={intl?.formatMessage({ id: 'add_trip' })}
              edit={intl?.formatMessage({ id: 'edit' })}
              delete_trip_confirmation_message={intl?.formatMessage({ id: 'delete_trip_confirmation_message' })}
              // yes={renderButtonLabel('yes', locale)}
              // no={renderButtonLabel('no', locale)}
              yes={intl?.formatMessage({ id: 'yes' })}
              no={intl?.formatMessage({ id: 'no' })}
              carpoolText={intl?.formatMessage({ id: 'carpool' })}
              passengerText={intl?.formatMessage({ id: 'passenger' })}
              peopleText={intl?.formatMessage({ id: 'people' })}
              driverText={intl?.formatMessage({ id: 'driver' })}
              startDate={startDate}
              setSelectedPlace={setSelectedPlaceInTripSection}
              tripsData={trips}
              dayAndMonth={dayAndMonth}
              selectedPlace={selectedPlaceInTripSection}
              dateSelectedInCalendar={dateSelectedInCalendar}
              intl={intl}
            />
          </Stack>
        </Box>
        <Box sx={{ maxWidth: { xs: '545px', md: '1047px' }, width: '100%', height: '167px', marginTop: '18px' }}>
          <Statistics
            heading={intl?.formatMessage({ id: 'statistic_heading' })}
            co2_footprints={intl?.formatMessage({ id: 'co2_footprints' })}
            total_co2_footprints={intl?.formatMessage({ id: 'total_co2_footprints' })}
            bicycle_km={intl?.formatMessage({ id: 'bicycle_km' })}
            business_trip={intl?.formatMessage({ id: 'business_trip' })}
            work_from_home={intl?.formatMessage({ id: 'work_from_home' })}
            work_from_office={intl?.formatMessage({ id: 'work_from_office' })}
            gm_km={intl?.formatMessage({ id: 'gm_km' })}
            kg={intl?.formatMessage({ id: 'kg' })}
            // submit_expense={renderButtonLabel('submit_expense', locale)}
            submit_expense={intl?.formatMessage({
              id: monthAndYearValueFromParams.monthValue ? 'submit_registration_button_text' : 'submit_expense',
            })}
            handleSubmitExpense={handleSubmitExpense}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            submitExpenseVisibility={
              monthAndYearValueFromParams.monthValue ? true : getSubmitExpenseVisibility || submitExpenseButtonVisibility
            }
          />
        </Box>
        <MonthPicker
          customLocale={customLocale}
          startDate={startDate}
          setStartDate={setStartDate}
          handleMonthDialogClose={handleMonthDialogClose}
          selectMonthDialogOpen={selectMonthDialogOpen}
        />
        <SubmitExpenseDialog
          intl={intl}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          licenseDataFromLocal={licenseDataFromLocal}
        />
        <RestrictUserDialog
          showMissingDetails={showMissingDetails}
          setRestrictUserDialog={setRestrictUserDialog}
          restrictUserDialog={restrictUserDialog}
          add_your_addresses_heading={intl?.formatMessage({ id: 'add_your_addresses_heading' })}
          add_your_addresses_details={intl?.formatMessage({ id: 'add_your_addresses_details' })}
          select_mode_of_transport_heading={intl?.formatMessage({ id: 'select_mode_of_transport_heading' })}
          select_mode_of_transport_details={intl?.formatMessage({ id: 'select_mode_of_transport_details' })}
          add_a_personal_vehicle_heading={intl?.formatMessage({ id: 'add_a_personal_vehicle_heading' })}
          add_a_personal_vehicle_details={intl?.formatMessage({ id: 'add_a_personal_vehicle_details' })}
          add_all_missing_details_heading={intl?.formatMessage({ id: 'add_all_missing_details_heading' })}
          add_all_missing_details_text={intl?.formatMessage({ id: 'add_all_missing_details_text' })}
        />
      </Box>
    </>
  );
}
{
  /* <Typography variant='subHeading' color={`${defaultStyle.primaryColor} !important`} marginTop={2.75}>
                {intl?.formatMessage({ id: 'download_the_app' })}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Typography fontSize={'10px'} lineHeight={'20px'} fontWeight={300} width={'215px'} color='#535353 !important'>
                  {intl?.formatMessage({ id: 'to_explore_full_potential_text' })}
                </Typography>
                <Box sx={{ display: 'flex' }}>
                  <DownloadLogoWrapper sx={{ background: defaultStyle.primaryColor }}>
                    <Link href={appLinks.androidLink || ''} target={appLinks.androidLink ? '_blank' : ''}>
                      <Android />
                    </Link>
                  </DownloadLogoWrapper>
                  <DownloadLogoWrapper
                    sx={{
                      background: defaultStyle.secondaryColor,
                      marginInlineStart: '9px',
                    }}>
                    <Link href={appLinks.iosLink || ''} target={appLinks.iosLink ? '_blank' : ''}>
                      <Ios />
                    </Link>
                  </DownloadLogoWrapper>
                </Box>
              </Box> */
}
