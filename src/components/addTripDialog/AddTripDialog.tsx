import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Box, Checkbox, styled, Typography } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import CancelIcon from '@/assets/cancelIcon';
import { AddTripData, DateProps, Place } from '@/types';
import { allowedModalitiesForCarpool, errorMessages, LOCALE, regEx } from '@/utils/constants';
import { useTranslate } from '@/hooks/useTranslate';
import { RootState } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  addTripSuccessResponse,
  getEndLocationAddressDetails,
  getGoogleEndLocationAddressSuggestion,
  getGoogleStartLocationAddressSuggestion,
  getStartLocationAddressDetails,
  selectAddTripSuccessResponse,
  selectBothAddressSelected,
  selectDialogLoading,
  selectEndAddressSuggestion,
  selectEndLocationAddressDetails,
  selectStartAddressSuggestion,
  selectStartLocationAddressDetails,
  triggerBothAddressCollected,
} from '@/redux/slices/tripsSlice';
import { DialogHeaderTypography, FieldsContainer, HeaderTypography, StyledDialog } from '@/components/StyledComponents/styledComponents';
import CustomTextField from '@/components/textfield/CustomTextField';
import SelectDropdown from '@/components/selectDropdownWithIcons/SelectDropdown';
import CustomButton from '@/components/button/CustomButton';
import CircularLoader from '@/components/circularLoader/CircularLoader';
import CustomAutocomplete from '@/components/autocomplete/CustomAutocomplete';
import SwitchButton from '../switch/SwitchButton';
import CarpoolDialog from '../carpoolDialog/CarpoolDialog';

type AddTripProps = {
  dialogOpen?: boolean;
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTrip?: Dispatch<SetStateAction<AddTripData | undefined>>;
  dateSelectedInCalendar?: Date;
  selectValue: any;
  editTrip?: any;
};

type FormValues = {
  startLocation: string;
  endLocation: string;
  selectedOption: string;
  isReturnTrip: boolean;
  returnStartLocation: string;
  returnEndLocation: string;
  returnSelectedOption: string;
  selectedOptionModalityId?: number | undefined;
  returnSelectedOptionModalityId?: number | undefined;
};
export type TripCarpoolFormErros = {
  createTripNumberOfPeople: string;
  returnTripNumberOfPeople: string;
};

const commonStyle = {
  height: '38px',
  borderRadius: '7px',
  width: '100%',
};

const textFieldPlaceHolderTextAlign = {
  '.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
    textAlign: 'start',
  },
};

export default function AddTripDialog({
  dialogOpen,
  setDialogOpen,
  dateSelectedInCalendar,
  selectValue,
  editTrip,
  setEditTrip,
}: AddTripProps) {
  const [locale, setLocale] = useState<any>(null);

  useEffect(() => {
    const getLocale: any = localStorage.getItem(LOCALE);
    setLocale(getLocale);
  }, [locale]);

  const intl = useTranslate(locale);
  const isDialogLoading = useAppSelector((state: RootState) => selectDialogLoading(state));
  const addTripSuccess = useAppSelector((state: RootState) => selectAddTripSuccessResponse(state));
  const startLocationSuggestion = useAppSelector((state: RootState) => selectStartAddressSuggestion(state));
  const endLocationSuggestion = useAppSelector((state: RootState) => selectEndAddressSuggestion(state));
  const startLocationAddressDetails = useAppSelector((state: RootState) => selectStartLocationAddressDetails(state));
  const endLocationAddressDetails = useAppSelector((state: RootState) => selectEndLocationAddressDetails(state));
  const bothAddressCollected = useAppSelector((state: RootState) => selectBothAddressSelected(state));
  const [startLocationValue, setStartLocationValue] = React.useState<any | null>(null);
  const [startLocationReferenceValue, setStartLocationReferenceValue] = React.useState<any | null>(null);
  const [startLocationInputValue, setStartLocationInputValue] = React.useState('');
  const [endLocationValue, setEndLocationValue] = React.useState<any | null>(null);
  const [endLocationReferenceValue, setEndLocationReferenceValue] = React.useState<any | null>(null);
  const [endLocationInputValue, setEndLocationInputValue] = React.useState('');
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState<FormValues>({
    startLocation: '',
    endLocation: '',
    selectedOption: '',
    selectedOptionModalityId: undefined,
    isReturnTrip: false,
    returnStartLocation: '',
    returnEndLocation: '',
    returnSelectedOption: '',
    returnSelectedOptionModalityId: undefined,
  });

  const [collectedStarLocationPlace, setCollectedStartLocationPlace] = useState<Place[]>([]);
  const [collectedEndLocationPlace, setCollectedEndLocationPlace] = useState<Place[]>([]);
  const [carpoolFormErrors, setCarpoolFormErrors] = useState<TripCarpoolFormErros>({
    createTripNumberOfPeople: '',
    returnTripNumberOfPeople: '',
  });
  const [tripCarpoolDialogOpen, setTripCarpoolDialogOpen] = useState({
    createTripDialogOpen: false,
    returnTripDialogOpen: false,
  });
  const [tripIsPassenger, setTripIsPassenger] = useState({
    createTripIsPassenger: false,
    returnTripIsPassenger: false,
  });
  const [tripCarpoolTextCount, setTripCarpoolTextCount] = useState<any>({
    createTripText: undefined,
    returnTripText: undefined,
  });
  const [isCarpool, setIsCarpool] = useState({
    isCreateTripCarpool: false,
    isReturnTripCarpool: false,
  });

  useEffect(() => {
    setCollectedStartLocationPlace(startLocationSuggestion);
  }, [startLocationSuggestion]);

  useEffect(() => {
    setCollectedEndLocationPlace(endLocationSuggestion);
  }, [endLocationSuggestion]);

  const handleStartLocationInputChange = (value: string, reason?: string) => {
    if (reason === 'clear') {
      setStartLocationReferenceValue(null);
    }
    setStartLocationInputValue(value);
    if (reason === 'input' && editTrip) {
      setStartLocationReferenceValue(null);
    }
  };

  const handleEndLocationInputChange = (value: string, reason?: string) => {
    if (reason === 'clear') {
      setEndLocationReferenceValue(null);
    }
    setEndLocationInputValue(value);
    if (reason === 'input' && editTrip) {
      setEndLocationReferenceValue(null);
    }
  };

  useEffect(() => {
    if (editTrip) {
      setStartLocationInputValue(editTrip.start_location_name);
      setStartLocationReferenceValue({
        description: editTrip.start_location_name,
      });
      setEndLocationInputValue(editTrip.stop_location_name);
      setEndLocationReferenceValue({
        description: editTrip.stop_location_name,
      });
      setFormData({
        ...formData,
        selectedOption: editTrip?.vehicle_id ? editTrip?.vehicle_id : editTrip?.vehicle_class_id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTrip]);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (startLocationInputValue) {
        dispatch({ type: sagaActions.GET_GOOGLE_AUTOCOMPLETE, query: startLocationInputValue, startLocation: true });
      }
    }, 500);
    if (!startLocationInputValue) {
      dispatch(getGoogleStartLocationAddressSuggestion([]));
    }
    return () => clearTimeout(getData);
  }, [dispatch, startLocationInputValue]);

  useEffect(() => {
    const getData = setTimeout(() => {
      if (endLocationInputValue) {
        dispatch({ type: sagaActions.GET_GOOGLE_AUTOCOMPLETE, query: endLocationInputValue });
      }
    }, 500);
    if (!endLocationInputValue) {
      dispatch(getGoogleEndLocationAddressSuggestion([]));
    }
    return () => clearTimeout(getData);
  }, [dispatch, endLocationInputValue]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    setFormData({
      ...formData,
      isReturnTrip: isChecked,
      returnStartLocation: formData.endLocation,
      returnEndLocation: formData.startLocation,
    });
  };

  const handleOnCloseDialog = () => {
    setDialogOpen && setDialogOpen(false);
    setFormData({
      startLocation: '',
      endLocation: '',
      selectedOption: '',
      isReturnTrip: false,
      returnStartLocation: '',
      returnEndLocation: '',
      returnSelectedOption: '',
    });
    setIsCarpool({
      isCreateTripCarpool: false,
      isReturnTripCarpool: false,
    });
    setTripCarpoolTextCount({
      createTripText: undefined,
      returnTripText: undefined,
    });
    setTripIsPassenger({
      createTripIsPassenger: false,
      returnTripIsPassenger: false,
    });
    setStartLocationValue(null);
    setEndLocationValue(null);
    setStartLocationInputValue('');
    setEndLocationInputValue('');
    dispatch(getStartLocationAddressDetails(undefined));
    dispatch(getEndLocationAddressDetails(undefined));
    setChecked(false);
    setEditTrip && setEditTrip(undefined);
  };

  useEffect(() => {
    if (startLocationValue && startLocationValue?.place_id) {
      setStartLocationReferenceValue(startLocationValue);
    }
  }, [startLocationValue]);

  useEffect(() => {
    if (endLocationValue && endLocationValue?.place_id) {
      setEndLocationReferenceValue(endLocationValue);
    }
  }, [endLocationValue]);

  useEffect(() => {
    if (addTripSuccess) {
      handleOnCloseDialog();
      dispatch(addTripSuccessResponse(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTripSuccess]);

  const handleFieldChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'selectedOption') {
      const selectModalityId = selectValue.find((option: any) => option.value === value || option.vehicle_class_id === value);
      if (selectModalityId) {
        setFormData(prevState => ({
          ...prevState,
          selectedOptionModalityId: selectModalityId.modality_id,
        }));
      }
    }

    if (name === 'returnSelectedOption') {
      const selectedModality = selectValue.find((option: any) => option.value === value || option.vehicle_class_id === value);
      if (selectedModality) {
        setFormData(prevState => ({
          ...prevState,
          returnSelectedOptionModalityId: selectedModality.modality_id,
        }));
      }
    }
  };

  const isButtonDisabledInAddTrip =
    !startLocationReferenceValue || !endLocationReferenceValue || !formData.selectedOption || (checked && !formData.returnSelectedOption);
  const isButtonDisabledInEditTrip = !startLocationReferenceValue || !endLocationReferenceValue || !formData.selectedOption;

  const modifyDate = ({ date, hour, minutes, seconds }: DateProps) => {
    if (!date) {
      return '';
    }
    const originalDate = new Date(date);
    const formattedDate = new Date(originalDate.getTime() - originalDate.getTimezoneOffset() * 60000).toISOString().split('.')[0] + 'Z';
    const newDate = new Date(formattedDate);
    newDate.setUTCHours(hour);
    newDate.setUTCMinutes(minutes);
    newDate.setUTCSeconds(seconds);
    return newDate.toISOString();
  };

  const getAddressDetailsCase = () => {
    if (startLocationValue && endLocationValue) {
      return 'addTrip';
    } else if (startLocationValue && editTrip) {
      return 'editStartLocationOnly';
    } else if (endLocationValue && editTrip) {
      return 'editEndLocationOnly';
    } else if (!startLocationValue && !endLocationValue && editTrip) {
      return 'editVehicleOnly';
    } else {
      return 'default';
    }
  };

  const collectAddressDetailsFromSelectedAddress = () => {
    const caseType = getAddressDetailsCase();
    switch (caseType) {
      case 'addTrip':
        dispatch({ type: sagaActions.GET_BOTHSIDE_GOOGLE_ADDRESS_DETAILS, startLocationValue, endLocationValue });
        break;
      case 'editStartLocationOnly':
        dispatch({ type: sagaActions.GET_SINGLESIDE_GOOGLE_ADDRESS_DETAILS, startLocation: true, place_id: startLocationValue.place_id });
        break;
      case 'editEndLocationOnly':
        dispatch({ type: sagaActions.GET_SINGLESIDE_GOOGLE_ADDRESS_DETAILS, place_id: endLocationValue.place_id });
        break;
      case 'editVehicleOnly':
        handleSave();
        break;
    }
  };

  useEffect(() => {
    if (bothAddressCollected) {
      handleSave();
      dispatch(triggerBothAddressCollected(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bothAddressCollected]);

  useEffect(() => {
    if (startLocationAddressDetails && editTrip && endLocationReferenceValue) {
      handleSave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startLocationAddressDetails]);

  useEffect(() => {
    if (endLocationAddressDetails && editTrip && startLocationReferenceValue) {
      handleSave();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endLocationAddressDetails]);

  const handleSave = async () => {
    const findObjectForAddTrip = await selectValue.find((item: any) => item.value === formData.selectedOption);
    const findObjectForReturnTrip = await selectValue.find((item: any) => item.value === formData?.returnSelectedOption);
    const start_time = modifyDate({ date: dateSelectedInCalendar, hour: 8, minutes: 0, seconds: 0 });
    const stop_time = modifyDate({ date: dateSelectedInCalendar, hour: 8, minutes: 30, seconds: 0 });
    const getOffset = new Date().getTimezoneOffset();
    const getOffsetInSeconds = getOffset * 60;

    let vehicle_id;
    let vehicle_class_id;
    if (findObjectForAddTrip && findObjectForAddTrip.hasOwnProperty('vehicle_class_id')) {
      vehicle_id = findObjectForAddTrip.value;
      vehicle_class_id = findObjectForAddTrip.vehicle_class_id;
    } else if (findObjectForAddTrip) {
      vehicle_id = 0;
      vehicle_class_id = findObjectForAddTrip.value;
    }
    let return_trip_vehicle_id;
    let return_trip_vehicle_class_id;
    if (findObjectForReturnTrip && findObjectForReturnTrip.hasOwnProperty('vehicle_class_id')) {
      return_trip_vehicle_id = findObjectForReturnTrip.value;
      return_trip_vehicle_class_id = findObjectForReturnTrip.vehicle_class_id;
    } else if (findObjectForReturnTrip) {
      return_trip_vehicle_id = 0;
      return_trip_vehicle_class_id = findObjectForReturnTrip.value;
    }

    if (editTrip && (startLocationReferenceValue || startLocationValue) && (endLocationReferenceValue || endLocationValue)) {
      const editTripData = {
        vehicle_class_id: vehicle_class_id,
        ...(vehicle_id > 0 && { vehicle_id: vehicle_id }),
        start_location_name: startLocationReferenceValue ? startLocationReferenceValue.description : editTrip.start_location_name,
        stop_location_name: endLocationReferenceValue ? endLocationReferenceValue.description : editTrip.stop_location_name,
        start_location: startLocationAddressDetails ? startLocationAddressDetails : editTrip.start_location,
        stop_location: endLocationAddressDetails ? endLocationAddressDetails : editTrip.stop_location,
      };
      dispatch({ type: sagaActions.UPDATE_ADDITIONAL_TRIP, data: editTripData, trip_id: editTrip.id });
    } else if (startLocationValue && endLocationValue && findObjectForAddTrip && !editTrip) {
      const tripData: AddTripData = {
        passenger: tripIsPassenger.createTripIsPassenger,
        passengers: Number(tripCarpoolTextCount.createTripText || 1),
        source: 'manual',
        start_time: start_time,
        stop_time: stop_time,
        utcoffset: -getOffsetInSeconds,
        objective_id: 1,
        vehicle_class_id: vehicle_class_id,
        start_location_name: startLocationValue && startLocationValue.description,
        stop_location_name: endLocationValue && endLocationValue.description,
        start_location: startLocationAddressDetails,
        stop_location: endLocationAddressDetails,
        ...(vehicle_id > 0 && { vehicle_id: vehicle_id }),
      };
      const returnTripTime = {
        passenger: tripIsPassenger.returnTripIsPassenger,
        passengers: Number(tripCarpoolTextCount.returnTripText || 1),
        start_time: modifyDate({ date: dateSelectedInCalendar, hour: 5, minutes: 0, seconds: 0 }),
        stop_time: modifyDate({ date: dateSelectedInCalendar, hour: 5, minutes: 30, seconds: 0 }),
        utcoffset: -getOffsetInSeconds,
        vehicle_class_id: return_trip_vehicle_class_id,
        ...(return_trip_vehicle_id > 0 && { vehicle_id: return_trip_vehicle_id }),
      };
      dispatch({ type: sagaActions.ADD_BUSINESS_TRIP_ACTION, data: tripData, createReturnTrip: checked, returnTripTime });
    }
  };
  const handleCreateTripCarPoolDialogChange = () => {
    if (isCarpool.isCreateTripCarpool) {
      setIsCarpool({
        ...isCarpool,
        isCreateTripCarpool: false,
      });
      setTripCarpoolTextCount({
        ...tripCarpoolTextCount,
        createTripText: undefined,
      });
      setTripIsPassenger({
        ...tripIsPassenger,
        createTripIsPassenger: false,
      });
    } else {
      setTripCarpoolDialogOpen({
        ...tripCarpoolDialogOpen,
        createTripDialogOpen: !tripCarpoolDialogOpen.createTripDialogOpen,
      });
    }
  };
  const handleReturnTripCarPoolDialogChange = () => {
    if (isCarpool.isReturnTripCarpool) {
      setIsCarpool({
        ...isCarpool,
        isReturnTripCarpool: false,
      });
      setTripCarpoolTextCount({
        ...tripCarpoolTextCount,
        returnTripText: undefined,
      });
      setTripIsPassenger({
        ...tripIsPassenger,
        returnTripIsPassenger: false,
      });
    } else {
      setTripCarpoolDialogOpen({
        ...tripCarpoolDialogOpen,
        returnTripDialogOpen: !tripCarpoolDialogOpen.returnTripDialogOpen,
      });
    }
  };
  const handleCreateTripCarpoolTextChange = (e: any) => {
    setTripCarpoolTextCount({
      ...tripCarpoolTextCount,
      createTripText: e.target.value,
    });
  };
  const handleReturnTripCarpoolTextChange = (e: any) => {
    setTripCarpoolTextCount({
      ...tripCarpoolTextCount,
      returnTripText: e.target.value,
    });
  };
  const handleCreateTripIsPassenger = () => {
    setTripIsPassenger({
      ...tripIsPassenger,
      createTripIsPassenger: !tripIsPassenger.createTripIsPassenger,
    });
  };
  const handleReturnTripIsPassenger = () => {
    setTripIsPassenger({
      ...tripIsPassenger,
      returnTripIsPassenger: !tripIsPassenger.returnTripIsPassenger,
    });
  };
  const validateCarpoolField = () => {
    const allow_only_numbers = intl?.formatMessage({
      id: `${errorMessages.allow_only_numbers}`,
    });
    const greater_than_one = intl?.formatMessage({
      id: `${errorMessages.greater_than_one}`,
    });
    let isValid = true;
    const newErrors = { ...carpoolFormErrors };
    if (tripCarpoolDialogOpen.createTripDialogOpen) {
      if (!regEx.allowNumbers.test(tripCarpoolTextCount.createTripText || '')) {
        newErrors.createTripNumberOfPeople = allow_only_numbers;
        isValid = false;
      } else if (tripCarpoolTextCount.createTripText && tripCarpoolTextCount.createTripText <= 1) {
        newErrors.createTripNumberOfPeople = greater_than_one;
        isValid = false;
      } else {
        newErrors.createTripNumberOfPeople = '';
      }
    } else if (tripCarpoolDialogOpen.returnTripDialogOpen) {
      if (!regEx.allowNumbers.test(tripCarpoolTextCount.returnTripText || '')) {
        newErrors.returnTripNumberOfPeople = allow_only_numbers;
        isValid = false;
      } else if (tripCarpoolTextCount.returnTripText && tripCarpoolTextCount.returnTripText <= 1) {
        newErrors.returnTripNumberOfPeople = greater_than_one;
        isValid = false;
      } else {
        newErrors.returnTripNumberOfPeople = '';
      }
    }
    setCarpoolFormErrors(newErrors);
    return isValid;
  };
  const handleCreateTripCarpoolSubmit = () => {
    if (validateCarpoolField()) {
      // handleCreateTripCaroolDialogClose();
      setTripCarpoolDialogOpen({
        ...tripCarpoolDialogOpen,
        createTripDialogOpen: false,
      });
      setIsCarpool({
        ...isCarpool,
        isCreateTripCarpool: true,
      });
    }
  };
  const handleReturnTripCarpoolSubmit = () => {
    if (validateCarpoolField()) {
      setTripCarpoolDialogOpen({
        ...tripCarpoolDialogOpen,
        returnTripDialogOpen: false,
      });
      // handleReturnTripCaroolDialogClose();
      setIsCarpool({
        ...isCarpool,
        isReturnTripCarpool: true,
      });
    }
  };
  const handleCreateTripCaroolDialogClose = () => {
    setTripCarpoolDialogOpen({
      ...tripCarpoolDialogOpen,
      createTripDialogOpen: false,
    });
    setTripCarpoolTextCount({
      ...tripCarpoolTextCount,
      createTripText: undefined,
    });
    setTripIsPassenger({
      ...tripIsPassenger,
      createTripIsPassenger: false,
    });
  };
  const handleReturnTripCaroolDialogClose = () => {
    setTripCarpoolDialogOpen({
      ...tripCarpoolDialogOpen,
      returnTripDialogOpen: false,
    });
    setTripCarpoolTextCount({
      ...tripCarpoolTextCount,
      returnTripText: undefined,
    });
    setTripIsPassenger({
      ...tripIsPassenger,
      returnTripIsPassenger: false,
    });
  };

  return (
    <StyledDialog
      sx={{
        '.MuiDialog-paper': {
          height: 'auto',
          width: '100%',
          maxWidth: { xs: '359px', sm: '667px' },
        },
      }}
      onClose={handleOnCloseDialog}
      open={dialogOpen ? dialogOpen : false}>
      {isDialogLoading && <CircularLoader />}
      <DialogWrapper>
        <Box
          sx={{
            display: 'flex',
            height: '38px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <DialogHeaderTypography sx={{ maxWidth: '100% !important' }}>
            {intl?.formatMessage({ id: editTrip ? 'edit_business_trip' : 'add_business_trip' })}
          </DialogHeaderTypography>
          <Box
            sx={{ right: '20px', position: 'absolute', marginTop: { xs: '-10px', sm: '-30px' }, cursor: 'pointer' }}
            onClick={handleOnCloseDialog}>
            <CancelIcon />
          </Box>
        </Box>
        <FieldsContainer>
          <CustomAutocomplete
            className='form-fields'
            disabled={editTrip?.objective === 'commute'}
            googleSuggestion={collectedStarLocationPlace}
            setInputValue={handleStartLocationInputChange}
            setValue={setStartLocationValue}
            value={startLocationValue}
            inputValue={startLocationInputValue}
            placeholder={intl?.formatMessage({ id: 'start_location' })}
            // placeholder={renderInputFieldsPlaceholder('start_location', locale)}
          />
          <CustomAutocomplete
            className='form-fields'
            disabled={editTrip?.objective === 'commute'}
            googleSuggestion={collectedEndLocationPlace}
            setInputValue={handleEndLocationInputChange}
            setValue={setEndLocationValue}
            value={endLocationValue}
            inputValue={endLocationInputValue}
            placeholder={intl?.formatMessage({ id: 'end_location' })}
            // placeholder={renderInputFieldsPlaceholder('end_location', locale)}
          />

          <SelectDropdown
            className='form-fields'
            widthForText='100%'
            padding='16.5px 7px 16.5px 14px'
            name='selectedOption'
            handleChange={e => handleFieldChange(e)}
            selectedValue={formData.selectedOption}
            selectValue={selectValue}
            width='100%'
            label={intl?.formatMessage({ id: 'modality' })}
            // label={renderInputFieldsPlaceholder('modality', locale)}
          />
          {allowedModalitiesForCarpool.includes(formData?.selectedOptionModalityId || 0) && (
            <Box sx={{ display: 'flex', gap: '9px' }}>
              <SwitchButton checked={isCarpool.isCreateTripCarpool} setChecked={handleCreateTripCarPoolDialogChange} />
              <Typography variant='title4' sx={{ color: defaultStyle?.primaryColor }}>
                {intl?.formatMessage({ id: 'carpool' })}
                {tripCarpoolTextCount.createTripText && isCarpool.isCreateTripCarpool
                  ? tripCarpoolTextCount.createTripText > 1 &&
                    tripIsPassenger.createTripIsPassenger &&
                    `   ${intl?.formatMessage({ id: 'passenger' })} (${tripCarpoolTextCount.createTripText} ${intl?.formatMessage({ id: 'people' })})`
                  : ''}
                {tripCarpoolTextCount.createTripText && isCarpool.isCreateTripCarpool
                  ? tripCarpoolTextCount.createTripText > 1 &&
                    !tripIsPassenger.createTripIsPassenger &&
                    `   ${intl?.formatMessage({ id: 'driver' })} (${tripCarpoolTextCount.createTripText} ${intl?.formatMessage({ id: 'people' })})`
                  : ''}
              </Typography>
            </Box>
          )}
        </FieldsContainer>

        {!editTrip && (
          <Box
            sx={{
              marginTop: '10px',
              display: 'flex',
              height: '38px',
              alignItems: 'center',
            }}>
            <HeaderTypography sx={{ maxWidth: '100% !important', fontSize: '16px' }}>
              {intl?.formatMessage({ id: 'create_return_trip' })}
            </HeaderTypography>
            <StyledCheckbox checked={checked} onChange={handleCheckboxChange} />
          </Box>
        )}
        {checked && (
          <FieldsContainer>
            <CustomTextField
              disable
              className='form-fields'
              name='returnStartLocation'
              handleChange={e => handleFieldChange(e)}
              value={endLocationInputValue}
              placeholder={intl?.formatMessage({ id: 'start_location' })}
              // placeholder={renderInputFieldsPlaceholder('start_location', locale)}
              sx={{
                ...textFieldPlaceHolderTextAlign,
              }}
              InputProps={{
                sx: {
                  ...commonStyle,
                },
              }}
            />
            <CustomTextField
              disable
              className='form-fields'
              name='returnEndLocation'
              value={startLocationInputValue}
              handleChange={e => handleFieldChange(e)}
              placeholder={intl?.formatMessage({ id: 'end_location' })}
              // placeholder={renderInputFieldsPlaceholder('end_location', locale)}
              sx={{
                ...textFieldPlaceHolderTextAlign,
              }}
              InputProps={{
                sx: {
                  ...commonStyle,
                },
              }}
            />
            <SelectDropdown
              className='form-fields'
              padding='16.5px 7px 16.5px 14px'
              name='returnSelectedOption'
              selectedValue={formData.returnSelectedOption}
              handleChange={e => handleFieldChange(e)}
              selectValue={selectValue}
              width='100%'
              label={intl?.formatMessage({ id: 'modality' })}
              // label={renderInputFieldsPlaceholder('end_location', locale)}
            />
            {allowedModalitiesForCarpool.includes(formData?.returnSelectedOptionModalityId || 0) && (
              <Box sx={{ display: 'flex', gap: '9px' }}>
                <SwitchButton checked={isCarpool.isReturnTripCarpool} setChecked={handleReturnTripCarPoolDialogChange} />
                <Typography variant='title4' sx={{ color: defaultStyle?.primaryColor }}>
                  {intl?.formatMessage({ id: 'carpool' })}
                  {tripCarpoolTextCount.returnTripText && isCarpool.isReturnTripCarpool
                    ? tripCarpoolTextCount.returnTripText > 1 &&
                      tripIsPassenger.returnTripIsPassenger &&
                      `  ${intl?.formatMessage({ id: 'passenger' })} (${tripCarpoolTextCount.returnTripText} ${intl?.formatMessage({ id: 'people' })}) `
                    : ''}
                  {tripCarpoolTextCount.returnTripText && isCarpool.isReturnTripCarpool
                    ? tripCarpoolTextCount.returnTripText > 1 &&
                      !tripIsPassenger.returnTripIsPassenger &&
                      `  ${intl?.formatMessage({ id: 'driver' })} (${tripCarpoolTextCount.returnTripText} ${intl?.formatMessage({ id: 'people' })}) `
                    : ''}
                </Typography>
              </Box>
            )}
          </FieldsContainer>
        )}
        <Box
          sx={{
            marginTop: { xs: '29px', sm: '32px' },
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <CustomButton
            sx={{
              width: { xs: '171px', sm: '228px' },
              height: '38px',
              boxShadow: 0,
              borderRadius: '7px',
              fontSize: '16px',
              fontWeight: 500,
            }}
            disabled={editTrip ? isButtonDisabledInEditTrip : isButtonDisabledInAddTrip}
            variant='defaultSecondary'
            handleClick={collectAddressDetailsFromSelectedAddress}>
            {/* {renderButtonLabel('save', locale)} */}
            {intl?.formatMessage({ id: 'save' })}
          </CustomButton>
        </Box>
      </DialogWrapper>
      <CarpoolDialog
        intl={intl}
        carpoolDialogOpen={tripCarpoolDialogOpen.createTripDialogOpen}
        handleCarPoolDialogChange={handleCreateTripCaroolDialogClose}
        handleCarpoolTextChange={handleCreateTripCarpoolTextChange}
        carpoolTextCount={tripCarpoolTextCount.createTripText}
        handleIsPassenger={handleCreateTripIsPassenger}
        isPassenger={tripIsPassenger.createTripIsPassenger}
        handleCarpoolSubmit={handleCreateTripCarpoolSubmit}
        formErrors={carpoolFormErrors.createTripNumberOfPeople}
      />
      <CarpoolDialog
        intl={intl}
        carpoolDialogOpen={tripCarpoolDialogOpen.returnTripDialogOpen}
        handleCarPoolDialogChange={handleReturnTripCaroolDialogClose}
        handleCarpoolTextChange={handleReturnTripCarpoolTextChange}
        carpoolTextCount={tripCarpoolTextCount.returnTripText}
        handleIsPassenger={handleReturnTripIsPassenger}
        isPassenger={tripIsPassenger.returnTripIsPassenger}
        handleCarpoolSubmit={handleReturnTripCarpoolSubmit}
        formErrors={carpoolFormErrors.returnTripNumberOfPeople}
      />
    </StyledDialog>
  );
}

export const DialogWrapper = styled(Box)(({ theme }: any) => ({
  padding: '20px 23px ',
  width: '100%',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: '11px 24px 24px',
  },
}));

const StyledCheckbox = styled(Checkbox)(() => ({
  height: '24px',
  width: '24px',
  marginLeft: '5px',
  color: defaultStyle.primaryColor,
  '&.Mui-checked': {
    color: defaultStyle.primaryColor,
  },
}));
