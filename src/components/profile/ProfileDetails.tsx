import React from 'react';
import { getAuth } from 'firebase/auth';
import { Box, Stack, Typography } from '@mui/material';
import CancelIcon from '@/assets/cancelIcon';
import { defaultStyle } from '@/config/colorConfig';
import app from '@/lib/firebase';
import CustomTextField from '@/components/textfield/CustomTextField';

export interface ProfileDetailsProps {
  handleClose?: () => void;
  handleFieldChange?: any;
  isMobile?: any;
  profileDetails?: any;
  getProfileDetails?: any;
  intl?: any;
}

export default function ProfileDetails({
  handleClose,
  handleFieldChange,
  isMobile,
  profileDetails,
  getProfileDetails,
  intl,
}: ProfileDetailsProps) {
  const auth = getAuth(app);
  const { currentUser } = auth;

  return (
    <>
      <Stack
        sx={{
          padding: { sm: '0 13px 0 31px', xs: '0 15px' },
          width: '100%',
          marginTop: { sm: '15px', xs: 0 },
        }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Typography variant='subHeading2' color={defaultStyle.primaryColor}>
            {intl?.formatMessage({ id: 'profile_details' })}
          </Typography>
          {!isMobile && (
            <span onClick={handleClose} style={{ cursor: 'pointer' }}>
              <CancelIcon />
            </span>
          )}
        </Box>
        <Stack
          sx={{
            paddingRight: { sm: '33px', xs: 0 },
            gap: '9px',
            marginTop: '16px',
          }}>
          <Stack gap={0.625}>
            <Typography variant='title3'>{intl?.formatMessage({ id: 'email' })}</Typography>
            <CustomTextField
              className='form-fields'
              disable={true}
              variant='secondary'
              name='email'
              value={currentUser?.email || undefined}
            />
          </Stack>
          <Stack gap={0.625}>
            <Typography variant='title3'>{intl?.formatMessage({ id: 'first_name' })}</Typography>
            <CustomTextField
              className='form-fields'
              variant='secondary'
              handleChange={handleFieldChange}
              name='given_name'
              value={profileDetails?.given_name || ''}
            />
          </Stack>
          <Stack gap={0.625}>
            <Typography variant='title3'>{intl?.formatMessage({ id: 'last_name' })}</Typography>
            <CustomTextField
              className='form-fields'
              variant='secondary'
              name='family_name'
              value={profileDetails?.family_name || ''}
              handleChange={handleFieldChange}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
