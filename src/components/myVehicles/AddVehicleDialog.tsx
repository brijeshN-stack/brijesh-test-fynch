'use client';

import React, { useEffect, useState } from 'react';
import { Box, styled } from '@mui/material';
import CancelIcon from '@/assets/cancelIcon';
import {
  addVehicleSuccess,
  dialogLoading,
  getLookupVehicleInformation,
  lookupVehicleInfo,
  selectAddVehicleSuccess,
} from '@/redux/slices/vehiclesSlice';
import { useAppSelector } from '@/redux/hooks';
import { dispatch, RootState } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import { errorMessages, regEx, defaultRequireModalities } from '@/utils/constants';
import { filteredModalitiesOrVehicleClass } from '@/utils/helpers';
import { DialogHeaderTypography, FieldsContainer, StyledDialog } from '@/components/StyledComponents/styledComponents';
import CustomTextField from '@/components/textfield/CustomTextField';
import SelectWithEndIcon from '@/components/selectDropdownWithIcons/SelectWithEndIcon';
import CustomButton from '@/components/button/CustomButton';
import CircularLoader from '@/components/circularLoader/CircularLoader';

type AddVehicleDialogProps = {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getVehicles?: [];
  vehicleClass?: [] | any;
  intl?: any;
  formData?: any;
  setFormData?: any;
  formErrors?: any;
  setFormErrors?: any;
  locale: string;
};

export default function AddVehicleDialog({
  dialogOpen,
  setDialogOpen,
  getVehicles,
  vehicleClass,
  intl,
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  locale,
}: AddVehicleDialogProps) {
  const getLookupVehicleInfo = useAppSelector((state: RootState) => lookupVehicleInfo(state));

  const isDialogLoading = useAppSelector((state: RootState) => dialogLoading(state));
  const addVehicleSuccessResponse = useAppSelector((state: RootState) => selectAddVehicleSuccess(state));
  const [showDropdownIcon, setShowDropdownIcon] = useState(true);

  const commonStyle = {
    height: '38px !important',
    borderRadius: '7px',
    width: '100%',
    fontSize: '14px',
  };
  const vehicleClassesIds = [2, 3, 4, 5, 8, 9, 10, 33, 28, 29, 14, 26];

  const filteredVehiclesClasses = filteredModalitiesOrVehicleClass(vehicleClass, vehicleClassesIds);
  const selectValue: any = filteredVehiclesClasses?.map((item: any) => ({
    name: item?.name,
    id: item?.id,
    modality_id: item?.modality_id,
    icon: item?.icon_url,
    co2_g_km: item.co2_g_km_tailpipe + item?.co2_g_km_upstream,
  }));

  const handleOnCloseDialog = () => {
    setDialogOpen(false);
    setFormData({
      licensePlate: '',
      vehicle_class: '',
      modality_id: '',
      name: '',
      selectedOption: '',
      co2_g_km_tailpipe: '',
    });
    setFormErrors({
      licensePlate: '',
      name: '',
      selectedOption: '',
      co2_g_km_tailpipe: '',
    });
  };

  const handleFieldChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: Number(value) ? value : value,
    });
    if (name === 'selectedOption') {
      const selectedModality = selectValue.find((option: any) => option.id === value);
      if (selectedModality) {
        setFormData((prevState: any) => ({
          ...prevState,
          selectedOption: value,
          modality_id: selectedModality?.modality_id,
          co2_g_km_tailpipe: selectedModality?.co2_g_km || 0,
        }));
      }
    }
  };

  const isButtonDisabled = !formData.name || !formData.selectedOption;

  const handleSave = () => {
    const findKeyById = (id: any) => {
      for (const [key, values] of Object.entries(defaultRequireModalities)) {
        if (values.includes(id)) {
          return key;
        }
      }
      return null;
    };
    const selectModality = selectValue.find((option: any) => option.id === formData.selectedOption);

    const vehiclesLength: any = getVehicles && getVehicles?.length + 1;
    if (validateForm()) {
      const vehicleData = {
        ...(formData.licensePlate && {
          license_plate_number: formData.licensePlate,
        }),
        vehicle_class_id: selectModality?.id || '',
        name: formData?.name,
        modality_id: findKeyById(formData?.modality_id) || 0,
        co2_g_km_tailpipe: formData?.co2_g_km_tailpipe === '' ? 0 : formData?.co2_g_km_tailpipe,
        priority: vehiclesLength,
      };
      dispatch({ type: sagaActions.ADD_VEHICLE_REQUEST, vehicleData });
    }
  };

  const validateForm = () => {
    const invalid_license_plate = intl?.formatMessage({
      id: `${errorMessages.invalid_license_plate}`,
    });
    const field_required = intl?.formatMessage({
      id: `${errorMessages.field_required}`,
    });
    const enter_valid_text = intl?.formatMessage({
      id: `${errorMessages.enter_valid_text}`,
    });

    let isValid = true;
    const newErrors = { ...formErrors };
    if (formData.licensePlate) {
      if (!regEx.licensePlate.test(formData.licensePlate)) {
        newErrors.licensePlate = invalid_license_plate;
        isValid = false;
      } else {
        newErrors.licensePlate = '';
      }
    } else {
      newErrors.licensePlate = '';
    }

    if (!formData.name) {
      newErrors.name = field_required;
      isValid = false;
    } else if (formData?.name?.trim().length === 0) {
      newErrors.name = enter_valid_text;
      isValid = false;
    } else {
      newErrors.name = '';
    }

    setFormErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    if (getLookupVehicleInfo) {
      const selectedModality: any = selectValue?.find((item: any) => item?.id === getLookupVehicleInfo?.vehicle_class?.id);
      const selectedVehicle = selectValue.find((option: any) => option.id === formData?.selectedOption);
      setFormData((prevState: any) => ({
        ...prevState,
        name: getLookupVehicleInfo.name ? getLookupVehicleInfo.name : '',
        selectedOption: selectedModality?.id || prevState.selectedOption,
        modality_id: getLookupVehicleInfo?.modality_id || prevState.modality_id,
        co2_g_km_tailpipe:
          getLookupVehicleInfo.vehicle_class?.co2_g_km_tailpipe + getLookupVehicleInfo.vehicle_class?.co2_g_km_upstream ||
          selectedVehicle?.co2_g_km ||
          0,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLookupVehicleInfo]);

  useEffect(() => {
    const getData = setTimeout(() => {
      const registration = formData.licensePlate.replace(/-/g, '');
      if (registration.length === 6) {
        dispatch({
          type: sagaActions.GET_LOOKUP_VEHICLE_INFORMATION,
          registration,
        });
        setShowDropdownIcon(registration === '');
      }

      if (!formData?.licensePlate) {
        dispatch(getLookupVehicleInformation([]));
        setShowDropdownIcon(true);
      }
    }, 500);

    return () => clearTimeout(getData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.licensePlate.length]);

  useEffect(() => {
    if (addVehicleSuccessResponse) {
      handleOnCloseDialog();
      dispatch(addVehicleSuccess(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addVehicleSuccessResponse]);

  return (
    <StyledDialog
      sx={{
        '.MuiDialog-paper': {
          height: 'auto',
          paddingBottom: { xs: '24px', sm: '20px' },
          width: '100%',
          maxWidth: { xs: '359px', sm: '550px' },
        },
      }}
      open={dialogOpen}
      onClose={handleOnCloseDialog}>
      {isDialogLoading && <CircularLoader />}
      <DialogWrapper>
        <Box
          sx={{
            marginTop: '20px',
            display: 'flex',
            height: '38px',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <DialogHeaderTypography>{intl?.formatMessage({ id: 'add_vehicle' })}</DialogHeaderTypography>
          <Box sx={{ right: '15px', position: 'absolute', marginTop: '-30px', cursor: 'pointer' }} onClick={handleOnCloseDialog}>
            <CancelIcon />
          </Box>
        </Box>
        <FieldsContainer sx={{ flexDirection: { xs: 'column', sm: 'row' }, rowGap: '13px' }}>
          <CustomBox>
            <CustomTextField
              className='form-fields'
              fieldWidth='100%'
              variant='secondary'
              name='licensePlate'
              value={formData.licensePlate}
              error={formErrors?.licensePlate ? true : false}
              helperText={formErrors?.licensePlate ? formErrors.licensePlate : undefined}
              handleChange={e => handleFieldChange(e)}
              placeholder={intl?.formatMessage({ id: 'license_plate' })}
              // placeholder={renderInputFieldsPlaceholder('license_plate', locale)}
              InputProps={{
                sx: {
                  ...commonStyle,
                },
              }}
            />
          </CustomBox>
          <CustomBox>
            <CustomTextField
              className='form-fields'
              fieldWidth='100%'
              variant='secondary'
              // placeholder={renderInputFieldsPlaceholder('name_your_vehicle', locale)}
              placeholder={intl?.formatMessage({ id: 'name_your_vehicle' })}
              handleChange={e => handleFieldChange(e)}
              name='name'
              error={formErrors?.name ? true : false}
              helperText={formErrors?.name ? formErrors.name : undefined}
              value={formData.name}
              InputProps={{
                sx: {
                  ...commonStyle,
                },
              }}
            />
          </CustomBox>
        </FieldsContainer>
        <FieldsContainer sx={{ marginTop: '14px', flexDirection: { xs: 'column', sm: 'row' } }}>
          <CustomBox>
            <SelectWithEndIcon
              className='form-fields'
              selectValue={selectValue}
              minWidth='100%'
              name='selectedOption'
              selectedValue={formData.selectedOption}
              handleChange={e => handleFieldChange(e)}
              // label={renderInputFieldsPlaceholder('modality', locale)}
              label={intl?.formatMessage({ id: 'modality' })}
              labelVariant='title3'
              setShowDropdownIcon={setShowDropdownIcon}
              showDropdownIcon={showDropdownIcon}
            />
          </CustomBox>
          <CustomBox>
            <CustomTextField
              className='form-fields'
              fieldWidth='100%'
              variant='secondary'
              // placeholder={renderInputFieldsPlaceholder('gm_of_co2_km', locale)}
              placeholder={`0 ${intl?.formatMessage({ id: 'gm_of_co2_km' })}`}
              value={`${formData.co2_g_km_tailpipe} ${intl?.formatMessage({ id: 'gm_of_co2_km' })}`}
              name='co2_g_km_tailpipe'
              error={formErrors?.co2_g_km_tailpipe ? true : false}
              disable={true}
              helperText={formErrors?.co2_g_km_tailpipe ? formErrors.co2_g_km_tailpipe : undefined}
              handleChange={e => handleFieldChange(e)}
              InputProps={{
                sx: {
                  ...commonStyle,
                },
              }}
            />
          </CustomBox>
        </FieldsContainer>
        <Box
          sx={{
            marginTop: { xs: '29px', sm: '32px' },
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          <CustomButton
            disabled={isButtonDisabled}
            variant='defaultSecondary'
            sx={{
              width: { xs: '171px', sm: '221px' },
              height: '38px',
              boxShadow: 0,
              borderRadius: '7px',
            }}
            handleClick={handleSave}>
            {intl?.formatMessage({ id: 'save' })}
            {/* {renderButtonLabel('save', locale)} */}
          </CustomButton>
        </Box>
      </DialogWrapper>
    </StyledDialog>
  );
}
const CustomBox = styled(Box)(({ theme }: any) => ({
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
const DialogWrapper = styled(Box)(({ theme }: any) => ({
  padding: '0 33px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    padding: '0 24px',
  },
}));
