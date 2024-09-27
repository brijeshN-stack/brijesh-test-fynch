import React from 'react';
import { Box, styled } from '@mui/material';
import CancelIcon from '@/assets/cancelIcon';
import { defaultStyle } from '@/config/colorConfig';
import { CardHeader, StyledDialog } from '@/components/StyledComponents/styledComponents';
import CustomButton from '@/components/button/CustomButton';

type deleteDialogProps = {
  setDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteDialogOpen: boolean;
  handleDelete?: () => void;
  deleteConfirmationMessage: string;
  yes: string;
  no: string;
};

export default function DeleteTripDialog({
  setDeleteDialogOpen,
  deleteDialogOpen,
  handleDelete,
  deleteConfirmationMessage,
  yes,
  no,
}: deleteDialogProps) {
  const commonButtonStyles = {
    // background: defaultStyle.disableButtonColor,
    boxShadow: 0,
    borderRadius: '7px',
    height: '38px',
    width: '228px',
    // color: defaultStyle.primaryColor,
    ':hover': {
      // background: defaultStyle.disableButtonColor,
      boxShadow: 0,
    },
  };

  const handleDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <StyledDialog onClose={handleDialogClose} open={deleteDialogOpen}>
      <DialogWrapper>
        <Box
          sx={{
            marginTop: '7px',
            display: 'flex',
            height: '38px',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <Box sx={{ marginRight: '-30px', marginTop: '-13px', cursor: 'pointer' }} onClick={handleDialogClose}>
            <CancelIcon />
          </Box>
        </Box>
        <Box
          sx={{
            height: '38px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CardHeader sx={{ textAlign: 'center' }} color={defaultStyle.primaryColor}>
            {deleteConfirmationMessage}
          </CardHeader>
        </Box>
        <Box
          sx={{
            marginTop: '39px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '9px',
          }}>
          <CustomButton
            sx={{
              ...commonButtonStyles,
            }}
            variant='defaultSecondary'
            handleClick={handleDialogClose}>
            {no}
          </CustomButton>

          <CustomButton
            sx={{
              ...commonButtonStyles,
            }}
            variant='defaultSecondary'
            handleClick={handleDelete}>
            {yes}
          </CustomButton>
        </Box>
      </DialogWrapper>
    </StyledDialog>
  );
}

const DialogWrapper = styled(Box)(() => ({
  maxWidth: '545px',
  height: '191px',
  padding: '0px 40px',
}));
