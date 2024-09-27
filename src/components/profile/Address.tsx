import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { get, ref as dbRef, set } from 'firebase/database';
import CancelIcon from '@/assets/cancelIcon';
import { defaultStyle } from '@/config/colorConfig';
import { useAppSelector } from '@/redux/hooks';
import {
  getStationGooglePlaceAutocomplete,
  googlePlacesAutocomplete,
  officeAddress,
  placesAutocomplete,
  placesAutocompleteLatLng,
  profileLoader,
  selectStatioAddressLatLng,
  selectStationAddressSuggestion,
} from '@/redux/slices/profileSlice';
import { dispatch, RootState } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import { db } from '@/lib/firebase';
import { triggerErrorMessage, triggerInfoMessage, triggerSuccessMessage } from '@/utils/helpers';
import { nl, successMessages, warningMessages } from '@/utils/constants';
import CustomAutocomplete from '@/components/autocomplete/CustomAutocomplete';
import ArrowBackIcon from '@/assets/profileIcon/ArrowBackIcon';
import SwitchButton from '@/components/switch/SwitchButton';
import SelectDropdown from '@/components/selectDropdownWithIcons/SelectDropdown';
export interface AddressProps {
  handleClose?: () => void;
  setSelectedOption?: any;
  isMobile?: any;
  currentUser?: any;
  showHomeAddress?: any;
  showStationAddress?: any;
  officeDefaultAddress?: any;
  neverTake_train?: boolean | undefined;
  setShowHomeAddress?: (value: string | undefined) => void;
  setShowStationAddress?: (value: string | undefined) => void;
  setOfficeDefaultAddress?: (value: string | undefined) => void;
  setNeverTakeTrain?: (value: boolean | undefined) => void;
  intl?: any;
  homeAddressId?: number;
  stationAddressId?: number;
}

export default function Address({
  handleClose,
  setSelectedOption,
  isMobile,
  currentUser,
  showHomeAddress,
  showStationAddress,
  officeDefaultAddress,
  neverTake_train,
  setShowHomeAddress,
  setShowStationAddress,
  setOfficeDefaultAddress,
  setNeverTakeTrain,
  intl,
  homeAddressId,
  stationAddressId,
}: AddressProps) {
  const getOfficeAddress = useAppSelector((state: RootState) => officeAddress(state));
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [userData, setUserData] = useState<any>(null);
  const [homeAddressValue, setHomeAddressValue] = useState<any | null>(null);
  const [homeAddressInputValue, setHomeAddressInputValue] = useState<any | null>(showHomeAddress);
  const [stationAddressValue, setStationAddressValue] = useState<any | null>(null);
  const [stationAddressInputValue, setStationAddressInputValue] = useState<any | null>(showStationAddress);
  const [addressSuggestion, setAddressSuggestion] = useState<any>([]);
  const [stationAddressSuggestion, setStationAddressSuggestion] = useState<any>([]);
  const getGooglePlacesAutocomplete = useAppSelector((state: RootState) => placesAutocomplete(state));
  const stationPlaceSuggestion = useAppSelector((state: RootState) => selectStationAddressSuggestion(state));
  const getGooglePlacesAutocompleteLatLng = useAppSelector((state: RootState) => placesAutocompleteLatLng(state));
  const staionAddressLatLng = useAppSelector((state: RootState) => selectStatioAddressLatLng(state));

  const commonStyle = {
    textTransform: 'capitalize',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '20px',
  };

  const handleClickBack = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setSelectedOption('');
    }
  };

  const selectValue = getOfficeAddress?.map((item: any) => ({
    name: item.formatted,
    value: item.id,
  }));

  const handleChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    if (currentUser && selectedValue !== '') {
      dispatch(profileLoader(true));
      const updateUser = async () => {
        try {
          await set(dbRef(db, `users-info/${currentUser?.uid}/default_office_id`), selectedValue);
          setOfficeDefaultAddress && setOfficeDefaultAddress(selectedValue);
          dispatch(profileLoader(false));
          triggerSuccessMessage(successMessages.user_default_address_set_successfully);
          fetchUserData();
        } catch (error: any) {
          dispatch(profileLoader(false));
          triggerErrorMessage(null, error?.code);
        }
      };
      updateUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, selectedValue]);

  const fetchUserData = async () => {
    dispatch(profileLoader(true));
    try {
      const userRef = dbRef(db, `users-info/${currentUser?.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
      } else {
        triggerInfoMessage(warningMessages.no_data_available);
      }
    } catch (error: any) {
      dispatch(profileLoader(false));
      triggerErrorMessage(null, error?.code);
    } finally {
      dispatch(profileLoader(false));
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchUserData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    const addressId = userData?.default_office_id;
    if (addressId) {
      dispatch({ type: sagaActions.GET_OFFICE_DEFAULT_ADDRESS, addressId });
    }
  }, [userData]);

  // Trains changes
  const [checked, setChecked] = useState<boolean | undefined>(neverTake_train);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (homeAddressInputValue) {
        dispatch({
          type: sagaActions.GET_GOOGLE_PLACES_AUTOCOMPLETE_SUGGESTION,
          query: homeAddressInputValue,
          typeHome: true,
        });
      }
      if (homeAddressInputValue === '') {
        setAddressSuggestion(homeAddressValue ? [homeAddressValue] : []);
        return undefined;
      }
    }, 500);
    if (!homeAddressInputValue) {
      dispatch(googlePlacesAutocomplete([]));
    }
    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeAddressInputValue]);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (stationAddressInputValue) {
        dispatch({
          type: sagaActions.GET_GOOGLE_PLACES_AUTOCOMPLETE_SUGGESTION,
          query: stationAddressInputValue,
          typeStation: true,
        });
      }
      if (stationAddressInputValue === '') {
        setStationAddressSuggestion(stationAddressValue ? [stationAddressValue] : []);
        return undefined;
      }
    }, 500);
    if (!stationAddressInputValue) {
      dispatch(getStationGooglePlaceAutocomplete([]));
    }
    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationAddressInputValue]);

  useEffect(() => {
    setAddressSuggestion(getGooglePlacesAutocomplete);
  }, [getGooglePlacesAutocomplete]);
  useEffect(() => {
    setStationAddressSuggestion(stationPlaceSuggestion);
  }, [stationPlaceSuggestion]);

  useEffect(() => {
    if (homeAddressValue !== null) {
      const placeId = homeAddressValue?.place_id;
      if (placeId) {
        setShowHomeAddress && setShowHomeAddress(homeAddressValue.description);
        dispatch({
          type: sagaActions.GET_GOOGLE_PLACES_AUTOCOMPLETE_LAT_LNG,
          placeId,
          typeHome: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [homeAddressValue]);

  useEffect(() => {
    if (stationAddressValue !== null) {
      const placeId = stationAddressValue?.place_id;
      if (placeId) {
        setShowStationAddress && setShowStationAddress(stationAddressValue.description);
        dispatch({
          type: sagaActions.GET_GOOGLE_PLACES_AUTOCOMPLETE_LAT_LNG,
          placeId,
          typeStation: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stationAddressValue]);

  useEffect(() => {
    if (getGooglePlacesAutocompleteLatLng !== null && homeAddressValue !== null) {
      const addressObj = {
        type: 'home',
        place_name: homeAddressValue?.structured_formatting?.main_text,
        country: nl,
        formatted: homeAddressValue?.description,
        location: {
          lat: getGooglePlacesAutocompleteLatLng?.location.lat,
          lng: getGooglePlacesAutocompleteLatLng?.location.lng,
        },
      };
      dispatch({ type: sagaActions.ADD_HOME_ADDRESS, addressObj });
    }
  }, [getGooglePlacesAutocompleteLatLng, homeAddressValue]);

  useEffect(() => {
    if (staionAddressLatLng !== null && stationAddressValue !== null) {
      const addressObj = {
        type: 'station',
        place_name: stationAddressValue?.structured_formatting?.main_text,
        country: nl,
        formatted: stationAddressValue?.description,
        location: {
          lat: staionAddressLatLng?.location.lat,
          lng: staionAddressLatLng?.location.lng,
        },
      };
      dispatch({ type: sagaActions.ADD_HOME_ADDRESS, addressObj });
    }
  }, [staionAddressLatLng, stationAddressValue]);

  const handleNeverTakeTrain = async (e: any) => {
    dispatch(profileLoader(true));
    try {
      await set(dbRef(db, `users-info/${currentUser?.uid}/neverTake_train`), e);
      setChecked(e);
      setNeverTakeTrain && setNeverTakeTrain(e);
      dispatch(profileLoader(false));
    } catch (error: any) {
      dispatch(profileLoader(false));
      triggerErrorMessage(null, error?.code);
    }
  };

  const handleHomeAddressInputValueChange = (value: string, reason?: string, event?: any) => {
    if (event?.key !== 'Escape' && homeAddressId && reason === 'clear') {
      const addressObj = {
        type: 'home',
        addressId: homeAddressId,
      };
      dispatch({ type: sagaActions.DELETE_USER_ADDRESS, addressObj });
      setHomeAddressInputValue && setHomeAddressInputValue(null);
      setShowHomeAddress && setShowHomeAddress(undefined);
    }
    setHomeAddressInputValue(value);
    if (reason === 'input') {
      setHomeAddressInputValue(value);
    }
  };

  const handleStationAddressInputValueChange = (value: string, reason?: string, event?: any) => {
    if (event?.key !== 'Escape' && stationAddressId && reason === 'clear') {
      const addressObj = {
        type: 'station',
        addressId: stationAddressId,
      };
      dispatch({ type: sagaActions.DELETE_USER_ADDRESS, addressObj });
      setStationAddressInputValue && setStationAddressInputValue(null);
      setShowStationAddress && setShowStationAddress(undefined);
    }
    setStationAddressInputValue(value);
    if (reason === 'input') {
      setStationAddressInputValue(value);
    }
  };

  return (
    <Stack sx={{ marginTop: { sm: '15px', xs: 0 }, width: '100%' }}>
      {!isMobile && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 13px 0 15px',
          }}>
          <Box
            sx={{
              display: 'flex',
              cursor: 'pointer',
              alignItems: 'center',
              gap: 1,
            }}
            onClick={handleClickBack}>
            <ArrowBackIcon />
            <Typography variant='title4' color='#C3C3C3'>
              {intl?.formatMessage({ id: 'back' })}
            </Typography>
          </Box>
          <span onClick={handleClose} style={{ cursor: 'pointer' }}>
            <CancelIcon />
          </span>
        </Box>
      )}
      <Stack
        sx={{
          padding: { sm: '0 31px', xs: '0 15px' },
          marginTop: { sm: '20px', xs: 0 },
        }}>
        <Typography variant='subHeading2' color={defaultStyle?.primaryColor} lineHeight='33px !important'>
          {intl?.formatMessage({ id: 'home_address' })}
        </Typography>
        <Stack sx={{ gap: '32px' }}>
          {/* <CustomTextField
            variant="secondary"
            width="100%"
            placeholder="Home address"
            sx={{ minWidth: "100%" }}
          />  */}
          <CustomAutocomplete
            className='form-fields'
            googleSuggestion={addressSuggestion}
            inputValue={homeAddressInputValue}
            placeholder={intl?.formatMessage({ id: 'home_address' })}
            setInputValue={handleHomeAddressInputValueChange}
            setValue={setHomeAddressValue}
            value={homeAddressValue}
          />
          <Stack>
            <Typography variant='title2' color={defaultStyle?.primaryColor} lineHeight='33px !important'>
              {intl?.formatMessage({ id: 'train_station' })}
            </Typography>
            {!checked && (
              <>
                <Typography
                  sx={{
                    ...commonStyle,
                  }}>
                  {intl?.formatMessage({ id: 'train_station_question' })}
                </Typography>
                <Box sx={{ marginTop: '11px' }}>
                  {/* <CustomTextField
                    variant="secondary"
                    placeholder="Train Station"
                    width="100%"
                    sx={{ minWidth: "100%" }}
                  /> */}
                  <CustomAutocomplete
                    className='form-fields'
                    googleSuggestion={stationAddressSuggestion}
                    inputValue={stationAddressInputValue}
                    placeholder={intl?.formatMessage({ id: 'train_station' })}
                    setInputValue={handleStationAddressInputValueChange}
                    setValue={setStationAddressValue}
                    value={stationAddressValue}
                  />
                </Box>
              </>
            )}
            <Box sx={{ marginTop: '20px', display: 'flex', gap: '9px' }}>
              <SwitchButton checked={checked} setChecked={handleNeverTakeTrain} />
              <Typography sx={{ ...commonStyle }}>{intl?.formatMessage({ id: 'train_station_toggle_text' })}</Typography>
            </Box>
          </Stack>
          <Stack>
            <Typography variant='subHeading2' color={defaultStyle?.primaryColor} lineHeight='33px !important'>
              {intl?.formatMessage({ id: 'office_address' })}
            </Typography>
            <SelectDropdown
              className='form-fields'
              width='100%'
              height='38px'
              borderRadius='6px'
              selectValue={selectValue}
              selectedValue={officeDefaultAddress && officeDefaultAddress?.id}
              handleChange={handleChange}
              type='secondary'
              label={intl?.formatMessage({ id: 'office_address' })}
              // maxWidth="100%"
              // minWidth="100%"
            />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}
