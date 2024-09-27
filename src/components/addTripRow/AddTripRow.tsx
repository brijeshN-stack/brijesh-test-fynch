import React, { useEffect, useState } from 'react';
import { Box, Divider, SelectChangeEvent, styled, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { sagaActions } from '@/redux/actions';
import { AddTripData, ValueAndIconProps } from '@/types';
// import MenuDots from '@/assets/menuDots';
import DeleteIcon from '@/assets/deleteIcon';
import SelectDropdown from '@/components/selectDropdownWithIcons/SelectDropdown';
import { FieldsContainer } from '@/components/StyledComponents/styledComponents';
import DeleteTripDialog from '@/components/deleteTripDialog/DeleteTripDialog';
import AddTripDialog from '@/components/addTripDialog/AddTripDialog';
import CustomTextField from '../textfield/CustomTextField';
import { defaultStyle } from '@/config/colorConfig';
import SwitchButton from '../switch/SwitchButton';
import CarpoolDialog from '../carpoolDialog/CarpoolDialog';
import { allowedModalitiesForCarpool, errorMessages, regEx } from '@/utils/constants';
import { RootState } from '@/redux/store';
import { addCarpoolInTripSuccess, selectIsCarpoolSuccess } from '@/redux/slices/tripsSlice';

type AddtripRowProps = {
  selectValue: ValueAndIconProps[];
  selectedValue?: string;
  item?: any;
  startDate: Date;
  edit: string;
  delete_trip_confirmation_message: string;
  yes: string;
  no: string;
  isLastElement: number;
  index: number;
  carpoolText: string;
  passengerText: string;
  peopleText: string;
  driverText: string;
  intl: any;
};
export type CarpoolFormErros = {
  numberOfPeople: string;
};

export default function AddTripRow({
  selectValue,
  item,
  startDate,
  delete_trip_confirmation_message,
  yes,
  no,
  carpoolText,
  passengerText,
  peopleText,
  driverText,
  intl,
}: AddtripRowProps) {
  const dispatch = useAppDispatch();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editTrip, setEditTrip] = useState<AddTripData | undefined>();
  const [carpoolDialogOpen, setCarpoolDialogOpen] = useState(false);
  const [isPassenger, setIsPassenger] = useState(false);
  const [carpoolTextCount, setCarpoolTextCount] = useState();
  const [isCarpool, setIsCarpool] = useState(false);
  const isCarpoolSuccess = useAppSelector((state: RootState) => selectIsCarpoolSuccess(state));

  const [formErrors, setFormErrors] = useState<CarpoolFormErros>({
    numberOfPeople: '',
  });
  const handleEditTrip = (item: any) => {
    setEditTrip(item);
    setDialogOpen(true);
  };
  useEffect(() => {
    if (item?.passengers > 1) {
      setIsCarpool(true);
    }
  }, [item?.passengers]);

  const handleDelete = () => {
    dispatch({ type: sagaActions.DELETE_USER_TRIP, trip_id: item.id, startDate: startDate });
    setDeleteDialogOpen(false);
  };
  useEffect(() => {
    if (isCarpoolSuccess) {
      setCarpoolDialogOpen(false);
      dispatch(addCarpoolInTripSuccess(false));
      setIsPassenger(false);
      setCarpoolTextCount(undefined);
      setFormErrors({
        numberOfPeople: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCarpoolSuccess]);

  const handleChange = (event: SelectChangeEvent) => {
    const findObject = selectValue.find((item: any) => item.value === event.target.value);
    let vehicle_id = 0;
    let vehicle_class_id;
    if (findObject && findObject.hasOwnProperty('vehicle_class_id')) {
      vehicle_id = Number(findObject.value);
      vehicle_class_id = findObject.vehicle_class_id;
    } else {
      vehicle_id = 0;
      vehicle_class_id = findObject && findObject.value;
    }
    const data = {
      vehicle_class_id: vehicle_class_id,
      ...(vehicle_id > 0 && { vehicle_id: vehicle_id }),
    };
    const modality_id = findObject?.modality_id;
    dispatch({ type: sagaActions.UPDATE_ADDITIONAL_TRIP, data, trip_id: item.id, modality_id });
  };
  const handleCarPoolDialogChange = () => {
    if (isCarpool) {
      const data = {
        passenger: false,
        passengers: 1,
      };
      dispatch({ type: sagaActions.ADD_CARPOOL_IN_TRIP, data, trip_id: item.id, pageLoading: true });
      setIsCarpool(false);
    } else {
      setCarpoolDialogOpen(!carpoolDialogOpen);
      setIsPassenger(false);
      setCarpoolTextCount(undefined);
      setFormErrors({
        numberOfPeople: '',
      });
    }
  };
  const handleCarpoolDialogClose = () => {
    setCarpoolDialogOpen(!carpoolDialogOpen);
  };
  const handleCarpoolTextChange = (e: any) => {
    setCarpoolTextCount(e.target.value);
  };
  const handleIsPassenger = () => {
    setIsPassenger(!isPassenger);
  };

  const validateCarpoolField = () => {
    const allow_only_numbers = intl?.formatMessage({
      id: `${errorMessages.allow_only_numbers}`,
    });
    const greater_than_one = intl?.formatMessage({
      id: `${errorMessages.greater_than_one}`,
    });

    let isValid = true;
    const newErrors = { ...formErrors };
    if (!regEx.allowNumbers.test(carpoolTextCount || '')) {
      newErrors.numberOfPeople = allow_only_numbers;
      isValid = false;
    } else if (carpoolTextCount && carpoolTextCount <= 1) {
      newErrors.numberOfPeople = greater_than_one;
      isValid = false;
    } else {
      newErrors.numberOfPeople = '';
    }
    setFormErrors(newErrors);
    return isValid;
  };

  const handleCarpoolSubmit = () => {
    if (validateCarpoolField()) {
      const data = {
        passenger: isPassenger,
        passengers: Number(carpoolTextCount),
      };
      dispatch({ type: sagaActions.ADD_CARPOOL_IN_TRIP, data, trip_id: item.id, dialogLoading: true });
    }
  };

  const commonStyle = {
    height: '38px !important',
    borderRadius: '7px',
    width: '100%',
    fontSize: '16px',
    fontWeight: 400,
    lineheight: '20px',
  };
  return (
    <>
      <FieldsContainer sx={{ display: 'flex', marginTop: 0, position: 'relative', rowGap: '11px' }}>
        <CustomTextField
          variant='secondary'
          className='form-fields'
          value={item.start_location_name}
          InputProps={{
            sx: {
              ...commonStyle,
            },
          }}
        />
        <CustomTextField
          variant='secondary'
          className='form-fields'
          value={item.stop_location_name}
          InputProps={{
            sx: {
              ...commonStyle,
            },
          }}
        />
        <Box sx={{ width: '100%', height: '38px', display: 'flex', columnGap: '10px' }}>
          <SelectDropdown
            className='form-fields'
            padding='16.5px 0px 16.5px 14px !important'
            handleChange={handleChange}
            selectValue={selectValue}
            selectedValue={item?.vehicle_id ? item?.vehicle_id : item?.vehicle_class_id}
            width='calc(100% - 30px)'
            mobileViewWidth='calc(100% - 30px)'
          />
          <BoxToContainIcon onClick={() => setDeleteDialogOpen(true)}>
            <BoxToShowCursorPointer>
              <DeleteIcon width='18px' height='18px' />
            </BoxToShowCursorPointer>
          </BoxToContainIcon>
        </Box>
        {allowedModalitiesForCarpool.includes(item.modality_id) && (
          <Box sx={{ display: 'flex', gap: '9px' }}>
            <SwitchButton checked={isCarpool} setChecked={handleCarPoolDialogChange} />
            <Typography variant='title4' sx={{ color: defaultStyle?.primaryColor }}>
              {carpoolText} {item?.passengers > 1 && item.passenger && passengerText}{' '}
              {item?.passengers > 1 && !item.passenger && driverText} {item?.passengers > 1 && `(${item?.passengers} ${peopleText})`}
            </Typography>
          </Box>
        )}
        {/* {index !== isLastElement && <Divider sx={{ borderColor: defaultStyle.dialogInputFieldsColor }} />} */}
        <Divider sx={{ borderColor: defaultStyle.dialogInputFieldsColor }} />
      </FieldsContainer>
      <DeleteTripDialog
        setDeleteDialogOpen={setDeleteDialogOpen}
        deleteDialogOpen={deleteDialogOpen}
        deleteConfirmationMessage={delete_trip_confirmation_message}
        yes={yes}
        no={no}
        handleDelete={handleDelete}
      />
      <AddTripDialog
        selectValue={selectValue}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        editTrip={editTrip}
        setEditTrip={setEditTrip}
      />
      <CarpoolDialog
        intl={intl}
        carpoolDialogOpen={carpoolDialogOpen}
        handleCarPoolDialogChange={handleCarpoolDialogClose}
        handleCarpoolTextChange={handleCarpoolTextChange}
        carpoolTextCount={carpoolTextCount}
        handleIsPassenger={handleIsPassenger}
        isPassenger={isPassenger}
        handleCarpoolSubmit={handleCarpoolSubmit}
        formErrors={formErrors.numberOfPeople}
      />
    </>
  );
}

const BoxToContainIcon = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  width: '30px',
}));
const BoxToShowCursorPointer = styled(Box)(() => ({
  cursor: 'pointer',
}));
