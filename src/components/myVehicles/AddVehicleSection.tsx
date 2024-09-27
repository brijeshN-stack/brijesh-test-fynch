'use client';
import React, { useState } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { defaultStyle } from '@/config/colorConfig';
import AddVehicleIcon from '@/assets/addVehicleIcon';
import { VehicleFormErros, VehicleFormValues } from '@/redux/slices/vehiclesSlice';
import { AddVehicleWrapper } from '@/components/myVehicles/style';
import AddVehicleDialog from '@/components/myVehicles/AddVehicleDialog';

type AddVehicleSectionProps = {
  getVehicles?: [] | any;
  vehicleClass?: [] | any;
  intl?: any;
  locale: string;
};

export default function AddVehicleSection({ getVehicles, vehicleClass, intl, locale }: AddVehicleSectionProps) {
  const theme = useTheme();
  const textColor = theme?.palette?.custom?.addVehicleVariant?.textColor;
  const widgetBackgroundColor = theme?.palette?.custom?.addVehicleVariant?.widgetBackgroundColor;

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [formData, setFormData] = useState<VehicleFormValues>({
    licensePlate: '',
    vehicle_class: '',
    modality_id: '',
    name: '',
    selectedOption: '',
    co2_g_km_tailpipe: '',
  });

  const [formErrors, setFormErrors] = useState<VehicleFormErros>({
    licensePlate: '',
    name: '',
    selectedOption: '',
    co2_g_km_tailpipe: '',
  });

  const handleAddVehicle = () => {
    setDialogOpen(true);
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

  return (
    <AddVehicleWrapper
      variant='addVehicleVariant'
      sx={{
        padding: '40px 24px',
        borderRadius: '24px',
        height: '100%',
        maxHeight: '150px',
        margin: '4px',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '100%',
        }}>
        <Typography
          sx={{
            fontSize: '1.5rem',
            fontWeight: 700,
            lineHeight: '2.125rem',
            color: textColor,
            width: '126px',
          }}>
          {intl?.formatMessage({ id: 'add_vehicle' })}
        </Typography>
        <span onClick={handleAddVehicle} style={{ cursor: 'pointer', height: '100%', display: 'flex', alignItems: 'center' }}>
          <AddVehicleIcon circleFillColor={textColor} fill={widgetBackgroundColor} />
        </span>
        <AddVehicleDialog
          locale={locale}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          getVehicles={getVehicles}
          vehicleClass={vehicleClass}
          intl={intl}
          formData={formData}
          setFormData={setFormData}
          formErrors={formErrors}
          setFormErrors={setFormErrors}
        />
      </Box>
    </AddVehicleWrapper>
  );
}
