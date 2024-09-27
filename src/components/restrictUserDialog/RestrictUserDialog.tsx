import React from 'react';
import { Box, Stack, Typography, styled } from '@mui/material';
import CancelIcon from '@/assets/cancelIcon';
import { defaultStyle } from '@/config/colorConfig';
import { StyledDialog } from '@/components/StyledComponents/styledComponents';
import { MissingDetailsProps } from '@/types';

type deleteDialogProps = {
  setRestrictUserDialog: React.Dispatch<React.SetStateAction<boolean>>;
  restrictUserDialog: boolean;
  showMissingDetails: MissingDetailsProps;
  add_your_addresses_heading: string;
  add_your_addresses_details: string;
  select_mode_of_transport_heading: string;
  select_mode_of_transport_details: string;
  add_a_personal_vehicle_heading: string;
  add_a_personal_vehicle_details: string;
  add_all_missing_details_heading: string;
  add_all_missing_details_text: string;
};

export default function RestrictUserDialog({
  setRestrictUserDialog,
  restrictUserDialog,
  showMissingDetails,
  add_your_addresses_heading,
  add_your_addresses_details,
  select_mode_of_transport_heading,
  select_mode_of_transport_details,
  add_a_personal_vehicle_heading,
  add_a_personal_vehicle_details,
  add_all_missing_details_heading,
  add_all_missing_details_text,
}: deleteDialogProps) {
  const handleDialogClose = () => {
    setRestrictUserDialog(false);
  };

  return (
    <StyledDialog
      sx={{
        '.MuiDialog-paper': {
          maxWidth: '689px',
          width: '100%',
        },
      }}
      onClose={handleDialogClose}
      open={restrictUserDialog}>
      <DialogWrapper>
        <IconContainer onClick={handleDialogClose}>
          <CancelIcon />
        </IconContainer>
        <Stack sx={{ rowGap: '28px' }}>
          {showMissingDetails.isAllDetailsMissing && (
            <AddressContainer headerText={add_all_missing_details_heading} infoText={add_all_missing_details_text} />
          )}
          {showMissingDetails.isAddressesMissing && (
            <AddressContainer headerText={add_your_addresses_heading} infoText={add_your_addresses_details} />
          )}
          {showMissingDetails.isDefaultModalityIdMissing && (
            <AddressContainer headerText={select_mode_of_transport_heading} infoText={select_mode_of_transport_details} />
          )}
          {showMissingDetails.isPersonalVehicleNotAdded && (
            <AddressContainer headerText={add_a_personal_vehicle_heading} infoText={add_a_personal_vehicle_details} />
          )}
        </Stack>
      </DialogWrapper>
    </StyledDialog>
  );
}

const DialogWrapper = styled(Box)(() => ({
  padding: '20px 49px 34px',
}));
const IconContainer = styled(Box)(() => ({
  position: 'absolute',
  right: '0',
  top: '0',
  cursor: 'pointer',
  padding: '11px 10.95px',
}));
const AddressHeading = styled(Box)(() => ({
  height: '38px',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
const CustomTypography = styled(Typography)(() => ({
  textAlign: 'center',
  color: defaultStyle.primaryColor,
}));
type AddressContainerProps = {
  headerText: string;
  infoText: string;
};
const AddressContainer = ({ headerText, infoText }: AddressContainerProps) => {
  return (
    <Stack sx={{ width: '100%' }}>
      <AddressHeading>
        <CustomTypography variant='subHeading2'>{headerText}</CustomTypography>
      </AddressHeading>
      <Stack
        sx={{
          width: '100%',
        }}>
        <CustomTypography
          sx={{
            fontSize: '18px',
            fontWeight: 400,
            lineHeight: '20px',
          }}>
          {infoText}
        </CustomTypography>
      </Stack>
    </Stack>
  );
};
