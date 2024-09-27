'use client';

import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import { dispatch, RootState } from '@/redux/store';
import { sagaActions } from '@/redux/actions';
import { deletedVehicleSuccess, deleteVehicleSuccess, vehicles } from '@/redux/slices/vehiclesSlice';
import { useAppSelector } from '@/redux/hooks';
import { handlePageLoading } from '@/redux/slices/pageLoader';
import { AddVehicleWrapper } from '@/components/myVehicles/style';
import { HeaderTypography } from '@/components/StyledComponents/styledComponents';
import DeleteIcon from '@/assets/deleteIcon';
import SelectDropdown from '@/components/selectDropdownWithIcons/SelectDropdown';
import { SelectChangeEvent } from '@mui/material/Select';
import DeleteTripDialog from '@/components/deleteTripDialog/DeleteTripDialog';
import DropdownsvgIcon from '../dropdownsvgIcon/DropdownsvgIcon';

export interface GetVehicleSectionProps {
  type?: 'primary' | 'secondary';
  name?: string;
  vehicleIcon?: any;
  item?: any;
  vehicle_id?: string;
  priority?: any;
  intl?: any;
  locale: string;
}

export default function GetVehicleSection({
  type = 'primary',
  name,
  vehicleIcon,
  item,
  vehicle_id,
  priority,
  intl,
  locale,
}: GetVehicleSectionProps) {
  function calculateTotalCO2(vehicle: any) {
    let tailpipe = vehicle?.co2_g_km_tailpipe;
    let upstream = vehicle?.co2_g_km_upstream;

    if ((tailpipe === 0 || tailpipe === null) && (upstream === 0 || upstream === null)) {
      tailpipe = vehicle?.vehicle_class?.co2_g_km_tailpipe || 0;
      upstream = vehicle?.vehicle_class?.co2_g_km_upstream || 0;
    }

    return (tailpipe || 0) + (upstream || 0);
  }

  const totalCO2 = calculateTotalCO2(item);
  const theme = useTheme();
  const textColor = theme?.palette?.custom?.addedVehicleVariant?.textColor;
  const textBelowLabelColor = theme?.palette?.custom?.addedVehicleVariant?.textBelowLabelColor;

  const getVehicles = useAppSelector((state: RootState) => vehicles(state));
  const getDeleteVehicleSuccess = useAppSelector((state: RootState) => deletedVehicleSuccess(state));
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [apicalled, setApicalled] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [vehiclesState, setVehiclesState] = useState<any>();
  const [vehiclesData, setVehiclesData] = useState<any>();
  const [newPriorityValue, setNewPriorityValue] = useState<any>();
  const commonStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const handleChange = (event: SelectChangeEvent) => {
    const newPriority = parseInt(event.target.value);
    setNewPriorityValue(newPriority);
    setSelectedValue(event.target.value);
    updateVehiclePriority(newPriority);
  };

  const updateVehiclePriorityAfterDelete = () => {
    const updatedVehicles = getVehicles.map((vehicle: any, index: number) => {
      return {
        ...vehicle,
        priority: index + 1,
      };
    });
    setVehiclesData(updatedVehicles);
  };

  const updateVehiclePriority = (newPriority: any) => {
    const updatedVehicles = getVehicles.map((vehicle: any) => {
      if (vehicle.id === vehicle_id) {
        return { ...vehicle, priority: newPriority };
      }
      if (newPriority < priority) {
        if (vehicle.priority >= newPriority && vehicle.priority < priority) {
          return { ...vehicle, priority: priority + 1 };
        }
      } else if (newPriority > priority) {
        if (vehicle.priority <= newPriority && vehicle.priority > priority) {
          return { ...vehicle, priority: priority - 1 };
        }
      }
      return vehicle;
    });

    const sortedVehicles = updatedVehicles.sort((a, b) => a.priority - b.priority);
    setVehiclesState(sortedVehicles);
  };

  const selectValue = getVehicles?.map((item, index) => ({
    name: `${intl?.formatMessage({ id: 'order_priority' })} #${index + 1}`,
    value: index + 1,
  }));

  useEffect(() => {
    const getDefaultValue = selectValue.find((item: any) => item?.value === selectedValue);
    const setOtherVehiclePriority = vehiclesState?.reduce(
      (acc: Record<number, number>, vehicle: any, index: any) => {
        acc[vehicle.id] = index + 1;
        return acc;
      },
      {} as Record<number, number>,
    );

    const mergedVehiclePriority = {
      ...setOtherVehiclePriority,
    };
    if (getDefaultValue !== undefined && priority !== newPriorityValue) {
      dispatch({
        type: sagaActions.SET_VEHICLE_PRIORITY,
        mergedVehiclePriority,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehiclesState]);

  const handleDeleteVehicle = () => {
    setDialogOpen(true);
  };
  const handleDelete = () => {
    dispatch({ type: sagaActions.DELETE_VEHICLE, vehicle_id });
  };

  useEffect(() => {
    if (getDeleteVehicleSuccess === 204) {
      setDialogOpen(false);
      updateVehiclePriorityAfterDelete();
      setApicalled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getDeleteVehicleSuccess]);

  useEffect(() => {
    const mergedVehiclePriority = vehiclesData?.reduce(
      (acc: Record<number, number>, vehicle: any, index: any) => {
        acc[vehicle.id] = vehicle?.priority;
        return acc;
      },
      {} as Record<number, number>,
    );
    if (apicalled) {
      dispatch(handlePageLoading(true));
      dispatch({
        type: sagaActions.SET_VEHICLE_PRIORITY,
        mergedVehiclePriority,
      });
      setApicalled(false);
      dispatch(deleteVehicleSuccess(null));
      dispatch(handlePageLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehiclesData, apicalled]);

  return (
    <AddVehicleWrapper
      variant='addedVehicleVariant'
      sx={{
        boxShadow: '0px 9px 20px 0px rgba(0, 0, 0, 0.09) !important',
        mixBlendMode: 'multiply',
        padding: '17px 17px 22px 22px',
        height: '100%',
        maxHeight: '150px',
        margin: '4px',
      }}>
      <Stack height={'100%'} justifyContent={'space-around'}>
        <Stack
          sx={{
            ...commonStyle,
            alignItems: 'flex-start',
            height: '50px',
          }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <Typography
              sx={{
                fontSize: '1.25rem',
                fontWeight: 700,
                lineHeight: '1.25rem',
                color: textColor,
                // color: defaultStyle.primaryColor,
                // textTransform: 'capitalize',
              }}>
              {name}
            </Typography>
            <HeaderTypography
              sx={{
                color: '#929292',
                lineHeight: '0.8rem !important',
              }}>
              {totalCO2} {intl?.formatMessage({ id: 'gm_of_co2_per_km' })}
            </HeaderTypography>
            {/* <span>
              <picture>
                <img
                  src={vehicleIcon}
                  style={{
                    filter:
                      'brightness(0) saturate(100%) invert(10%) sepia(12%) saturate(5289%) hue-rotate(202deg) brightness(95%) contrast(104%)',
                    width: '45px',
                  }}
                  alt=''
                />
              </picture>
            </span> */}
          </Box>
          <DropdownsvgIcon iconUrl={vehicleIcon} maxWidth='45px' maxheight='40px' />
        </Stack>
        <Box
          sx={{
            ...commonStyle,
            marginTop: '24px',
          }}>
          <SelectDropdown
            className='orderPriority-dropdown'
            width='175px'
            height='23px'
            selectValue={selectValue}
            selectedValue={priority}
            handleChange={handleChange}
            type='secondary'
            label={intl?.formatMessage({ id: 'select_priority' })}
            sx={{
              '.MuiTypography-root': {
                fontSize: '14px',
                fontWeight: 400,
                lineHeight: '20px',
              },
            }}
          />
          <span onClick={handleDeleteVehicle} style={{ cursor: 'pointer' }}>
            <DeleteIcon width='19' height='19' />
          </span>
          <DeleteTripDialog
            deleteDialogOpen={dialogOpen}
            setDeleteDialogOpen={setDialogOpen}
            deleteConfirmationMessage={intl?.formatMessage({
              id: 'delete_vehicle_confirmation_message',
            })}
            handleDelete={handleDelete}
            // yes={renderButtonLabel('yes', locale)}
            // no={renderButtonLabel('no', locale)}
            yes={intl?.formatMessage({ id: 'yes' })}
            no={intl?.formatMessage({ id: 'no' })}
          />
        </Box>
      </Stack>
    </AddVehicleWrapper>
  );
}
